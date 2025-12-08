const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export interface RoadmapNode {
  id: string;
  label: string;
  type: string;
  description: string;
  difficulty: string;
}

export interface RoadmapEdge {
  source: string;
  target: string;
}

export interface GeneratedRoadmap {
  title: string;
  description: string;
  nodes: RoadmapNode[];
  edges: RoadmapEdge[];
}

export async function generateRoadmapWithGemini(
  topic: string,
  currentSkills?: string[],
  learningGoals?: string[]
): Promise<GeneratedRoadmap> {
  const prompt = `Generate a detailed learning roadmap for "${topic}".
${currentSkills && currentSkills.length > 0 ? `Current skills: ${currentSkills.join(", ")}` : ""}
${learningGoals && learningGoals.length > 0 ? `Learning goals: ${learningGoals.join(", ")}` : ""}

Return a JSON object with this structure:
{
  "title": "Roadmap Title",
  "description": "Brief description",
  "nodes": [
    {
      "id": "node1",
      "label": "Topic Name",
      "type": "concept|skill|project",
      "description": "What to learn",
      "difficulty": "beginner|intermediate|advanced"
    }
  ],
  "edges": [
    {
      "source": "node1",
      "target": "node2"
    }
  ]
}

Create 5-8 nodes that form a logical learning path.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.candidates[0]?.content?.parts[0]?.text;

    if (!content) {
      throw new Error("No content in Gemini response");
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse JSON from Gemini response");
    }

    const roadmap = JSON.parse(jsonMatch[0]) as GeneratedRoadmap;
    return roadmap;
  } catch (error) {
    console.error("Error generating roadmap:", error);
    throw error;
  }
}
