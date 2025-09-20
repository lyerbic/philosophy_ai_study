import React from 'react';
import { View, MindMapData } from './types';

export const BrainCircuit: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3.75H19.5M8.25 6.75H19.5M8.25 9.75H19.5M8.25 12.75H19.5m-11.25-9h11.25a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0119.5 21.75H8.25A2.25 2.25 0 016 19.5V6A2.25 2.25 0 018.25 3.75zM3 15.75h3v3.75H3v-3.75z" />
    </svg>
);
export const CardStack: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0l5.571 3-5.571 3m0 0l-5.571 3 5.571-3z" />
    </svg>
);
export const ChatBubble: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
export const Share: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.186 2.25 2.25 0 00-3.933 2.186z" />
    </svg>
);
export const BookOpen: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6-2.292m0 0v14.25" />
    </svg>
);

export const NAV_ITEMS: { id: View; label: string; icon: React.FC }[] = [
    { id: 'flashcards', label: 'Hegelian Synthesis', icon: CardStack },
    { id: 'debater', label: 'Socratic Debater', icon: ChatBubble },
    { id: 'mind-map', label: 'Conceptual Mind Map', icon: Share },
    { id: 'terminology', label: 'Terminology Flashcards', icon: BookOpen },
];

export const PHILOSOPHERS: { [key: string]: { name: string; systemInstruction: string } } = {
    socrates: { name: "Socrates", systemInstruction: "You are Socrates. Engage the user in a dialectical inquiry (the Socratic method). Question their assumptions, ask for definitions, and lead them to discover contradictions in their own beliefs. Never give a direct answer. Your goal is to reveal their ignorance and guide them toward clearer thinking. Use phrases like 'What do you mean by that?', 'Can you give me an example?', and 'I'm afraid I don't understand.'" },
    kant: { name: "Immanuel Kant", systemInstruction: "You are Immanuel Kant. Your reasoning must be precise, logical, and grounded in your concepts of the Categorical Imperative, transcendental idealism, and the distinction between phenomena and noumena. Be formal and somewhat stern. Analyze the user's arguments for their universalizability. Your responses should be structured and systematic, reflecting your philosophical works." },
    descartes: { name: "René Descartes", systemInstruction: "You are René Descartes. Begin from a position of radical doubt. Accept nothing as true unless it is clearly and distinctly perceived. Your primary tool is reason. Talk about the mind-body problem, your 'Cogito, ergo sum' argument, and the existence of God as a guarantor of clear and distinct ideas. Be introspective and methodical in your debate." },
    nietzsche: { name: "Friedrich Nietzsche", systemInstruction: "You are Friedrich Nietzsche. Be provocative, aphoristic, and challenging. Question traditional morality (master-slave morality), religion ('God is dead'), and objective truth. Talk about the Will to Power, the Übermensch, and eternal recurrence. Your tone should be passionate, sometimes ironic, and dismissive of herd mentality. Use metaphors and parables." },
};

export const INITIAL_MIND_MAP_DATA: MindMapData = {
    nodes: [
      { id: 'Philosophy', group: 1, label: 'Philosophy' },
      { id: 'Metaphysics', group: 2, label: 'Metaphysics' },
      { id: 'Epistemology', group: 2, label: 'Epistemology' },
      { id: 'Ethics', group: 2, label: 'Ethics' },
      { id: 'Plato', group: 3, label: 'Plato' },
      { id: 'Aristotle', group: 3, label: 'Aristotle' },
      { id: 'Kant', group: 3, label: 'Kant' },
      { id: 'Descartes', group: 3, label: 'Descartes' },
      { id: 'Dualism', group: 4, label: 'Dualism' },
      { id: 'Idealism', group: 4, label: 'Idealism' },
      { id: 'Rationalism', group: 4, label: 'Rationalism' },
      { id: 'Empiricism', group: 4, label: 'Empiricism' },
    ],
    links: [
      { source: 'Philosophy', target: 'Metaphysics', value: 1 },
      { source: 'Philosophy', target: 'Epistemology', value: 1 },
      { source: 'Philosophy', target: 'Ethics', value: 1 },
      { source: 'Plato', target: 'Metaphysics', value: 2 },
      { source: 'Plato', target: 'Idealism', value: 2 },
      { source: 'Aristotle', target: 'Metaphysics', value: 2 },
      { source: 'Aristotle', target: 'Empiricism', value: 2 },
      { source: 'Kant', target: 'Epistemology', value: 2 },
      { source: 'Kant', target: 'Ethics', value: 2 },
      { source: 'Descartes', target: 'Dualism', value: 2 },
      { source: 'Descartes', target: 'Rationalism', value: 2 },
      { source: 'Rationalism', target: 'Epistemology', value: 3 },
      { source: 'Empiricism', target: 'Epistemology', value: 3 },
    ],
};

// Fix: Added the missing `WHITE_CANVAS_BASE64` constant required by the NanoBananaVisualizer component.
export const WHITE_CANVAS_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAQAAADa613fAAAAaklEQVR42u3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADg3gOKAAAAAElFTkSuQmCC';
