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
        <section id="porque" className="section-padding" style={{
            background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden'
        }}>
            {/* Orbs */}
            <div className="orb orb-blue" style={{ width: 500, height: 500, top: '50%', right: '-15%', opacity: 0.5 }} />

            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
                {/* Stats Bar */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                    background: 'rgba(13,21,38,0.8)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 20, marginBottom: 80,
                    overflow: 'hidden'
                }}>
                    {stats.map((s, i) => (
                        <div key={s.label} id={`stat-${i}`} className="stat-item">
                            <span className="stat-number">{s.number}</span>
                            <span style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6, display: 'block' }}>{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* Header */}
                <div style={{ marginBottom: 56 }}>
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
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 16,
                }}>
                    {benefits.map((b) => (
                        <div key={b.id} id={`benefit-${b.id}`} className="why-card">
                            <div className="why-icon-wrap" style={{
                                background: `${b.accent}11`,
                                borderColor: `${b.accent}2d`
                            }}>
                                <span>{b.icon}</span>
                            </div>
                            <div>
                                <h3 style={{
                                    fontSize: 16, fontWeight: 700, color: 'var(--text-primary)',
                                    marginBottom: 6
                                }}>{b.title}</h3>
                                <p style={{
                                    fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.65
                                }}>{b.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div style={{
                    marginTop: 64, textAlign: 'center',
                    padding: '48px 32px',
                    background: 'linear-gradient(135deg, rgba(0,168,255,0.07) 0%, rgba(0,255,136,0.04) 100%)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 24,
                    position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute', top: -60, right: -60,
                        width: 200, height: 200, borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(0,168,255,0.1) 0%, transparent 70%)'
                    }} />
                    <h3 className="font-display" style={{
                        fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 700,
                        color: 'var(--text-primary)', marginBottom: 12
                    }}>
                        ¿Listo para que tu equipo{' '}
                        <span className="text-gradient">vuele de nuevo?</span>
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 28, fontSize: 15 }}>
                        Trae tu equipo hoy o contáctanos por WhatsApp. Diagnóstico en el momento.
                    </p>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="https://wa.me/58412000000" target="_blank" rel="noopener noreferrer"
                            className="btn-whatsapp" id="whyus-whatsapp-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Contactar por WhatsApp
                        </a>
                        <a href="#servicios" className="btn-secondary" id="whyus-services-btn">Ver servicios</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
