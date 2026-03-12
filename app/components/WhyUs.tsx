"use client";

export default function WhyUs() {
    const benefits = [
        {
            id: 'rapido',
            icon: '⚡',
            title: 'Servicio Exprés',
            desc: 'La mayoría de reparaciones listas en 24 a 48 horas. Sin esperas interminables.',
            accent: '#00a8ff',
        },
        {
            id: 'garantia',
            icon: '🛡️',
            title: 'Garantía de 3 Meses',
            desc: 'Respaldamos cada trabajo con garantía escrita. Si falla, lo arreglamos sin costo.',
            accent: '#00ff88',
        },
        {
            id: 'experiencia',
            icon: '🏆',
            title: 'Técnicos Certificados',
            desc: 'Más de 8 años de experiencia y técnicos con certificaciones en hardware y software.',
            accent: '#a78bfa',
        },
        {
            id: 'diagnostico',
            icon: '🔍',
            title: 'Diagnóstico Gratuito',
            desc: 'Sin cargos ocultos. Te informamos el problema y el costo antes de comenzar.',
            accent: '#f59e0b',
        },
        {
            id: 'repuestos',
            icon: '✅',
            title: 'Repuestos Originales',
            desc: 'Usamos solo componentes originales o de primera calidad. Larga vida útil garantizada.',
            accent: '#00ff88',
        },
        {
            id: 'soporte',
            icon: '📱',
            title: 'Soporte Post-servicio',
            desc: 'Te acompañamos después de la reparación. Soporte por WhatsApp sin costo adicional.',
            accent: '#00a8ff',
        },
        {
            id: 'precios',
            icon: '💳',
            title: 'Precios Transparentes',
            desc: 'Tarifas justas y sin sorpresas. Cotización gratuita antes de cualquier trabajo.',
            accent: '#ff3366',
        },
        {
            id: 'seguridad',
            icon: '🔒',
            title: 'Datos 100% Seguros',
            desc: 'Tu privacidad es prioridad. Firmamos acuerdo de confidencialidad si lo necesitas.',
            accent: '#a78bfa',
        },
    ];

    const stats = [
        { number: '500+', label: 'Clientes satisfechos' },
        { number: '8+', label: 'Años de experiencia' },
        { number: '98%', label: 'Tasa de éxito' },
        { number: '24h', label: 'Tiempo promedio' },
    ];

    return (
        <section id="porque" className="why-section">
            {/* Orbs */}
            <div className="orb orb-blue"></div>

            <div className="container">
                {/* Stats Bar */}
                <div className="stats-bar">
                    {stats.map((s, i) => (
                        <div key={s.label} className="stat-item">
                            <span className="stat-number">{s.number}</span>
                            <span className="stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* Header */}
                <div className="header">
                    <div className="section-label">¿Por qué elegirnos?</div>
                    <h2 className="section-title">
                        La diferencia está en{' '}
                        <span className="text-gradient">los detalles</span>
                    </h2>
                    <p className="section-subtitle">
                        No somos un servicio técnico más. Somos tu aliado tecnológico con un compromiso
                        real de calidad, honestidad y resultados.
                    </p>
                </div>

                {/* Benefits grid */}
                <div className="benefits-grid">
                    {benefits.map((b) => (
                        <div key={b.id} className="why-card">
                            <div className="why-icon-wrap" style={{ background: `${b.accent}11`, borderColor: `${b.accent}2d` }}>
                                <span>{b.icon}</span>
                            </div>
                            <div>
                                <h3>{b.title}</h3>
                                <p>{b.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="bottom-cta">
                    <div className="cta-orb"></div>
                    <h3 className="cta-title">
                        ¿Listo para que tu equipo{' '}
                        <span className="text-gradient">vuele de nuevo?</span>
                    </h3>
                    <p className="cta-desc">
                        Trae tu equipo hoy o contáctanos por WhatsApp. Diagnóstico en el momento.
                    </p>
                    <div className="cta-buttons">
                        <a href="https://wa.me/573023140199" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Contactar por WhatsApp
                        </a>
                        <a href="#servicios" className="btn-secondary">Ver servicios</a>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .why-section {
                    background: #050810;
                    position: relative;
                    overflow: hidden;
                    padding: 100px 0;
                    font-family: 'Inter', sans-serif;
                }

                .orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    pointer-events: none;
                }

                .orb-blue {
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, rgba(0, 168, 255, 0.15) 0%, transparent 70%);
                    top: 50%;
                    right: -15%;
                    opacity: 0.5;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px;
                    position: relative;
                    z-index: 1;
                }

                .stats-bar {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    background: rgba(13, 21, 38, 0.8);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 20px;
                    margin-bottom: 80px;
                    overflow: hidden;
                }

                .stat-item {
                    padding: 30px 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    border-right: 1px solid rgba(255, 255, 255, 0.05);
                }

                .stat-item:last-child {
                    border-right: none;
                }

                .stat-number {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 28px;
                    font-weight: 800;
                    color: #00a8ff;
                    letter-spacing: -0.02em;
                }

                .stat-label {
                    font-size: 13px;
                    color: #4a5568;
                    margin-top: 6px;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .header {
                    margin-bottom: 56px;
                    text-align: center;
                }

                .section-label {
                    display: inline-flex;
                    padding: 6px 16px;
                    background: rgba(0, 168, 255, 0.1);
                    border: 1px solid rgba(0, 168, 255, 0.2);
                    border-radius: 40px;
                    color: #00a8ff;
                    font-size: 13px;
                    font-weight: 700;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    margin-bottom: 20px;
                }

                .section-title {
                    font-family: 'Orbitron', sans-serif;
                    font-size: clamp(32px, 4vw, 48px);
                    font-weight: 800;
                    color: #f0f4ff;
                    margin-bottom: 24px;
                }

                .text-gradient {
                    background: linear-gradient(135deg, #00a8ff 0%, #00ff88 100%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .section-subtitle {
                    font-size: 16px;
                    color: #8899bb;
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                .benefits-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 16px;
                }

                .why-card {
                    background: rgba(13, 21, 38, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 16px;
                    padding: 24px;
                    display: flex;
                    gap: 20px;
                    transition: all 0.3s ease;
                }

                .why-card:hover {
                    background: rgba(13, 21, 38, 0.7);
                    transform: translateY(-5px);
                    border-color: rgba(0, 168, 255, 0.2);
                }

                .why-icon-wrap {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    border: 1px solid;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    flex-shrink: 0;
                }

                h3 {
                    font-size: 16px;
                    font-weight: 700;
                    color: #f0f4ff;
                    margin-bottom: 6px;
                }

                p {
                    font-size: 13.5px;
                    color: #8899bb;
                    line-height: 1.65;
                }

                .bottom-cta {
                    margin-top: 64px;
                    text-align: center;
                    padding: 48px 32px;
                    background: linear-gradient(135deg, rgba(0,168,255,0.07) 0%, rgba(0,255,136,0.04) 100%);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                    position: relative;
                    overflow: hidden;
                }

                .cta-orb {
                    position: absolute;
                    top: -60px;
                    right: -60px;
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(0,168,255,0.1) 0%, transparent 70%);
                    pointer-events: none;
                }

                .cta-title {
                    font-family: 'Orbitron', sans-serif;
                    font-size: clamp(20px, 3vw, 30px);
                    font-weight: 700;
                    color: #f0f4ff;
                    margin-bottom: 12px;
                }

                .cta-desc {
                    color: #8899bb;
                    margin-bottom: 28px;
                    font-size: 15px;
                }

                .cta-buttons {
                    display: flex;
                    gap: 16px;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .btn-whatsapp {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 14px 28px;
                    background: linear-gradient(135deg, #25D366, #128C7E);
                    color: #fff;
                    font-weight: 700;
                    font-size: 15px;
                    border-radius: 12px;
                    text-decoration: none;
                    transition: all 0.3s;
                    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
                }

                .btn-whatsapp:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
                }

                .btn-secondary {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 14px 28px;
                    background: transparent;
                    color: #00a8ff;
                    font-weight: 600;
                    font-size: 15px;
                    border: 1.5px solid #00a8ff;
                    border-radius: 12px;
                    text-decoration: none;
                    transition: all 0.3s;
                }

                .btn-secondary:hover {
                    background: rgba(0, 168, 255, 0.1);
                    transform: translateY(-2px);
                }

                @media (max-width: 768px) {
                    .stats-bar {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .stat-item:nth-child(2) {
                        border-right: none;
                    }
                    .stat-item:nth-child(-n+2) {
                        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    }
                }

                @media (max-width: 480px) {
                    .stats-bar {
                        grid-template-columns: 1fr;
                    }
                    .stat-item {
                        border-right: none;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    }
                    .stat-item:last-child {
                        border-bottom: none;
                    }
                }
            `}</style>
        </section>
    );
}
