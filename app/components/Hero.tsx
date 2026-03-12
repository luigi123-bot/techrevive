'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
    const titleRef = useRef<HTMLHeadingElement>(null);

    // Typewriter for the subtitle badge
    useEffect(() => {
        const words = ['Rápido.', 'Confiable.', 'Garantizado.'];
        let wi = 0, ci = 0, deleting = false;
        const el = document.getElementById('typewriter');
        if (!el) return;

        const tick = () => {
            const word = words[wi];
            el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
            let speed = deleting ? 60 : 100;
            if (!deleting && ci > word.length) { speed = 1800; deleting = true; }
            else if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; speed = 400; }
            setTimeout(tick, speed);
        };
        const timer = setTimeout(tick, 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="inicio" className="hero-section">
            {/* Background elements */}
            <div className="bg-grid"></div>

            {/* Gradient orbs */}
            <div className="orb orb-blue"></div>
            <div className="orb orb-green"></div>
            <div className="orb orb-purple"></div>

            {/* Content */}
            <div className="container hero-container">
                {/* Left: Text */}
                <div className="animate-fade-up">
                    {/* Badge */}
                    <div className="hero-badge">
                        <span className="dot"></span>
                        Servicio técnico profesional · <span id="typewriter" style={{ fontWeight: 700 }}>Rápido.</span>
                        <span className="cursor">|</span>
                    </div>

                    {/* Main Title */}
                    <h1 ref={titleRef} className="hero-title">
                        <span className="display-top">Tu equipo merece</span>
                        <span className="display-main text-gradient">lo mejor.</span>
                        <span className="display-sub">Nosotros lo hacemos posible.</span>
                    </h1>

                    <p className="hero-description">
                        Especialistas en <strong>infraestructura cloud</strong>, desarrollo web de alto impacto y automatizaciones con IA.
                        Impulsamos tu negocio con tecnología de vanguardia y flujos de trabajo inteligentes.
                    </p>

                    {/* CTA Buttons */}
                    <div className="cta-group">
                        <a href="https://wa.me/573023140199?text=Hola%2C+quiero+un+diagn%C3%B3stico+gratuito"
                            target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Pedir diagnóstico gratis
                        </a>
                        <a href="#servicios" className="btn-secondary">
                            Ver servicios
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                        </a>
                    </div>

                    {/* Trust badges */}
                    <div className="trust-badges">
                        {[
                            { icon: '🛡️', text: 'Garantía de 3 meses' },
                            { icon: '⚡', text: 'Entrega en 24–48h' },
                            { icon: '💰', text: 'Diagnóstico gratis' },
                        ].map((b) => (
                            <div key={b.text} className="trust-item">
                                <span className="trust-icon">{b.icon}</span>
                                {b.text}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Terminal / Visual */}
                <div className="hero-visual hidden md:block animate-fade-up-delay">
                    <div className="animate-float">
                        <div className="terminal-window">
                            <div className="terminal-header">
                                <div className="terminal-dot red" />
                                <div className="terminal-dot yellow" />
                                <div className="terminal-dot green" />
                                <span className="terminal-title">techrevive ~ diagnóstico</span>
                            </div>
                            <div className="terminal-body">
                                <div><span className="t-green">$</span> <span className="t-blue">n8n</span> <span className="t-white">--deploy-workflow</span> <span className="t-yellow">"AI-Agent"</span></div>
                                <div className="t-gray">── Conectando con API OpenAI... ✔</div>
                                <div className="t-gray">── Configurando nodos de automatización...</div>
                                <div style={{ marginTop: 8 }}>
                                    <span className="t-yellow">Cloud:</span> <span className="t-white">AWS Lambda · Active ✔</span>
                                </div>
                                <div>
                                    <span className="t-yellow">DB:</span> <span className="t-white">MongoDB Atlas · Connected ✔</span>
                                </div>
                                <div>
                                    <span className="t-yellow">SSL:</span> <span className="t-white">Certificate · Renewed ✔</span>
                                </div>
                                <div>
                                    <span className="t-yellow">AI:</span> <span className="t-white">GPT-4 Omni · Integrated ✔</span>
                                </div>
                                <div style={{ marginTop: 8 }}>
                                    <span className="t-green">✔ Despliegue exitoso en producción.</span>
                                </div>
                                <div style={{ marginTop: 4 }}>
                                    <span className="t-blue">→ Estado:</span> <span className="t-white">Optimización continua activa</span>
                                </div>
                                <div>
                                    <span className="t-blue">→ Hosting:</span> <span className="t-white">Global Edge Network</span>
                                </div>
                                <div>
                                    <span className="t-blue">→ Latencia:</span> <span className="t-green">&lt; 20ms</span>
                                </div>
                                <div style={{ marginTop: 8 }}>
                                    <span className="t-green">$</span> <span className="blink-cursor t-blue">|</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating stat chips */}
                        <div className="stat-chips">
                            {[
                                { n: '+120', label: 'Nodos Desplegados' },
                                { n: '99.9%', label: 'Uptime Cloud' },
                                { n: '24/7', label: 'Soporte Hosting' },
                            ].map(s => (
                                <div key={s.n} className="stat-chip">
                                    <div className="stat-num">{s.n}</div>
                                    <div className="stat-label">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator">
                <span className="scroll-text">Scroll</span>
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
            </div>

            <style jsx>{`
                .hero-section {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    position: relative;
                    overflow: hidden;
                    background: #050810;
                    padding-top: 70px;
                    font-family: 'Inter', sans-serif;
                }

                .bg-grid {
                    position: absolute;
                    inset: 0;
                    background-image: linear-gradient(rgba(0, 168, 255, 0.03) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(0, 168, 255, 0.03) 1px, transparent 1px);
                    background-size: 50px 50px;
                    z-index: 0;
                }

                .orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    pointer-events: none;
                }

                .orb-blue {
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, rgba(0, 168, 255, 0.25) 0%, transparent 70%);
                    top: 10%;
                    left: -10%;
                }

                .orb-green {
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(0, 255, 136, 0.15) 0%, transparent 70%);
                    top: 40%;
                    right: -5%;
                }

                .orb-purple {
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, rgba(120, 40, 255, 0.12) 0%, transparent 70%);
                    bottom: -20%;
                    left: 30%;
                }

                .hero-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 80px 24px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 80px;
                    align-items: center;
                    position: relative;
                    z-index: 1;
                    width: 100%;
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(0, 168, 255, 0.08);
                    border: 1px solid rgba(0, 168, 255, 0.25);
                    border-radius: 30px;
                    padding: 6px 16px;
                    margin-bottom: 28px;
                    font-size: 13px;
                    color: #00a8ff;
                    font-weight: 500;
                }

                .dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #00ff88;
                    display: inline-block;
                    box-shadow: 0 0 8px rgba(0,255,136,0.8);
                }

                .cursor {
                    color: #00a8ff;
                    animation: blink 1s step-end infinite;
                }

                @keyframes blink {
                    from, to { opacity: 1; }
                    50% { opacity: 0; }
                }

                .hero-title {
                    margin-bottom: 20px;
                }

                .display-top {
                    font-family: 'Orbitron', sans-serif;
                    font-size: clamp(36px, 5.5vw, 68px);
                    font-weight: 900;
                    color: #f0f4ff;
                    line-height: 1.1;
                    display: block;
                }

                .display-main {
                    font-family: 'Orbitron', sans-serif;
                    font-size: clamp(36px, 5.5vw, 68px);
                    font-weight: 900;
                    line-height: 1.1;
                    display: block;
                }

                .display-sub {
                    font-family: 'Orbitron', sans-serif;
                    font-size: clamp(26px, 3.5vw, 46px);
                    font-weight: 700;
                    color: #8899bb;
                    line-height: 1.2;
                    display: block;
                    marginTop: 4px;
                }

                .text-gradient {
                    background: linear-gradient(135deg, #00a8ff 0%, #00d4ff 50%, #00ff88 100%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .hero-description {
                    font-size: 17px;
                    color: #8899bb;
                    line-height: 1.75;
                    margin-bottom: 40px;
                    max-width: 500px;
                }

                .hero-description strong {
                    color: #f0f4ff;
                }

                .cta-group {
                    display: flex;
                    gap: 16px;
                    flex-wrap: wrap;
                }

                .btn-whatsapp {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 16px 32px;
                    background: linear-gradient(135deg, #25D366, #128C7E);
                    color: #fff;
                    font-weight: 700;
                    font-size: 15px;
                    border: none;
                    border-radius: 12px;
                    cursor: pointer;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 20px rgba(37, 211, 102, 0.35);
                }

                .btn-whatsapp:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 30px rgba(37, 211, 102, 0.5);
                }

                .btn-secondary {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 16px 32px;
                    background: transparent;
                    color: #00a8ff;
                    font-weight: 600;
                    font-size: 15px;
                    border: 1.5px solid #00a8ff;
                    border-radius: 12px;
                    cursor: pointer;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }

                .btn-secondary:hover {
                    background: rgba(0, 168, 255, 0.1);
                    transform: translateY(-2px);
                }

                .trust-badges {
                    display: flex;
                    gap: 24px;
                    margin-top: 36px;
                    flex-wrap: wrap;
                }

                .trust-item {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    font-size: 13px;
                    color: #8899bb;
                    font-weight: 500;
                }

                .trust-icon {
                    font-size: 16px;
                }

                .terminal-window {
                    background: #0d1526;
                    border-radius: 12px;
                    border: 1px solid rgba(0, 168, 255, 0.15);
                    overflow: hidden;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                }

                .terminal-header {
                    padding: 12px 16px;
                    background: rgba(255,255,255,0.03);
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    display: flex;
                    align-items: center;
                }

                .terminal-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    margin-right: 6px;
                }

                .terminal-dot.red { background: #ff5f57; }
                .terminal-dot.yellow { background: #ffbd2e; }
                .terminal-dot.green { background: #28ca41; }

                .terminal-title {
                    margin-left: 12px;
                    font-size: 12px;
                    color: #4a5568;
                    font-family: monospace;
                }

                .terminal-body {
                    padding: 20px;
                    font-family: 'Fira Code', 'Courier New', monospace;
                    font-size: 13px;
                    line-height: 1.6;
                }

                .t-green { color: #00ff88; }
                .t-blue { color: #00a8ff; }
                .t-white { color: #f0f4ff; }
                .t-gray { color: #4a5568; }
                .t-yellow { color: #fbbf24; }

                .stat-chips {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 16px;
                    gap: 12px;
                }

                .stat-chip {
                    flex: 1;
                    padding: 14px 12px;
                    background: rgba(13,21,38,0.9);
                    border: 1px solid rgba(0, 168, 255, 0.15);
                    border-radius: 12px;
                    text-align: center;
                }

                .stat-num {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 20px;
                    font-weight: 800;
                    color: #00a8ff;
                }

                .stat-label {
                    font-size: 11px;
                    color: #4a5568;
                    margin-top: 2px;
                }

                .scroll-indicator {
                    position: absolute;
                    bottom: 32px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;
                    z-index: 1;
                }

                .scroll-text {
                    font-size: 11px;
                    color: #4a5568;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                }

                .mouse {
                    width: 24px;
                    height: 40px;
                    border: 1.5px solid rgba(0,168,255,0.3);
                    border-radius: 12px;
                    display: flex;
                    justify-content: center;
                    padding-top: 6px;
                }

                .wheel {
                    width: 4px;
                    height: 8px;
                    border-radius: 2px;
                    background: #00a8ff;
                    animation: float 1.5s ease-in-out infinite;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-6px); }
                }

                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .animate-fade-up {
                    animation: fadeInUp 0.8s ease forwards;
                }

                .animate-fade-up-delay {
                    animation: fadeInUp 0.8s 0.2s ease both;
                }

                @media (max-width: 768px) {
                    .hero-container {
                        grid-template-columns: 1fr;
                        text-align: center;
                        gap: 40px;
                    }
                    .hero-description {
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .hero-badge, .cta-group, .trust-badges {
                        justify-content: center;
                    }
                    .hidden { display: none; }
                }
            `}</style>
        </section>
    );
}
