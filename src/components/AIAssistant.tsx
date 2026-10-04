import { useState, useRef, useEffect } from 'react';
import { sendAssistantMessage } from '../services/aiAssistant';

const QUICK_ACTIONS = [
    { label: '🎯 Rate my resume', prompt: 'Rate my resume out of 10 and give me specific tips to improve each section.' },
    { label: '💼 Job match', prompt: 'I want to check if I\'m a good fit for a job. Here is the job description:\n\n[Paste job description here]' },
    { label: '🔍 Missing skills?', prompt: 'Based on current industry trends, what important skills am I missing from my resume?' },
    { label: '✍️ LinkedIn summary', prompt: 'Write me a professional LinkedIn summary based on my resume data.' },
    { label: '🎤 Interview prep', prompt: 'Generate 5 behavioral interview questions specific to my experience and projects.' },
];

export default function AIAssistant({ resumeData, isDark }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showQuickActions, setShowQuickActions] = useState(true);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const sendMessage = async (text) => {
        if (!text.trim() || isLoading) return;

        const userMsg = { role: 'user', content: text.trim() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setShowQuickActions(false);
        setIsLoading(true);

        try {
            const response = await sendAssistantMessage(text.trim(), resumeData, messages);
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        } catch {
            setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Sorry, I\'m having trouble right now. Please try again in a moment.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    const handleQuickAction = (prompt) => {
        setInput(prompt);
        // If it's not the job-match one (which needs user to paste), send directly
        if (!prompt.includes('[Paste')) {
            sendMessage(prompt);
        }
    };

    const userName = resumeData?.bio?.name?.split(' ')[0] || 'there';

    return (
        <>
            {/* ─── Floating Bubble ─── */}
            <button
                className={`ai-bubble ${isOpen ? 'ai-bubble-hidden' : ''}`}
                onClick={() => setIsOpen(true)}
                title="AI Career Assistant"
            >
                <div className="ai-bubble-glow" />
                <div className="ai-bubble-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a7 7 0 0 1 7 7c0 3-1.5 5-3 6.5V18a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.5C6.5 14 5 12 5 9a7 7 0 0 1 7-7z" />
                        <line x1="10" y1="22" x2="14" y2="22" />
                        <line x1="9" y1="14" x2="15" y2="14" />
                    </svg>
                </div>
                <span className="ai-bubble-badge">AI</span>
            </button>

            {/* ─── Chat Panel ─── */}
            {isOpen && (
                <div className={`ai-panel ${isDark ? 'ai-panel-dark' : ''}`}>
                    {/* Header */}
                    <div className="ai-panel-header">
                        <div className="ai-panel-header-left">
                            <div className="ai-panel-avatar">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2a7 7 0 0 1 7 7c0 3-1.5 5-3 6.5V18a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.5C6.5 14 5 12 5 9a7 7 0 0 1 7-7z" />
                                    <line x1="10" y1="22" x2="14" y2="22" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="ai-panel-title">Forge AI</h3>
                                <span className="ai-panel-status">
                                    <span className="ai-status-dot" />
                                    Career Assistant
                                </span>
                            </div>
                        </div>
                        <button className="ai-panel-close" onClick={() => setIsOpen(false)}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="ai-panel-body">
                        {/* Welcome Message */}
                        {messages.length === 0 && (
                            <div className="ai-welcome">
                                <div className="ai-welcome-emoji">🤖</div>
                                <h4 className="ai-welcome-title">Hey {userName}! 👋</h4>
                                <p className="ai-welcome-text">
                                    I'm your AI career assistant. Paste a job description and I'll tell you if you're a good fit, or try one of these:
                                </p>
                            </div>
                        )}

                        {/* Quick Actions */}
                        {showQuickActions && messages.length === 0 && (
                            <div className="ai-quick-actions">
                                {QUICK_ACTIONS.map((action, i) => (
                                    <button
                                        key={i}
                                        className="ai-quick-btn"
                                        onClick={() => handleQuickAction(action.prompt)}
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Messages */}
                        {messages.map((msg, i) => (
                            <div key={i} className={`ai-message ${msg.role === 'user' ? 'ai-message-user' : 'ai-message-bot'}`}>
                                {msg.role === 'assistant' && (
                                    <div className="ai-message-avatar">🤖</div>
                                )}
                                <div className="ai-message-bubble">
                                    <div className="ai-message-text">
                                        {msg.content.split('\n').map((line, j) => (
                                            <p key={j} style={{ margin: line.trim() === '' ? '8px 0' : '4px 0' }}>
                                                {line.split(/(\*\*.*?\*\*)/).map((part, k) =>
                                                    part.startsWith('**') && part.endsWith('**')
                                                        ? <strong key={k}>{part.slice(2, -2)}</strong>
                                                        : part
                                                )}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isLoading && (
                            <div className="ai-message ai-message-bot">
                                <div className="ai-message-avatar">🤖</div>
                                <div className="ai-message-bubble">
                                    <div className="ai-typing">
                                        <span /><span /><span />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="ai-panel-input-area">
                        {messages.length > 0 && (
                            <div className="ai-chips-row">
                                {QUICK_ACTIONS.slice(0, 3).map((action, i) => (
                                    <button key={i} className="ai-chip" onClick={() => handleQuickAction(action.prompt)}>
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div className="ai-input-row">
                            <textarea
                                ref={inputRef}
                                className="ai-input"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Paste a job description or ask me anything..."
                                rows={1}
                                disabled={isLoading}
                            />
                            <button
                                className="ai-send-btn"
                                onClick={() => sendMessage(input)}
                                disabled={!input.trim() || isLoading}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
