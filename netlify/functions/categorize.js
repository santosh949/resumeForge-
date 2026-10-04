import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

const bioSchema = z.object({
  name: z.string().optional().default(''),
  title: z.string().optional().default(''),
  email: z.string().optional().default(''),
  phone: z.string().optional().default(''),
  location: z.string().optional().default(''),
  linkedin: z.string().optional().default(''),
  github: z.string().optional().default(''),
  website: z.string().optional().default(''),
  summary: z.string().optional().default(''),
});
const experienceSchema = z.object({
  company: z.string().optional().default(''),
  role: z.string().optional().default(''),
  location: z.string().optional().default(''),
  duration: z.string().optional().default(''),
  highlights: z.array(z.string()).optional().default([]),
  keywords: z.array(z.string()).optional().default([]),
});
const projectSchema = z.object({
  name: z.string().optional().default(''),
  description: z.string().optional().default(''),
  technologies: z.array(z.string()).optional().default([]),
  highlights: z.array(z.string()).optional().default([]),
  link: z.string().optional().default(''),
});
const educationSchema = z.object({
  institution: z.string().optional().default(''),
  degree: z.string().optional().default(''),
  year: z.string().optional().default(''),
  gpa: z.string().optional().default(''),
  highlights: z.array(z.string()).optional().default([]),
});
const skillCategorySchema = z.object({
  category: z.string().optional().default(''),
  items: z.array(z.string()).optional().default([]),
});
const resumeSchema = z.object({
  bio: bioSchema.optional().default({}),
  experience: z.array(experienceSchema).optional().default([]),
  projects: z.array(projectSchema).optional().default([]),
  education: z.array(educationSchema).optional().default([]),
  skills: z.array(skillCategorySchema).optional().default([]),
});

const SYSTEM_PROMPT = `You are an expert resume analyzer. Extract the following information from the provided resume text and format it strictly as a JSON object matching this exact structure:
{
  "bio": { "name": "", "title": "", "email": "", "phone": "", "location": "", "linkedin": "", "github": "", "website": "", "summary": "" },
  "experience": [ { "company": "", "role": "", "location": "", "duration": "", "highlights": [""], "keywords": [""] } ],
  "projects": [ { "name": "", "description": "", "technologies": [""], "highlights": [""], "link": "" } ],
  "education": [ { "institution": "", "degree": "", "year": "", "gpa": "", "highlights": [""] } ],
  "skills": [ { "category": "Languages", "items": [""] } ]
}

CRITICAL RULES:
1. ONLY return the JSON object, absolutely no markdown formatting, no \`\`\`json wrappers.
2. Ensure every field matches the structure exactly. If information is missing, leave the string empty or the array empty.`;

async function callGroq(prompt, apiKey) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: prompt }],
      temperature: 0.1,
      response_format: { type: 'json_object' }
    }),
  });
  if (!response.ok) throw new Error(`Groq failed: ${await response.text()}`);
  const data = await response.json();
  return data.choices[0].message.content;
}

async function callGemini(prompt, apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  const result = await model.generateContent(SYSTEM_PROMPT + "\\n\\n" + prompt);
  return result.response.text();
}

function cleanJson(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) cleaned = cleaned.replace(/^```json/, '');
  if (cleaned.startsWith('```')) cleaned = cleaned.replace(/^```/, '');
  if (cleaned.endsWith('```')) cleaned = cleaned.replace(/```$/, '');
  return cleaned.trim();
}

async function fetchAndValidate(text, attempt = 1, previousError = null) {
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  
  let prompt = text;
  if (previousError) {
    prompt = `The previous JSON you generated failed schema validation with these errors:
${previousError}

Please fix the JSON and return it strictly following the schema:

${text}`;
  }

  let rawJson = '';
  try {
    if (!GROQ_API_KEY) throw new Error('Missing Groq key');
    rawJson = await callGroq(prompt, GROQ_API_KEY);
  } catch (err) {
    console.warn('Groq failed, trying Gemini...', err.message);
    if (!GEMINI_API_KEY) throw new Error('Missing Gemini key');
    rawJson = await callGemini(prompt, GEMINI_API_KEY);
  }

  const cleaned = cleanJson(rawJson);
  let parsed = {};
  
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    if (attempt < 2) {
      console.log('JSON Parse failed, retrying...');
      return fetchAndValidate(text, attempt + 1, 'Invalid JSON format: ' + e.message);
    }
    throw new Error('Failed to parse AI response as JSON.');
  }

  // Zod Validation
  const validationResult = resumeSchema.safeParse(parsed);
  if (!validationResult.success) {
    if (attempt < 2) {
      console.log('Zod validation failed, retrying AI with errors...', validationResult.error.message);
      return fetchAndValidate(text, attempt + 1, validationResult.error.message);
    }
    // If it fails again, we just force it through our schema to fill missing defaults
    console.log('Zod validation failed twice. Forcing through schema defaults.');
    return resumeSchema.parse(parsed); // This might throw if completely mangled, but better than silent failure.
  }

  return validationResult.data;
}

export const handler = async function (event, context) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  try {
    const { text } = JSON.parse(event.body);
    if (!text) return { statusCode: 400, body: JSON.stringify({ error: 'Missing text' }) };

    const validData = await fetchAndValidate(text);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validData)
    };
  } catch (error) {
    console.error("Categorize error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'AI service is temporarily unavailable.' })
    };
  }
};
