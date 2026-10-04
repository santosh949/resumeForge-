/**
 * AI Career Assistant Service
 * Powers the floating chatbot with job-match analysis and career coaching.
 * Now securely proxies through Netlify serverless function to protect API keys.
 */

/**
 * Send a message to the AI assistant.
 * @param {string} userMessage - The user's message
 * @param {object} resumeData - The parsed resume JSON
 * @param {Array} chatHistory - Previous messages [{role, content}]
 * @returns {Promise<string>} AI response text
 */
export async function sendAssistantMessage(userMessage, resumeData, chatHistory = []) {
    try {
        const response = await fetch('/.netlify/functions/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userMessage,
                resumeData,
                chatHistory
            }),
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || `Server error ${response.status}`);
        }

        const data = await response.json();
        return data.response;
    } catch (err) {
        console.error('Chat failed:', err);
        throw new Error('AI service is temporarily unavailable. Please try again in a moment.');
    }
}
