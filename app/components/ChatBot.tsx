'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: Date;
};

type ApiMessage = {
    role: 'user' | 'model';
    parts: Array<{ text: string }>;
};

const WELCOME_MESSAGE: Message = {
    id: 'welcome',
    role: 'model',
    text: '¡Hola! 👋 Soy **TechBot**, el asistente técnico de TechRevive. Tengo más de 10 años resolviendo problemas de PCs y laptops.\n\n¿En qué puedo ayudarte hoy? Cuéntame qué le pasa a tu equipo. 🔧',
    timestamp: new Date(),
};

const QUICK_REPLIES = [
    '💻 Mi laptop no enciende',
    '🐌 Mi PC va muy lenta',
    '🔥 El equipo se calienta mucho',
    '💰 ¿Cuánto cuesta armar una PC gamer?',
    '🛠️ ¿Qué servicios ofrecen?',
];

function formatText(text: string) {
    // Bold: **text**
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Line breaks
    formatted = formatted.replace(/\n/g, '<br/>');
    return formatted;
}

export default function ChatBot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [showQuickReplies, setShowQuickReplies] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    useEffect(() => {
        if (open && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [open]);

    const buildApiHistory = (msgs: Message[]): ApiMessage[] => {
        return msgs
            .filter(m => m.id !== 'welcome')
            .map(m => ({
                role: m.role,
                parts: [{ text: m.text }],
            }));
    };

    const sendMessage = async (text: string) => {
        if (!text.trim() || loading) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: text.trim(),
            timestamp: new Date(),
        };

        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInput('');
        setLoading(true);
        setShowQuickReplies(false);

        try {
            const history = buildApiHistory(updatedMessages);
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: history }),
            });

            const data = await res.json() as { text?: string; error?: string };

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: data.text ?? data.error ?? 'Error al obtener respuesta.',
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, botMsg]);
        } catch {
            setMessages(prev => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: 'model',
                    text: 'Hubo un error de conexión. Por favor intenta de nuevo. 🔄',
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    const formatTime = (d: Date) =>
        d.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' });

    return (
        <>
            {/* ── Floating trigger button ── */}
            <button
                id="chatbot-toggle-btn"
                onClick={() => setOpen(prev => !prev)}
                className={`trigger-btn ${open ? 'open' : ''}`}
                aria-label={open ? 'Cerrar asistente' : 'Abrir asistente TechBot'}
            >
                {open ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                        stroke="white" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2a2 2 0 012 2v1h3a3 3 0 013 3v8a3 3 0 01-3 3H7a3 3 0 01-3-3V8a3 3 0 013-3h3V4a2 2 0 012-2zm0 2v1H9V4h3zm-5 4a1 1 0 00-1 1v8a1 1 0 001 1h10a1 1 0 001-1V9a1 1 0 00-1-1H7zm2 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm6 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm-5 4h4v1H9v-1z" />
                    </svg>
                )}
                {!open && <span className="pulse-ring" />}
            </button>

            {/* ── Unread badge ── */}
            {!open && (
                <div className="unread-badge">
                    ¡Pregúntame!
                </div>
            )}

            {/* ── Chat window ── */}
            <div className={`chat-window ${open ? 'active' : ''}`}>
                {/* ── Header ── */}
                <div className="chat-header">
                    <div className="bot-avatar">🤖</div>
                    <div className="header-info">
                        <div className="bot-name">TechBot</div>
                        <div className="status-row">
                            <div className="status-indicator" />
                            <span className="status-text">Asistente técnico · en línea</span>
                        </div>
                    </div>
                    <div className="powered-by">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#4285F4">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <span>Gemini</span>
                    </div>
                </div>

                {/* ── Messages ── */}
                <div className="messages-container">
                    {messages.map(msg => (
                        <div key={msg.id} className={`message-row ${msg.role}`}>
                            {msg.role === 'model' && <div className="msg-avatar">🤖</div>}
                            <div className="bubble-wrapper">
                                <div className="bubble">
                                    <span dangerouslySetInnerHTML={{ __html: formatText(msg.text) }} />
                                </div>
                                <div className="timestamp">{formatTime(msg.timestamp)}</div>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="message-row model">
                            <div className="msg-avatar">🤖</div>
                            <div className="typing-indicator">
                                <div className="dot" style={{ '--delay': '0s' } as any} />
                                <div className="dot" style={{ '--delay': '0.2s' } as any} />
                                <div className="dot" style={{ '--delay': '0.4s' } as any} />
                            </div>
                        </div>
                    )}

                    {showQuickReplies && messages.length === 1 && (
                        <div className="quick-replies">
                            <span className="replies-label">Sugerencias:</span>
                            {QUICK_REPLIES.map(qr => (
                                <button key={qr} onClick={() => sendMessage(qr)} className="reply-btn">
                                    {qr}
                                </button>
                            ))}
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* ── WhatsApp escalation ── */}
                <div className="whatsapp-strip">
                    <span>¿Prefieres hablar con un humano?</span>
                    <a href="https://wa.me/58412000000?text=Hola,%20necesito%20soporte%20técnico" target="_blank" rel="noopener noreferrer">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                    </a>
                </div>

                {/* ── Input ── */}
                <form onSubmit={handleSubmit} className="input-area">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Escribe tu pregunta…"
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading || !input.trim()}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                </form>
            </div>

            <style jsx>{`
                .trigger-btn {
                    position: fixed;
                    bottom: 28px;
                    right: 28px;
                    z-index: 9999;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #00a8ff, #0055cc);
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 4px 24px rgba(0, 168, 255, 0.5);
                    transition: all 0.3s ease;
                    outline: none;
                }

                .trigger-btn.open {
                    background: linear-gradient(135deg, #111827, #1f2937);
                    border: 2px solid rgba(0,168,255,0.4);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
                }

                .trigger-btn:hover:not(.open) {
                    transform: scale(1.1);
                }

                .pulse-ring {
                    position: absolute;
                    inset: -5px;
                    border-radius: 50%;
                    border: 2px solid rgba(0,168,255,0.35);
                    animation: pulse-glow 2.5s ease-in-out infinite;
                }

                .unread-badge {
                    position: fixed;
                    bottom: 78px;
                    right: 20px;
                    z-index: 9998;
                    background: #00a8ff;
                    color: #fff;
                    font-size: 11px;
                    font-weight: 700;
                    padding: 3px 9px;
                    borderRadius: 20px;
                    whiteSpace: 'nowrap';
                    boxShadow: '0 2px 10px rgba(0,168,255,0.4)';
                    animation: fadeInUp 0.4s ease;
                }

                .chat-window {
                    position: fixed;
                    bottom: 102px;
                    right: 28px;
                    z-index: 9998;
                    width: 380px;
                    max-height: 580px;
                    border-radius: 20px;
                    overflow: hidden;
                    background: #060c1a;
                    border: 1px solid rgba(0, 168, 255, 0.2);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 168, 255, 0.1);
                    display: flex;
                    flex-direction: column;
                    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
                    transform-origin: bottom right;
                    transform: scale(0.85) translateY(20px);
                    opacity: 0;
                    pointer-events: none;
                    font-family: 'Inter', sans-serif;
                }

                .chat-window.active {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                    pointer-events: all;
                }

                .chat-header {
                    padding: 16px 20px;
                    background: linear-gradient(135deg, #0a1628 0%, #0d1f3c 100%);
                    border-bottom: 1px solid rgba(0, 168, 255, 0.15);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .bot-avatar {
                    width: 42px;
                    height: 42px;
                    border-radius: 50%;
                    background: rgba(0, 168, 255, 0.1);
                    border: 2px solid rgba(0, 168, 255, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                }

                .bot-name {
                    font-size: 15px;
                    font-weight: 700;
                    color: white;
                }

                .status-row {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .status-indicator {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #00ff88;
                    box-shadow: 0 0 6px #00ff88;
                }

                .status-text {
                    font-size: 12px;
                    color: #8899bb;
                }

                .powered-by {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    background: rgba(0, 168, 255, 0.1);
                    border-radius: 20px;
                    padding: 3px 10px;
                    font-size: 10px;
                    color: #8899bb;
                }

                .messages-container {
                    flex: 1;
                    overflow-y: auto;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .message-row {
                    display: flex;
                    gap: 8px;
                }

                .message-row.user {
                    flex-direction: row-reverse;
                }

                .msg-avatar {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: rgba(0, 168, 255, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                }

                .bubble-wrapper {
                    max-width: 78%;
                }

                .bubble {
                    padding: 10px 14px;
                    border-radius: 12px;
                    font-size: 13.5px;
                    line-height: 1.6;
                    color: white;
                }

                .user .bubble {
                    background: linear-gradient(135deg, #00a8ff, #0066cc);
                }

                .model .bubble {
                    background: #0d1526;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .timestamp {
                    font-size: 10px;
                    color: #4a5568;
                    margin-top: 4px;
                }

                .user .timestamp { text-align: right; }

                .typing-indicator {
                    padding: 10px 16px;
                    background: #0d1526;
                    border-radius: 12px;
                    display: flex;
                    gap: 4px;
                }

                .dot {
                    width: 6px;
                    height: 6px;
                    background: #00a8ff;
                    border-radius: 50%;
                    animation: bounce 1s var(--delay) infinite;
                }

                .quick-replies {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .replies-label {
                    font-size: 11px;
                    color: #4a5568;
                    padding-left: 36px;
                }

                .reply-btn {
                    align-self: flex-start;
                    margin-left: 36px;
                    padding: 6px 14px;
                    background: transparent;
                    border: 1px solid rgba(0, 168, 255, 0.3);
                    border-radius: 20px;
                    color: #00a8ff;
                    font-size: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .reply-btn:hover { background: rgba(0, 168, 255, 0.1); }

                .whatsapp-strip {
                    padding: 8px 16px;
                    background: rgba(37, 211, 102, 0.05);
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 11px;
                    color: #4a5568;
                }

                .whatsapp-strip a {
                    color: #25D366;
                    text-decoration: none;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .input-area {
                    padding: 12px;
                    display: flex;
                    gap: 8px;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }

                .input-area input {
                    flex: 1;
                    background: rgba(13, 21, 38, 0.8);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                    padding: 10px;
                    color: white;
                    outline: none;
                }

                .input-area button {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    background: #00a8ff;
                    color: white;
                    border: none;
                    cursor: pointer;
                }

                .input-area button:disabled {
                    background: rgba(0, 168, 255, 0.2);
                    cursor: not-allowed;
                }

                @keyframes pulse-glow {
                    0% { transform: scale(1); opacity: 0.6; }
                    50% { transform: scale(1.1); opacity: 0.3; }
                    100% { transform: scale(1.2); opacity: 0; }
                }

                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
}
