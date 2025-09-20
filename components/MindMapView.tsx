import React, { useEffect, useRef, useState } from 'react';
// Fix: Reverted to using the d3 namespace import (`import * as d3 from 'd3'`) to resolve module export errors
// caused by incorrect named imports.
import * as d3 from 'd3';
import { INITIAL_MIND_MAP_DATA } from '../constants';
import { MindMapNode, MindMapLink } from '../types';
import Modal from './ui/Modal';
import Spinner from './ui/Spinner';
import { getConceptSummary } from '../services/geminiService';

const MindMapView: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState(INITIAL_MIND_MAP_DATA);
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);
  const [summary, setSummary] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  const handleNodeClick = async (event: MouseEvent, d: MindMapNode) => {
    setSelectedNode(d);
    setIsLoadingSummary(true);
    const result = await getConceptSummary(d.label);
    setSummary(result);
    setIsLoadingSummary(false);
  };
  
  const closeModal = () => {
    setSelectedNode(null);
    setSummary('');
  }

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.parentElement?.clientWidth || 800;
    const height = 600;

    // Fix: Replaced `select` with `d3.select` to use the imported d3 namespace.
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height])
      .style('max-width', '100%')
      .style('height', 'auto');

    svg.selectAll("*").remove(); // Clear previous render

    const links: MindMapLink[] = data.links.map(d => Object.create(d));
    const nodes: MindMapNode[] = data.nodes.map(d => Object.create(d));

    // Fix: Replaced standalone force functions with their d3-namespaced equivalents.
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(90))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(0,0));
      
    // Fix: Replaced standalone scale functions with their d3-namespaced equivalents.
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const link = svg.append('g')
      .attr('stroke', '#adb5bd')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', d => Math.sqrt(d.value));

    const node = svg.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('g')
      .data(nodes)
      .join('g')
      // Fix: Renamed local `drag` function to `dragHandler` to avoid conflict with `d3.drag`.
      .call(dragHandler(simulation));
      
    node.append("circle")
        .attr('r', 10)
        .attr('fill', (d: any) => color(d.group))
        .on('click', handleNodeClick as any)
        .style('cursor', 'pointer');
        
    node.append("text")
        .attr("x", 12)
        .attr("y", "0.31em")
        .text((d: any) => d.label)
        .attr("fill", "#212529")
        .attr("stroke", "none")
        .style("font-size", "12px");


    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });
    
    // Drag functionality
    // Fix: Renamed local `drag` function to `dragHandler` to avoid name collision with the imported `drag` from d3.
    function dragHandler(simulation: d3.Simulation<MindMapNode, any>) {
        // Fix: Correctly typed d3 drag event handlers to resolve TS errors.
        function dragstarted(event: d3.D3DragEvent<SVGGElement, MindMapNode, MindMapNode>) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        }
        
        // Fix: Correctly typed d3 drag event handlers to resolve TS errors.
        function dragged(event: d3.D3DragEvent<SVGGElement, MindMapNode, MindMapNode>) {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        }
        
        // Fix: Correctly typed d3 drag event handlers to resolve TS errors.
        function dragended(event: d3.D3DragEvent<SVGGElement, MindMapNode, MindMapNode>) {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        }
        
        // Fix: Replaced `drag` with `d3.drag` and provided explicit types to match the selection and resolve the error.
        return d3.drag<SVGGElement, MindMapNode>()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    // Cleanup function to stop the simulation when the component unmounts
    return () => {
      simulation.stop();
    };
    
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-text">Conceptual Mind Map</h2>
      <p className="text-muted mb-6 text-sm sm:text-base">Explore the interconnected web of philosophical ideas.</p>
      <div className="bg-surface rounded-lg overflow-hidden border border-subtle shadow-sm">
        <svg ref={svgRef}></svg>
      </div>

      <Modal isOpen={!!selectedNode} onClose={closeModal}>
        {selectedNode && (
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">{selectedNode.label}</h3>
            {isLoadingSummary ? (
              <div className="flex justify-center items-center h-24">
                <Spinner />
              </div>
            ) : (
              <p className="text-text whitespace-pre-wrap">{summary}</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MindMapView;