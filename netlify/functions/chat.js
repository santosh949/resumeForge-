import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `You are "Forge AI", a friendly and highly skilled career assistant built into ResumeForge.
You have access to the user's complete resume data (provided as JSON below). Use it to give personalized advice.

Your capabilities:
1. **Job Match Analysis**: When the user pastes a job description or job title, compare it against their skills, experience, and projects. Give a match percentage (be honest), list matching skills, missing skills, and actionable improvement tips.
2. **Resume Coaching**: Rate their resume sections, suggest improvements to summaries, bullet points, or skill categories.
3. **Career Guidance**: Suggest job titles they'd be a good fit for, recommend skills to learn next, or help them write LinkedIn summaries.
4. **Interview Prep**: Generate behavioral interview questions specific to their experience and projects.

Guidelines:
- Be encouraging but honest. If they're missing skills, tell them kindly.
- Use emojis sparingly for friendliness (✅, 💡, 🎯, ⚡).
- Keep responses concise — max 200 words unless asked for detail.
- Format responses with markdown-like structure: use **bold** for emphasis, bullet points for lists.
- When giving a match score, use this format: "🎯 Match Score: XX%"
- Always end with a helpful follow-up suggestion or question.
- If the user sends something unrelated to careers/jobs, gently redirect them.

USER'S RESUME DATA:
`;

/**
 * Remove nulls, empty strings, and empty arrays from object to save tokens
 */
function compressData(obj) {
  if (Array.isArray(obj)) {
    const arr = obj.map(compressData).filter(val => val !== null && val !== '' && (Array.isArray(val) ? val.length > 0 : Object.keys(val).length > 0));
    return arr.length > 0 ? arr : null;
  } else if (obj !== null && typeof obj === 'object') {
    const result = {};
    for (const [key, val] of Object.entries(obj)) {
      const compressedVal = compressData(val);
      if (compressedVal !== null && compressedVal !== '' && !(Array.isArray(compressedVal) && compressedVal.length === 0)) {
        result[key] = compressedVal;
      }
    }
    return Object.keys(result).length > 0 ? result : null;
  }
  return obj;
}

async function callGroq(messages, apiKey) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.6,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Groq error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';
}

async function callGemini(systemContent, chatHistory, userMessage, apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const fullPrompt = [
    systemContent,
    ...chatHistory.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`),
    `User: ${userMessage}`,
  ].join('\n\n');

  const result = await model.generateContent(fullPrompt);
  return result.response.text();
}

export const handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { userMessage, resumeData, chatHistory = [] } = JSON.parse(event.body);

    if (!userMessage || !resumeData) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing userMessage or resumeData' }) };
    }

    // Token optimization 1: Compress resume data
    const compressedData = compressData(resumeData);
    // Token optimization 2: Minify JSON (no spaces/indentation)
    const systemContent = SYSTEM_PROMPT + JSON.stringify(compressedData);

    // Token optimization 3: Keep only last 6 messages of history
    const recentHistory = chatHistory.slice(-6);

    const messages = [
      { role: 'system', content: systemContent },
      ...recentHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content,
      })),
      { role: 'user', content: userMessage },
    ];

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    let responseText;
    try {
      if (!GROQ_API_KEY) throw new Error("Missing GROQ_API_KEY");
      responseText = await callGroq(messages, GROQ_API_KEY);
    } catch (err) {
      console.warn('Groq failed for assistant:', err.message);
      if (!GEMINI_API_KEY) throw new Error("Missing GEMINI_API_KEY and Groq failed");
      responseText = await callGemini(systemContent, recentHistory, userMessage, GEMINI_API_KEY);
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ response: responseText })
    };

  } catch (error) {
    console.error("Chat Function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'AI service is temporarily unavailable.' })
    };
  }
};
