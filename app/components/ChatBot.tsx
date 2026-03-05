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
                aria-label={open ? 'Cerrar asistente' : 'Abrir asistente TechBot'}
                style={{
                    position: 'fixed',
                    bottom: 28,
                    right: 28,
                    zIndex: 9999,
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: open
                        ? 'linear-gradient(135deg, #111827, #1f2937)'
                        : 'linear-gradient(135deg, #00a8ff, #0055cc)',
                    border: open ? '2px solid rgba(0,168,255,0.4)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: open
                        ? '0 4px 20px rgba(0,0,0,0.5)'
                        : '0 4px 24px rgba(0,168,255,0.5)',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                }}
                onMouseEnter={e => {
                    if (!open) (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
                }}
                onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                }}
            >
                {open ? (
                    // X icon
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                        stroke="white" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                ) : (
                    // Bot icon
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2a2 2 0 012 2v1h3a3 3 0 013 3v8a3 3 0 01-3 3H7a3 3 0 01-3-3V8a3 3 0 013-3h3V4a2 2 0 012-2zm0 2v1H9V4h3zm-5 4a1 1 0 00-1 1v8a1 1 0 001 1h10a1 1 0 001-1V9a1 1 0 00-1-1H7zm2 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm6 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm-5 4h4v1H9v-1z" />
                    </svg>
                )}

                {/* Pulse ring when closed */}
                {!open && (
                    <span style={{
                        position: 'absolute',
                        inset: -5,
                        borderRadius: '50%',
                        border: '2px solid rgba(0,168,255,0.35)',
                        animation: 'pulse-glow 2.5s ease-in-out infinite',
                        pointerEvents: 'none',
                    }} />
                )}
            </button>

            {/* ── Unread badge ── */}
            {!open && (
                <div style={{
                    position: 'fixed', bottom: 78, right: 20,
                    zIndex: 9998,
                    background: '#00a8ff',
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '3px 9px',
                    borderRadius: 20,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 10px rgba(0,168,255,0.4)',
                    animation: 'fadeInUp 0.4s ease',
                    pointerEvents: 'none',
                }}>
                    ¡Pregúntame!
                </div>
            )}

            {/* ── Chat window ── */}
            <div style={{
                position: 'fixed',
                bottom: 102,
                right: 28,
                zIndex: 9998,
                width: 380,
                maxHeight: 580,
                borderRadius: 20,
                overflow: 'hidden',
                background: '#060c1a',
                border: '1px solid rgba(0,168,255,0.2)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(0,168,255,0.1)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transformOrigin: 'bottom right',
                transform: open ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(20px)',
                opacity: open ? 1 : 0,
                pointerEvents: open ? 'all' : 'none',
            }}>
                {/* ── Header ── */}
                <div style={{
                    padding: '16px 20px',
                    background: 'linear-gradient(135deg, #0a1628 0%, #0d1f3c 100%)',
                    borderBottom: '1px solid rgba(0,168,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    flexShrink: 0,
                }}>
                    {/* Avatar */}
                    <div style={{
                        width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg, #00a8ff22, #00a8ff11)',
                        border: '2px solid rgba(0,168,255,0.4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 20,
                        boxShadow: '0 0 15px rgba(0,168,255,0.3)',
                    }}>
                        🤖
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#f0f4ff' }}>
                            TechBot
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{
                                width: 7, height: 7, borderRadius: '50%',
                                background: '#00ff88',
                                boxShadow: '0 0 6px rgba(0,255,136,0.8)',
                            }} />
                            <span style={{ fontSize: 12, color: '#8899bb' }}>
                                Asistente técnico · en línea
                            </span>
                        </div>
                    </div>
                    {/* Powered by */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        background: 'rgba(0,168,255,0.08)',
                        border: '1px solid rgba(0,168,255,0.15)',
                        borderRadius: 20, padding: '3px 10px',
                    }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#4285F4">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <span style={{ fontSize: 10, color: '#8899bb', fontWeight: 600 }}>Gemini</span>
                    </div>
                </div>

                {/* ── Messages ── */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '16px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(0,168,255,0.3) transparent',
                }}>
                    {messages.map(msg => (
                        <div key={msg.id} style={{
                            display: 'flex',
                            flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                            alignItems: 'flex-end',
                            gap: 8,
                        }}>
                            {/* Avatar */}
                            {msg.role === 'model' && (
                                <div style={{
                                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                                    background: 'rgba(0,168,255,0.15)',
                                    border: '1px solid rgba(0,168,255,0.3)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 14,
                                }}>🤖</div>
                            )}

                            <div style={{ maxWidth: '78%' }}>
                                {/* Bubble */}
                                <div style={{
                                    padding: '10px 14px',
                                    borderRadius: msg.role === 'user'
                                        ? '16px 16px 4px 16px'
                                        : '16px 16px 16px 4px',
                                    background: msg.role === 'user'
                                        ? 'linear-gradient(135deg, #00a8ff, #0066cc)'
                                        : 'rgba(13,21,38,0.95)',
                                    border: msg.role === 'user'
                                        ? 'none'
                                        : '1px solid rgba(0,168,255,0.15)',
                                    fontSize: 13.5,
                                    lineHeight: 1.6,
                                    color: msg.role === 'user' ? '#fff' : '#c8d8f0',
                                    wordBreak: 'break-word',
                                }}>
                                    <span
                                        dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
                                    />
                                </div>
                                {/* Timestamp */}
                                <div style={{
                                    fontSize: 10, color: 'rgba(136,153,187,0.6)',
                                    marginTop: 3,
                                    textAlign: msg.role === 'user' ? 'right' : 'left',
                                    paddingLeft: msg.role === 'model' ? 4 : 0,
                                    paddingRight: msg.role === 'user' ? 4 : 0,
                                }}>
                                    {formatTime(msg.timestamp)}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {loading && (
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                            <div style={{
                                width: 28, height: 28, borderRadius: '50%',
                                background: 'rgba(0,168,255,0.15)',
                                border: '1px solid rgba(0,168,255,0.3)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 14, flexShrink: 0,
                            }}>🤖</div>
                            <div style={{
                                padding: '10px 16px',
                                background: 'rgba(13,21,38,0.95)',
                                border: '1px solid rgba(0,168,255,0.15)',
                                borderRadius: '16px 16px 16px 4px',
                                display: 'flex', gap: 5, alignItems: 'center',
                            }}>
                                {[0, 0.2, 0.4].map((delay, i) => (
                                    <div key={i} style={{
                                        width: 7, height: 7, borderRadius: '50%',
                                        background: 'var(--electric-blue)',
                                        animation: `float 1s ${delay}s ease-in-out infinite`,
                                        opacity: 0.8,
                                    }} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quick replies */}
                    {showQuickReplies && messages.length === 1 && (
                        <div style={{
                            display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4
                        }}>
                            <span style={{ fontSize: 11, color: 'rgba(136,153,187,0.7)', paddingLeft: 36 }}>
                                Sugerencias:
                            </span>
                            {QUICK_REPLIES.map(qr => (
                                <button
                                    key={qr}
                                    onClick={() => sendMessage(qr)}
                                    style={{
                                        alignSelf: 'flex-start',
                                        marginLeft: 36,
                                        padding: '6px 14px',
                                        background: 'transparent',
                                        border: '1px solid rgba(0,168,255,0.3)',
                                        borderRadius: 20,
                                        color: '#00a8ff',
                                        fontSize: 12.5,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        textAlign: 'left',
                                        fontFamily: 'Inter, sans-serif',
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,168,255,0.1)';
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                                    }}
                                >
                                    {qr}
                                </button>
                            ))}
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* ── WhatsApp escalation strip ── */}
                <div style={{
                    padding: '8px 14px',
                    background: 'rgba(37,211,102,0.06)',
                    borderTop: '1px solid rgba(37,211,102,0.12)',
                    borderBottom: '1px solid rgba(0,168,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexShrink: 0,
                }}>
                    <span style={{ fontSize: 11.5, color: 'rgba(136,153,187,0.8)' }}>
                        ¿Prefieres hablar con un humano?
                    </span>
                    <a
                        href="https://wa.me/58412000000?text=Hola,%20necesito%20soporte%20técnico"
                        target="_blank"
                        rel="noopener noreferrer"
                        id="chatbot-whatsapp-link"
                        style={{
                            display: 'flex', alignItems: 'center', gap: 5,
                            fontSize: 11.5, fontWeight: 700, color: '#25D366',
                            textDecoration: 'none',
                            padding: '3px 10px',
                            borderRadius: 20,
                            border: '1px solid rgba(37,211,102,0.3)',
                            transition: 'all 0.2s',
                        }}
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                    </a>
                </div>

                {/* ── Input ── */}
                <form onSubmit={handleSubmit} style={{
                    padding: '12px 14px',
                    background: '#060c1a',
                    borderTop: '1px solid rgba(0,168,255,0.1)',
                    display: 'flex',
                    gap: 8,
                    flexShrink: 0,
                }}>
                    <input
                        ref={inputRef}
                        id="chatbot-input"
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Escribe tu pregunta…"
                        disabled={loading}
                        autoComplete="off"
                        style={{
                            flex: 1,
                            padding: '10px 14px',
                            background: 'rgba(13,21,38,0.9)',
                            border: '1px solid rgba(0,168,255,0.2)',
                            borderRadius: 12,
                            color: '#f0f4ff',
                            fontSize: 14,
                            outline: 'none',
                            fontFamily: 'Inter, sans-serif',
                            transition: 'border-color 0.2s',
                            opacity: loading ? 0.6 : 1,
                        }}
                        onFocus={e => {
                            (e.target as HTMLInputElement).style.borderColor = 'rgba(0,168,255,0.6)';
                        }}
                        onBlur={e => {
                            (e.target as HTMLInputElement).style.borderColor = 'rgba(0,168,255,0.2)';
                        }}
                    />
                    <button
                        type="submit"
                        id="chatbot-send-btn"
                        disabled={loading || !input.trim()}
                        style={{
                            width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                            background: input.trim() && !loading
                                ? 'linear-gradient(135deg, #00a8ff, #0055cc)'
                                : 'rgba(0,168,255,0.1)',
                            border: '1px solid rgba(0,168,255,0.2)',
                            cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s',
                            outline: 'none',
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke={input.trim() && !loading ? 'white' : 'rgba(0,168,255,0.4)'}
                            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                </form>
            </div>
        </>
    );
}
