"use client";

export default function Process() {
    const steps = [
        {
            id: 'step-contacto',
            num: '01',
            icon: '💬',
            title: 'Contáctanos',
            desc: 'Escríbenos por WhatsApp, llámanos o visita nuestro local. Cuéntanos el problema de tu equipo y agenda sin compromisos.',
            detail: 'Disponible Lun–Sáb 8am a 7pm',
            color: '#00a8ff',
        },
        {
            id: 'step-diagnostico',
            num: '02',
            icon: '🔍',
            title: 'Diagnóstico Gratuito',
            desc: 'Nuestros técnicos evalúan tu equipo a fondo. Te presentamos un informe detallado del problema y la solución en menos de 2 horas.',
            detail: 'Sin costo, sin compromiso',
            color: '#00ff88',
        },
        {
            id: 'step-presupuesto',
            num: '03',
            icon: '📋',
            title: 'Presupuesto & Aprobación',
            desc: 'Te enviamos la cotización clara antes de comenzar. Si estás de acuerdo, aprobas el trabajo. Sin sorpresas al final.',
            detail: 'Precios fijos y transparentes',
            color: '#a78bfa',
        },
        {
            id: 'step-reparacion',
            num: '04',
            icon: '⚙️',
            title: 'Reparación Profesional',
            desc: 'Nuestros técnicos trabajan con herramientas de precisión y repuestos de calidad. Te actualizamos el progreso en tiempo real.',
            detail: 'Promedio 24–48h de entrega',
            color: '#f59e0b',
        },
        {
            id: 'step-entrega',
            num: '05',
            icon: '✅',
            title: 'Entrega & Garantía',
            desc: 'Antes de entregarte el equipo realizamos pruebas exhaustivas. Recibes garantía escrita de 3 meses y soporte posterior.',
            detail: 'Garantía de 90 días',
            color: '#00ff88',
        },
    ];

    return (
        <section id="proceso" className="process-section">
            <div className="bg-grid"></div>
            <div className="orb orb-purple"></div>

            <div className="container">
                <div className="header">
                    <div className="section-label">Proceso de Trabajo</div>
                    <h2 className="section-title">
                        Simple, transparente y{' '}
                        <span className="text-gradient">sin sorpresas</span>
                    </h2>
                    <p className="section-subtitle">
                        Seguimos un proceso probado de 5 pasos para garantizar la mejor
                        experiencia desde que nos contactas hasta la entrega de tu equipo.
                    </p>
                </div>

                <div className="timeline-container">
                    <div className="vertical-line hidden md:block"></div>

                    <div className="desktop-steps hidden md:flex">
                        {steps.map((s, i) => {
                            const isEven = i % 2 === 0;
                            return (
                                <div key={s.id} className="step-row">
                                    <div className="step-content-cell left">
                                        {isEven && <StepContent step={s} reverse />}
                                    </div>
                                    <div className="step-dot-cell">
                                        <div className="dot" style={{
                                            background: `radial-gradient(circle, ${s.color}22 0%, ${s.color}08 70%)`,
                                            border: `2px solid ${s.color}55`,
                                            boxShadow: `0 0 20px ${s.color}33`,
                                        }}>
                                            {s.icon}
                                        </div>
                                    </div>
                                    <div className="step-content-cell right">
                                        {!isEven && <StepContent step={s} />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mobile-steps md:hidden">
                        {steps.map((s) => (
                            <div key={`m-${s.id}`} className="mobile-card">
                                <div className="mobile-icon" style={{ background: `${s.color}11`, border: `1.5px solid ${s.color}44` }}>
                                    {s.icon}
                                </div>
                                <div>
                                    <span className="step-num" style={{ color: s.color }}>{s.num}</span>
                                    <h3 className="mobile-title">{s.title}</h3>
                                    <p className="mobile-desc">{s.desc}</p>
                                    <span className="mobile-detail" style={{ color: s.color }}>→ {s.detail}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .process-section {
                    background: #0a0f1e;
                    position: relative;
                    overflow: hidden;
                    padding: 100px 0;
                    font-family: 'Inter', sans-serif;
                }

                .bg-grid {
                    position: absolute;
                    inset: 0;
                    background-image: linear-gradient(rgba(0, 168, 255, 0.05) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(0, 168, 255, 0.05) 1px, transparent 1px);
                    background-size: 40px 40px;
                    opacity: 0.4;
                }

                .orb-purple {
                    position: absolute;
                    width: 600px;
                    height: 600px;
                    bottom: -20%;
                    left: -10%;
                    background: radial-gradient(circle, rgba(120, 40, 255, 0.12) 0%, transparent 70%);
                    filter: blur(80px);
                    pointer-events: none;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px;
                    position: relative;
                    z-index: 1;
                }

                .header {
                    text-align: center;
                    margin-bottom: 72px;
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
                    margin: 20px auto 0;
                    line-height: 1.6;
                }

                .timeline-container {
                    position: relative;
                }

                .vertical-line {
                    position: absolute;
                    left: 50%;
                    top: 0;
                    bottom: 0;
                    width: 1px;
                    background: linear-gradient(180deg, transparent, rgba(0,168,255,0.2) 10%, rgba(0,168,255,0.2) 90%, transparent);
                    transform: translateX(-50%);
                    z-index: 0;
                }

                .desktop-steps {
                    display: flex;
                    flex-direction: column;
                    gap: 48px;
                }

                .step-row {
                    display: grid;
                    grid-template-columns: 1fr auto 1fr;
                    gap: 32px;
                    align-items: center;
                    position: relative;
                    z-index: 1;
                }

                .step-content-cell {
                    width: 100%;
                }

                .step-dot-cell {
                    display: flex;
                    justify-content: center;
                }

                .dot {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    flex-shrink: 0;
                    transition: all 0.3s;
                }

                .dot:hover {
                    transform: scale(1.1);
                }

                .mobile-steps {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .mobile-card {
                    display: flex;
                    gap: 20px;
                    align-items: flex-start;
                    padding: 24px 20px;
                    background: rgba(13, 21, 38, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 16px;
                }

                .mobile-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 22px;
                }

                .step-num {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 11px;
                    letter-spacing: 1px;
                }

                .mobile-title {
                    font-size: 16px;
                    font-weight: 700;
                    color: #f0f4ff;
                    margin: 4px 0 8px;
                }

                .mobile-desc {
                    font-size: 13.5px;
                    color: #8899bb;
                    line-height: 1.65;
                }

                .mobile-detail {
                    font-size: 11.5px;
                    font-weight: 600;
                    display: block;
                    marginTop: 8px;
                }

                @media (min-width: 769px) {
                    .md\:flex { display: flex; }
                    .hidden { display: none; }
                }

                @media (max-width: 768px) {
                    .md\:hidden { display: flex; }
                    .hidden { display: none; }
                }
            `}</style>
        </section>
    );
}

function StepContent({ step, reverse = false }: {
    step: { num: string; title: string; desc: string; detail: string; color: string };
    reverse?: boolean;
}) {
    return (
        <div className="step-content-box">
            <span className="step-num">{step.num}</span>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-desc">{step.desc}</p>
            <span className="step-badge">✓ {step.detail}</span>

            <style jsx>{`
                .step-content-box {
                    padding: 28px 32px;
                    background: rgba(13, 21, 38, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 16px;
                    text-align: ${reverse ? 'right' : 'left'};
                    transition: all 0.3s;
                }

                .step-content-box:hover {
                    background: rgba(13, 21, 38, 0.7);
                    transform: translateY(-5px);
                    border-color: rgba(0, 168, 255, 0.2);
                }

                .step-num {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 11px;
                    letter-spacing: 2px;
                    color: ${step.color};
                    font-weight: 700;
                }

                .step-title {
                    font-size: 18px;
                    font-weight: 700;
                    color: #f0f4ff;
                    margin: 6px 0 10px;
                    line-height: 1.3;
                }

                .step-desc {
                    font-size: 14px;
                    color: #8899bb;
                    line-height: 1.7;
                    margin-bottom: 12px;
                }

                .step-badge {
                    font-size: 12px;
                    color: ${step.color};
                    font-weight: 600;
                    background: ${step.color}11;
                    padding: 3px 10px;
                    border-radius: 20px;
                    border: 1px solid ${step.color}22;
                    display: inline-block;
                }
            `}</style>
        </div>
    );
}
