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
        setTimeout(tick, 800);
    }, []);

    return (
        <section id="inicio" style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center',
            position: 'relative', overflow: 'hidden',
            background: 'var(--bg-primary)', paddingTop: 70
        }}>
            {/* Background elements */}
            <div className="bg-grid" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

            {/* Gradient orbs */}
            <div className="orb orb-blue" style={{ width: 600, height: 600, top: '10%', left: '-10%' }} />
            <div className="orb orb-green" style={{ width: 400, height: 400, top: '40%', right: '-5%' }} />
            <div className="orb orb-purple" style={{ width: 500, height: 500, bottom: '-20%', left: '30%' }} />

            {/* Circuit-like decorative lines */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(0,168,255,0.04) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(0,255,136,0.03) 0%, transparent 50%)
        `,
                zIndex: 0, pointerEvents: 'none'
            }} />

            {/* Content */}
            <div className="container" style={{
                maxWidth: 1200, margin: '0 auto', padding: '80px 24px',
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
                alignItems: 'center', position: 'relative', zIndex: 1,
                width: '100%'
            }}>
                {/* Left: Text */}
                <div style={{ animation: 'fadeInUp 0.8s ease forwards' }}>
                    {/* Badge */}
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: 'rgba(0,168,255,0.08)',
                        border: '1px solid rgba(0,168,255,0.25)',
                        borderRadius: 30, padding: '6px 16px',
                        marginBottom: 28, fontSize: 13, color: 'var(--electric-blue)', fontWeight: 500
                    }}>
                        <span style={{
                            width: 6, height: 6, borderRadius: '50%',
                            background: 'var(--neon-green)',
                            display: 'inline-block',
                            boxShadow: '0 0 8px rgba(0,255,136,0.8)'
                        }} />
                        Servicio técnico profesional · <span id="typewriter" style={{ fontWeight: 700 }}>Rápido.</span>
                        <span className="cursor" style={{ color: 'var(--electric-blue)' }}>|</span>
                    </div>

                    {/* Main Title */}
                    <h1 ref={titleRef} style={{ marginBottom: 20 }}>
                        <span className="font-display" style={{
                            fontSize: 'clamp(36px, 5.5vw, 68px)',
                            fontWeight: 900,
                            color: 'var(--text-primary)',
                            lineHeight: 1.1,
                            display: 'block'
                        }}>
                            Tu equipo merece
                        </span>
                        <span className="font-display text-gradient" style={{
                            fontSize: 'clamp(36px, 5.5vw, 68px)',
                            fontWeight: 900, lineHeight: 1.1,
                            display: 'block'
                        }}>
                            lo mejor.
                        </span>
                        <span className="font-display" style={{
                            fontSize: 'clamp(26px, 3.5vw, 46px)',
                            fontWeight: 700,
                            color: 'var(--text-secondary)',
                            lineHeight: 1.2,
                            display: 'block',
                            marginTop: 4
                        }}>
                            Nosotros lo hacemos posible.
                        </span>
                    </h1>

                    <p style={{
                        fontSize: 17, color: 'var(--text-secondary)',
                        lineHeight: 1.75, marginBottom: 40, maxWidth: 500
                    }}>
                        Especialistas en reparación, mantenimiento y actualización de PCs y laptops.
                        Diagnóstico gratuito, atención personalizada y <strong style={{ color: 'var(--text-primary)' }}>garantía en todos nuestros servicios.</strong>
                    </p>

                    {/* CTA Buttons */}
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        <a href="https://wa.me/58412000000?text=Hola%2C+quiero+un+diagn%C3%B3stico+gratuito"
                            target="_blank" rel="noopener noreferrer" className="btn-whatsapp" id="hero-whatsapp-btn">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Pedir diagnóstico gratis
                        </a>
                        <a href="#servicios" className="btn-secondary" id="hero-services-btn">
                            Ver servicios
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                        </a>
                    </div>

                    {/* Trust badges */}
                    <div style={{
                        display: 'flex', gap: 24, marginTop: 36, flexWrap: 'wrap'
                    }}>
                        {[
                            { icon: '🛡️', text: 'Garantía de 3 meses' },
                            { icon: '⚡', text: 'Entrega en 24–48h' },
                            { icon: '💰', text: 'Diagnóstico gratis' },
                        ].map((b) => (
                            <div key={b.text} style={{
                                display: 'flex', alignItems: 'center', gap: 7,
                                fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500
                            }}>
                                <span style={{ fontSize: 16 }}>{b.icon}</span>
                                {b.text}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Terminal / Visual */}
                <div style={{ animation: 'fadeInUp 0.8s 0.2s ease both' }}
                    className="hidden md:block">
                    <div className="animate-float">
                        <div className="terminal-window">
                            <div className="terminal-header">
                                <div className="terminal-dot" style={{ background: '#ff5f57' }} />
                                <div className="terminal-dot" style={{ background: '#ffbd2e' }} />
                                <div className="terminal-dot" style={{ background: '#28ca41' }} />
                                <span style={{ marginLeft: 12, fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                                    techrevive ~ diagnóstico
                                </span>
                            </div>
                            <div className="terminal-body">
                                <div><span className="t-green">$</span> <span className="t-blue">iniciar_diagnóstico</span> <span className="t-white">--equipo=laptop</span></div>
                                <div className="t-gray">── Conectando con sistema... ✔</div>
                                <div className="t-gray">── Escaneando hardware...</div>
                                <div style={{ marginTop: 8 }}>
                                    <span className="t-yellow">CPU:</span> <span className="t-white">Intel Core i5 · 85°C ⚠️</span>
                                </div>
                                <div>
                                    <span className="t-yellow">RAM:</span> <span className="t-white">8 GB DDR4 · OK ✔</span>
                                </div>
                                <div>
                                    <span className="t-yellow">SSD:</span> <span className="t-white">256 GB ·Health 62% ⚠️</span>
                                </div>
                                <div>
                                    <span className="t-yellow">GPU:</span> <span className="t-white">NVIDIA RTX 3060 · OK ✔</span>
                                </div>
                                <div style={{ marginTop: 8 }}>
                                    <span className="t-green">✔ Diagnóstico completo.</span>
                                </div>
                                <div style={{ marginTop: 4 }}>
                                    <span className="t-blue">→ Recomendación:</span> <span className="t-white">Limpieza térmica + pasta</span>
                                </div>
                                <div>
                                    <span className="t-blue">→ Tiempo estimado:</span> <span className="t-white">2 horas</span>
                                </div>
                                <div>
                                    <span className="t-blue">→ Costo:</span> <span className="t-green">Bs. 25 – 40</span>
                                </div>
                                <div style={{ marginTop: 8 }}>
                                    <span className="t-green">$</span> <span className="cursor t-blue">|</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating stat chips */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, gap: 12 }}>
                            {[
                                { n: '+500', label: 'Equipos reparados' },
                                { n: '98%', label: 'Satisfacción' },
                                { n: '5★', label: 'Calificación' },
                            ].map(s => (
                                <div key={s.n} style={{
                                    flex: 1, padding: '14px 12px',
                                    background: 'rgba(13,21,38,0.9)',
                                    border: '1px solid var(--border-subtle)',
                                    borderRadius: 12, textAlign: 'center'
                                }}>
                                    <div className="font-display" style={{ fontSize: 20, fontWeight: 800, color: 'var(--electric-blue)' }}>{s.n}</div>
                                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div style={{
                position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                zIndex: 1
            }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: 2, textTransform: 'uppercase' }}>Scroll</span>
                <div style={{
                    width: 24, height: 40, border: '1.5px solid rgba(0,168,255,0.3)',
                    borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 6
                }}>
                    <div style={{
                        width: 4, height: 8, borderRadius: 2,
                        background: 'var(--electric-blue)',
                        animation: 'float 1.5s ease-in-out infinite'
                    }} />
                </div>
            </div>
        </section>
    );
}
