export default function Testimonials() {
    const reviews = [
        {
            id: 'review-1',
            name: 'Andrea Rivas',
            role: 'Diseñadora gráfica',
            avatar: 'AR',
            avatarColor: '#00a8ff',
            rating: 5,
            text: 'Llevé mi MacBook Pro que no encendía y en menos de 3 horas me dieron un diagnóstico completo. Al día siguiente ya la tenía lista, como nueva. Honestidad y profesionalismo total.',
            service: 'Reparación de laptop',
            date: 'Enero 2026',
        },
        {
            id: 'review-2',
            name: 'Carlos Mendoza',
            role: 'Streamer & Gamer',
            avatar: 'CM',
            avatarColor: '#00ff88',
            rating: 5,
            text: 'Me armaron la PC gamer de mis sueños respetando mi presupuesto al 100%. Me explicaron cada componente, el por qué de cada pieza. Ya la tengo corriendo a 120fps sin ningún problema.',
            service: 'Armado de PC Gamer',
            date: 'Febrero 2026',
        },
        {
            id: 'review-3',
            name: 'María Fernanda Torres',
            role: 'Médico',
            avatar: 'MF',
            avatarColor: '#a78bfa',
            rating: 5,
            text: 'Mi laptop estaba lentísima, tardaba 10 min en encender. Le instalaron un SSD y ampliaron la RAM. Ahora arranca en segundos. El precio fue muy justo y el trato excelente.',
            service: 'Actualización de hardware',
            date: 'Enero 2026',
        },
        {
            id: 'review-4',
            name: 'Roberto Guzmán',
            role: 'Contador',
            avatar: 'RG',
            avatarColor: '#f59e0b',
            rating: 5,
            text: 'Perdí acceso a Windows y tenía información importante. El equipo recuperó todos mis archivos y reinstalaron el sistema. Profesionales de verdad. Ya los recomendé con toda mi oficina.',
            service: 'Recuperación de datos + SO',
            date: 'Diciembre 2025',
        },
        {
            id: 'review-5',
            name: 'Daniela Suárez',
            role: 'Estudiante universitaria',
            avatar: 'DS',
            avatarColor: '#ff3366',
            rating: 5,
            text: 'La pantalla de mi notebook se rompió una semana antes de mis exámenes. La tuve reparada al día siguiente con garantía. El precio fue muy accesible. ¡Los recomiendo completamente!',
            service: 'Reparación de pantalla',
            date: 'Noviembre 2025',
        },
        {
            id: 'review-6',
            name: 'Empresa LogiTech Solutions',
            role: 'Empresa · 12 equipos',
            avatar: 'LT',
            avatarColor: '#00a8ff',
            rating: 5,
            text: 'Contratamos mantenimiento preventivo para toda nuestra flota de equipos. Trabajo impecable, documentación detallada y servicio puntual. Son nuestro aliado tecnológico desde hace 2 años.',
            service: 'Mantenimiento corporativo',
            date: 'Febrero 2026',
        },
    ];

    return (
        <section id="testimonios" className="section-padding" style={{
            background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden'
        }}>
            {/* Background */}
            <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
            <div className="orb orb-blue" style={{ width: 500, height: 500, top: '30%', left: '-15%', opacity: 0.4 }} />

            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 64 }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>Testimonios</div>
                    <h2 className="section-title" style={{ textAlign: 'center' }}>
                        Lo que dicen nuestros{' '}
                        <span className="text-gradient">clientes</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
                        Más de 500 clientes satisfechos nos avalan. Su confianza es nuestra mayor motivación.
                    </p>

                    {/* Overall rating */}
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 12,
                        marginTop: 24, padding: '10px 24px',
                        background: 'rgba(251,191,36,0.08)',
                        border: '1px solid rgba(251,191,36,0.25)',
                        borderRadius: 30
                    }}>
                        <div style={{ display: 'flex', gap: 3 }}>
                            {'★★★★★'.split('').map((s, i) => (
                                <span key={i} className="star" style={{ fontSize: 18 }}>{s}</span>
                            ))}
                        </div>
                        <span style={{ fontSize: 20, fontWeight: 800, color: '#fbbf24', fontFamily: 'Orbitron, sans-serif' }}>5.0</span>
                        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>· +500 reseñas</span>
                    </div>
                </div>

                {/* Reviews grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: 24
                }}>
                    {reviews.map((r, i) => (
                        <div key={r.id} id={r.id} className="testimonial-card"
                            style={{ animationDelay: `${i * 0.1}s` }}>
                            {/* Stars */}
                            <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                                {Array.from({ length: r.rating }).map((_, j) => (
                                    <span key={j} className="star" style={{ fontSize: 14 }}>★</span>
                                ))}
                            </div>

                            {/* Text */}
                            <p style={{
                                fontSize: 14.5, color: 'var(--text-secondary)',
                                lineHeight: 1.75, marginBottom: 20, fontStyle: 'italic'
                            }}>
                                "{r.text}"
                            </p>

                            {/* Service badge */}
                            <div style={{ marginBottom: 20 }}>
                                <span style={{
                                    fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 600,
                                    color: 'var(--electric-blue)',
                                    background: 'rgba(0,168,255,0.08)',
                                    border: '1px solid rgba(0,168,255,0.2)'
                                }}>{r.service}</span>
                            </div>

                            {/* Author */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
                                <div style={{
                                    width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                                    background: `${r.avatarColor}22`,
                                    border: `1.5px solid ${r.avatarColor}55`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 12, fontWeight: 700, color: r.avatarColor
                                }}>
                                    {r.avatar}
                                </div>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{r.name}</div>
                                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.role} · {r.date}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div style={{ textAlign: 'center', marginTop: 56 }}>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 20, fontSize: 15 }}>
                        ¿Quieres ser el próximo cliente satisfecho?
                    </p>
                    <a href="https://wa.me/58412000000" target="_blank" rel="noopener noreferrer"
                        className="btn-primary" id="testimonials-cta-btn">
                        ¡Contáctanos ahora!
                    </a>
                </div>
            </div>
        </section>
    );
}
