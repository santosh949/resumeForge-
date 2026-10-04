/**
 * Send extracted resume text to AI for categorization.
 * Now securely proxies through a Netlify Serverless Function
 * to prevent exposing API keys to the frontend.
 */
export async function categorizeResume(rawText) {
  try {
    const response = await fetch('/.netlify/functions/categorize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: rawText }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Categorization failed:', err);
    if (err.message?.includes('429') || err.message?.includes('quota')) {
      throw new Error('All AI services are rate-limited. Please wait a minute and try again.');
    }
    throw new Error(err.message || 'AI processing failed. Please try again.');
  }
}
