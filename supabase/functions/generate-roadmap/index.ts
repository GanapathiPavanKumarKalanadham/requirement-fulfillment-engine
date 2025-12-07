import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const systemPrompt = `You are an expert career advisor and learning path designer. Your task is to create detailed, actionable learning roadmaps for software development careers.

When generating a roadmap, you MUST return a valid JSON object with this exact structure:
{
  "title": "Roadmap title",
  "description": "Brief description of the learning path",
  "nodes": [
    {
      "id": "unique_id",
      "label": "Topic Name",
      "description": "What you'll learn",
      "status": "active|locked|completed",
      "progress": 0,
      "resources": ["resource1", "resource2"]
    }
  ],
  "edges": [
    {"source": "id1", "target": "id2"}
  ]
}

Guidelines:
- Create 8-12 nodes for a comprehensive roadmap
- First 1-2 nodes should have status "active", rest should be "locked"
- All progress values should start at 0
- Edges should show logical dependencies between topics
- Resources should be real, useful learning resources
- Make the roadmap practical and job-focused`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Received roadmap generation request');

    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service is not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { goal, currentSkills, experience } = await req.json();
    console.log('Generating roadmap for goal:', goal);

    if (!goal) {
      return new Response(
        JSON.stringify({ error: 'Goal is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userPrompt = `Create a personalized learning roadmap for someone who wants to: ${goal}

Current skills: ${currentSkills || 'Beginner - just starting out'}
Experience level: ${experience || 'No prior experience'}

Generate a comprehensive roadmap that takes them from their current level to being job-ready.
Return ONLY the JSON object, no additional text.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error('Rate limit exceeded');
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        console.error('Payment required');
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add funds.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'AI service error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    console.log('AI response received, parsing roadmap...');

    // Parse the JSON from the response
    let roadmap;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        roadmap = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse roadmap JSON:', parseError);
      return new Response(
        JSON.stringify({ error: 'Failed to parse roadmap. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Roadmap generated successfully:', roadmap.title);

    return new Response(
      JSON.stringify(roadmap),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-roadmap function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
