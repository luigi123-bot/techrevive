"use client";

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
        <section id="testimonios" className="testimonials-section">
            {/* Background */}
            <div className="bg-grid"></div>
            <div className="orb orb-blue"></div>

            <div className="container">
                {/* Header */}
                <div className="header">
                    <div className="section-label">Testimonios</div>
                    <h2 className="section-title">
                        Lo que dicen nuestros{' '}
                        <span className="text-gradient">clientes</span>
                    </h2>
                    <p className="section-subtitle">
                        Más de 500 clientes satisfechos nos avalan. Su confianza es nuestra mayor motivación.
                    </p>

                    {/* Overall rating */}
                    <div className="overall-rating">
                        <div className="stars-box">
                            {'★★★★★'.split('').map((s, i) => (
                                <span key={i} className="star">{s}</span>
                            ))}
                        </div>
                        <span className="rating-val">5.0</span>
                        <span className="rating-count">· +500 reseñas</span>
                    </div>
                </div>

                {/* Reviews grid */}
                <div className="reviews-grid">
                    {reviews.map((r, i) => (
                        <div key={r.id} className="testimonial-card" style={{ '--delay': `${i * 0.1}s` } as any}>
                            {/* Stars */}
                            <div className="stars">
                                {Array.from({ length: r.rating }).map((_, j) => (
                                    <span key={j} className="card-star">★</span>
                                ))}
                            </div>

                            {/* Text */}
                            <p className="review-text">"{r.text}"</p>

                            {/* Service badge */}
                            <div className="badge-box">
                                <span className="service-badge">{r.service}</span>
                            </div>

                            {/* Author */}
                            <div className="author">
                                <div className="avatar" style={{ background: `${r.avatarColor}22`, border: `1.5px solid ${r.avatarColor}55`, color: r.avatarColor }}>
                                    {r.avatar}
                                </div>
                                <div>
                                    <div className="author-name">{r.name}</div>
                                    <div className="author-role">{r.role} · {r.date}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="cta-box">
                    <p>¿Quieres ser el próximo cliente satisfecho?</p>
                    <a href="https://wa.me/58412000000" target="_blank" rel="noopener noreferrer" className="btn-primary">
                        ¡Contáctanos ahora!
                    </a>
                </div>
            </div>

            <style jsx>{`
                .testimonials-section {
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
                    opacity: 0.3;
                }

                .orb-blue {
                    position: absolute;
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, rgba(0, 168, 255, 0.15) 0%, transparent 70%);
                    filter: blur(80px);
                    top: 30%;
                    left: -15%;
                    opacity: 0.4;
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
                    margin-bottom: 64px;
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

                .overall-rating {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    margin-top: 24px;
                    padding: 10px 24px;
                    background: rgba(251, 191, 36, 0.08);
                    border: 1px solid rgba(251, 191, 36, 0.25);
                    border-radius: 30px;
                }

                .star {
                    color: #fbbf24;
                    font-size: 18px;
                }

                .rating-val {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 20px;
                    font-weight: 800;
                    color: #fbbf24;
                }

                .rating-count {
                    font-size: 13px;
                    color: #4a5568;
                }

                .reviews-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 24px;
                }

                .testimonial-card {
                    background: rgba(13, 21, 38, 0.6);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 20px;
                    padding: 32px;
                    transition: all 0.3s;
                    animation: fadeInUp 0.6s var(--delay) both;
                }

                .testimonial-card:hover {
                    background: rgba(13, 21, 38, 0.8);
                    transform: translateY(-5px);
                    border-color: rgba(0, 168, 255, 0.2);
                }

                .card-star {
                    color: #fbbf24;
                    font-size: 14px;
                }

                .review-text {
                    font-size: 14.5px;
                    color: #8899bb;
                    line-height: 1.75;
                    margin: 16px 0 20px;
                    font-style: italic;
                }

                .service-badge {
                    font-size: 11px;
                    padding: 3px 10px;
                    border-radius: 20px;
                    font-weight: 600;
                    color: #00a8ff;
                    background: rgba(0, 168, 255, 0.08);
                    border: 1px solid rgba(0, 168, 255, 0.2);
                }

                .author {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    padding-top: 16px;
                    margin-top: 20px;
                }

                .avatar {
                    width: 42px;
                    height: 42px;
                    border-radius: 50%;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: 700;
                }

                .author-name {
                    font-size: 14px;
                    font-weight: 700;
                    color: #f0f4ff;
                }

                .author-role {
                    font-size: 12px;
                    color: #4a5568;
                }

                .cta-box {
                    text-align: center;
                    marginTop: 56px;
                }

                .cta-box p {
                    color: #8899bb;
                    margin-bottom: 20px;
                    font-size: 15px;
                }

                .btn-primary {
                    display: inline-block;
                    padding: 14px 32px;
                    background: linear-gradient(135deg, #00a8ff, #0077cc);
                    color: white;
                    border-radius: 12px;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 15px;
                    transition: all 0.3s;
                    box-shadow: 0 4px 15px rgba(0, 168, 255, 0.3);
                }

                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0, 168, 255, 0.5);
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}
