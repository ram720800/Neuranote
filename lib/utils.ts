import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, subjectsBadges, voices } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColors = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors];
};
export const getSubjectBadges = (subject: string) => {
  return subjectsBadges[subject as keyof typeof subjectsBadges];
};

export const trimToTokenLimit = (text: string, maxChars = 8000) => {
  return text.length > maxChars ? text.slice(0, maxChars) + "..." : text;
};

export const configureAssistant = (
  voice: string,
  style: string,
  topic: string,
  subject: string,
  content: string
) => {
  const voiceId =
    voices[voice as keyof typeof voices]?.[
      style as keyof (typeof voices)[keyof typeof voices]
    ] || "sarah";

  const vapiAssistant: CreateAssistantDTO = {
    name: "Neura",
    firstMessage:
      "Hello, let's start the session. Today we'll be talking about {{topic}}.",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 1,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `
You are a knowledgeable and friendly AI tutor helping a student learn through a voice-based session.

## Teaching Context
- **Subject:** ${subject}
- **Topic:** ${topic}
- **Style:** ${style} teaching approach (e.g., conversational, formal, storytelling)
- **Knowledge Base:** Use only the following extracted content to teach:

## Instructions
1. Begin the session by saying: 
   **"I've reviewed your document. Let's begin exploring '${topic}'!"**

2. Structure the lesson into small, easy-to-understand segments.
   - Explain one concept at a time.
   - Use simple and voice-friendly language.
   - Pause occasionally and ask quick questions like:
     - "Does that make sense so far?"
     - "Shall I explain that part again?"

3. Do **not** provide information not found in the extracted content.
   - If the user asks something outside this, respond with:
     **"Let's stick to the content you uploaded for now."**

4. Keep answers concise and natural.
   - Avoid long monologues, special characters, or overly complex terms.

5. **End the session** with:
   - A brief summary of key points learned.
   - 5 multiple-choice quiz questions based on the content, like:
     - "Question 1: What is ___?  
       A) ... B) ... C) ... D) ...  
       What's your answer?"

## Important
- Never make up facts outside the given content.
- Use a supportive tone throughout the session.
`.trim(),
        },
      ],
    },
  };
  return vapiAssistant;
};
