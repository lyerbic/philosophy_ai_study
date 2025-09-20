export type View = 'flashcards' | 'debater' | 'mind-map' | 'terminology';

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

// Fix: Removed `extends d3.SimulationNodeDatum` and inlined its properties to resolve a namespace error.
export interface MindMapNode {
  id: string;
  group: number;
  label: string;
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

// Fix: Removed `extends d3.SimulationLinkDatum<MindMapNode>` and inlined its properties to resolve a namespace error.
export interface MindMapLink {
  source: string;
  target: string;
  value: number;
  index?: number;
}

export interface MindMapData {
  nodes: MindMapNode[];
  links: MindMapLink[];
}