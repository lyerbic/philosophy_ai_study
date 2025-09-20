import { GoogleGenAI, Type, Modality, GenerateContentResponse, Chat } from "@google/genai";

// Fix: Adhered to the coding guidelines for API key initialization.
// The API key must be sourced directly from `process.env.API_KEY` without fallbacks or warnings.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAntithesis = async (thesis: string): Promise<string> => {
  try {
    const prompt = `Given the philosophical concept "${thesis}", provide a concise and relevant philosophical antithesis. Return only the concept name and a brief parenthetical explanation. For example, if the thesis is "Empiricism (knowledge from experience)", a good antithesis would be "Rationalism (knowledge from reason)".`;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { thinkingConfig: { thinkingBudget: 0 } } // optimize for speed
    });
    return response.text;
  } catch (error) {
    console.error("Error generating antithesis:", error);
    return "Error: Could not generate an antithesis from the API.";
  }
};

export const generateSynthesis = async (thesis: string, antithesis: string): Promise<string> => {
  try {
    const prompt = `Analyze the following philosophical concepts:\n- Thesis: ${thesis}\n- Antithesis: ${antithesis}\n\nProvide a concise synthesis that resolves the tension or finds a middle ground between these two opposing ideas. Explain the synthesis in 1-3 sentences.`;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error generating synthesis:", error);
    return "Error: Could not generate a synthesis from the API.";
  }
};

export const getDebateResponse = async (chat: Chat | null, message: string): Promise<GenerateContentResponse | null> => {
    if (!chat) return null;
    try {
        const response = await chat.sendMessage({ message });
        return response;
    } catch (error) {
        console.error("Error getting debate response:", error);
        return null;
    }
}

export const createChat = (systemInstruction: string): Chat => {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction,
        },
    });
}

export const getConceptSummary = async (concept: string): Promise<string> => {
  try {
    const prompt = `Provide a concise summary of the philosophical concept or philosopher: "${concept}". Keep it to one or two paragraphs.`;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error getting concept summary:", error);
    return "Error: Could not get summary from API.";
  }
};

export const getTerminologyFlashcard = async (): Promise<{ term: string; definition: string }> => {
  try {
    const prompt = "Provide a single, non-obvious philosophical term and its concise definition, suitable for a flashcard. Return the response as a JSON object with 'term' and 'definition' keys.";
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            term: { type: Type.STRING, description: "The philosophical term." },
            definition: { type: Type.STRING, description: "A concise definition of the term." }
          },
          required: ["term", "definition"]
        }
      }
    });

    const jsonStr = response.text.trim();
    const data = JSON.parse(jsonStr);
    return data;

  } catch (error) {
    console.error("Error generating terminology flashcard:", error);
    return { term: "Error", definition: "Could not fetch a new term. Please try again." };
  }
};

// Fix: Added the missing `generateAbsurdImage` function to use the `gemini-2.5-flash-image-preview` model for image editing.
export const generateAbsurdImage = async (concept: string, base64ImageData: string): Promise<{imageUrl: string | null; text: string | null}> => {
  try {
    const prompt = `Create an absurd, surreal, and memorable mnemonic visualization for the philosophical concept: "${concept}". Explain your visualization in one sentence.`;

    const imagePart = {
      inlineData: {
        data: base64ImageData,
        mimeType: 'image/png',
      },
    };

    const textPart = {
      text: prompt,
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    let imageUrl: string | null = null;
    let text: string | null = null;

    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.text) {
          text = part.text;
        } else if (part.inlineData) {
          const base64ImageBytes: string = part.inlineData.data;
          imageUrl = `data:image/png;base64,${base64ImageBytes}`;
        }
      }
    }

    return { imageUrl, text };
  } catch (error) {
    console.error("Error generating absurd image:", error);
    return { imageUrl: null, text: "Error: Could not generate visualization." };
  }
};
