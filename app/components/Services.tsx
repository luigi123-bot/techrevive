export default function Services() {
    const services = [
        {
            id: 'reparacion',
            icon: '🔧',
            title: 'Reparación de PC & Laptops',
            desc: 'Diagnóstico completo y reparación de cualquier falla: no enciende, pantalla rota, teclado dañado, problemas de placa base y más.',
            tags: ['Hardware', 'Placa base', 'Pantallas'],
            color: '#00a8ff',
        },
        {
            id: 'mantenimiento',
            icon: '🛠️',
            title: 'Mantenimiento Preventivo & Correctivo',
            desc: 'Limpieza profunda, cambio de pasta térmica, eliminación de virus y optimización del sistema para un rendimiento óptimo.',
            tags: ['Limpieza', 'Antivirus', 'Optimización'],
            color: '#00ff88',
        },
        {
            id: 'hardware',
            icon: '💾',
            title: 'Actualización de Hardware',
            desc: 'Ampliamos RAM, cambiamos HDD por SSD, mejoramos GPU y procesador. Dale una segunda vida a tu equipo con los últimos componentes.',
            tags: ['RAM', 'SSD', 'GPU', 'CPU'],
            color: '#a78bfa',
        },
        {
            id: 'software',
            icon: '💿',
            title: 'Instalación de Programas & SO',
            desc: 'Instalamos y configuramos Windows, Linux, drivers, antivirus, Office, Adobe y todo el software que necesites, de forma segura y rápida.',
            tags: ['Windows', 'Linux', 'Office', 'Drivers'],
            color: '#f59e0b',
        },
        {
            id: 'gamer',
            icon: '🎮',
            title: 'Armado de PCs Gamer',
            desc: 'Diseñamos y ensamblamos tu PC gamer a medida según tu presupuesto y necesidades. Gaming de alto rendimiento con garantía total.',
            tags: ['Custom Build', 'RGB', 'Overclocking'],
            color: '#ff3366',
        },
    ];

    return (
        <section id="servicios" className="section-padding" style={{
            background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden'
        }}>
            {/* Background grid */}
            <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 64 }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>Nuestros Servicios</div>
                    <h2 className="section-title" style={{ textAlign: 'center' }}>
                        Todo lo que tu equipo{' '}
                        <span className="text-gradient">necesita</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
                        Soluciones técnicas integrales para usuarios hogareños y empresas.
                        Expertos certificados, repuestos originales y garantía escrita.
                    </p>
                </div>

                {/* Cards grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 24,
                }}>
                    {services.map((s, i) => (
                        <div key={s.id} id={`service-card-${s.id}`} className="service-card"
                            style={{ animationDelay: `${i * 0.1}s` }}>
                            {/* Top accent line */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                                background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
                                opacity: 0.6
                            }} />

                            <div className="service-icon" style={{
                                borderColor: `${s.color}33`,
                                background: `${s.color}11`,
                            }}>
                                {s.icon}
                            </div>

                            <h3 style={{
                                fontSize: 18, fontWeight: 700, color: 'var(--text-primary)',
                                marginBottom: 12, lineHeight: 1.3
                            }}>
                                {s.title}
                            </h3>

                            <p style={{
                                fontSize: 14, color: 'var(--text-secondary)',
                                lineHeight: 1.7, marginBottom: 20
                            }}>
                                {s.desc}
                            </p>

                            {/* Tags */}
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                {s.tags.map(t => (
                                    <span key={t} style={{
                                        padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                                        color: s.color, border: `1px solid ${s.color}33`,
                                        background: `${s.color}0d`
                                    }}>{t}</span>
                                ))}
                            </div>

                            {/* Arrow */}
                            <div style={{
                                position: 'absolute', bottom: 24, right: 24,
                                color: `${s.color}66`, fontSize: 20, transition: 'all 0.3s'
                            }}>→</div>
                        </div>
                    ))}

                    {/* CTA Card */}
                    <div style={{
                        padding: '36px 28px', borderRadius: 20,
                        background: 'linear-gradient(135deg, rgba(0,168,255,0.1) 0%, rgba(0,255,136,0.05) 100%)',
                        border: '1px dashed rgba(0,168,255,0.35)',
                        display: 'flex', flexDirection: 'column',
                        justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 16,
                        minHeight: 200
                    }}>
                        <div style={{ fontSize: 40 }}>💬</div>
                        <div>
                            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
                                ¿No encuentras lo que buscas?
                            </h3>
                            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20 }}>
                                Cuéntanos tu problema y te damos una solución personalizada.
                            </p>
                            <a href="#contacto" className="btn-primary" id="services-contact-cta">
                                Consultar ahora
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
