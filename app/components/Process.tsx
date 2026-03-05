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
        <section id="proceso" className="section-padding" style={{
            background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden'
        }}>
            {/* Background decoration */}
            <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
            <div className="orb orb-purple" style={{ width: 600, height: 600, bottom: '-20%', left: '-10%' }} />

            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 72 }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>Proceso de Trabajo</div>
                    <h2 className="section-title" style={{ textAlign: 'center' }}>
                        Simple, transparente y{' '}
                        <span className="text-gradient">sin sorpresas</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
                        Seguimos un proceso probado de 5 pasos para garantizar la mejor
                        experiencia desde que nos contactas hasta la entrega de tu equipo.
                    </p>
                </div>

                {/* Steps — alternating layout */}
                <div style={{ position: 'relative' }}>
                    {/* Vertical connector line */}
                    <div style={{
                        position: 'absolute',
                        left: '50%', top: 0, bottom: 0,
                        width: 1,
                        background: 'linear-gradient(180deg, transparent, rgba(0,168,255,0.2) 10%, rgba(0,168,255,0.2) 90%, transparent)',
                        transform: 'translateX(-50%)',
                        zIndex: 0
                    }} className="hidden md:block" />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
                        {steps.map((s, i) => {
                            const isEven = i % 2 === 0;
                            return (
                                <div key={s.id} id={s.id} style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr auto 1fr',
                                    gap: 32,
                                    alignItems: 'center',
                                    position: 'relative', zIndex: 1
                                }}>
                                    {/* Left content (even steps) */}
                                    <div style={{
                                        display: isEven ? 'block' : 'none',
                                        textAlign: 'right'
                                    }} className="hidden md:block">
                                        {isEven && (
                                            <StepContent step={s} reverse />
                                        )}
                                    </div>

                                    {/* Center dot */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                                        <div style={{
                                            width: 64, height: 64, borderRadius: '50%',
                                            background: `radial-gradient(circle, ${s.color}22 0%, ${s.color}08 70%)`,
                                            border: `2px solid ${s.color}55`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 24,
                                            boxShadow: `0 0 20px ${s.color}33`,
                                            flexShrink: 0
                                        }}>
                                            {s.icon}
                                        </div>
                                    </div>

                                    {/* Right content (odd steps) */}
                                    <div style={{
                                        display: isEven ? 'none' : 'block'
                                    }} className="hidden md:block">
                                        {!isEven && (
                                            <StepContent step={s} />
                                        )}
                                    </div>

                                    {/* Mobile: always show full width */}
                                    <div className="md:hidden" style={{ display: 'none' }}>
                                        <StepContent step={s} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile view: simple list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }} className="md:hidden">
                        {steps.map((s) => (
                            <div key={`m-${s.id}`} style={{
                                display: 'flex', gap: 20, alignItems: 'flex-start',
                                padding: '24px 20px',
                                background: 'var(--glass-bg)',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: 16
                            }}>
                                <div style={{
                                    width: 50, height: 50, borderRadius: '50%', flexShrink: 0,
                                    background: `${s.color}11`, border: `1.5px solid ${s.color}44`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22
                                }}>{s.icon}</div>
                                <div>
                                    <span className="font-display" style={{ fontSize: 11, color: s.color, letterSpacing: 1 }}>{s.num}</span>
                                    <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0 8px' }}>{s.title}</h3>
                                    <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{s.desc}</p>
                                    <span style={{ fontSize: 11.5, color: s.color, fontWeight: 600, display: 'block', marginTop: 8 }}>→ {s.detail}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function StepContent({ step, reverse = false }: {
    step: { num: string; title: string; desc: string; detail: string; color: string };
    reverse?: boolean;
}) {
    return (
        <div style={{
            padding: '28px 32px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 16,
            textAlign: reverse ? 'right' : 'left',
            transition: 'all 0.3s',
        }}>
            <span className="font-display" style={{
                fontSize: 11, letterSpacing: 2, color: step.color, fontWeight: 700
            }}>{step.num}</span>
            <h3 style={{
                fontSize: 18, fontWeight: 700, color: 'var(--text-primary)',
                margin: '6px 0 10px', lineHeight: 1.3
            }}>{step.title}</h3>
            <p style={{
                fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12
            }}>{step.desc}</p>
            <span style={{
                fontSize: 12, color: step.color, fontWeight: 600,
                background: `${step.color}11`, padding: '3px 10px',
                borderRadius: 20, border: `1px solid ${step.color}22`,
                display: 'inline-block'
            }}>✓ {step.detail}</span>
        </div>
    );
}
