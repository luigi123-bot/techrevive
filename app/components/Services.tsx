"use client";

import { useState, useEffect } from "react";

export default function Services() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch('/api/services');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setServices(data.filter((s: any) => s.active !== false));
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    if (loading) {
        return <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00a8ff' }}>Cargando Servicios...</div>;
    }

    return (
        <section id="servicios" className="services-section">
            {/* Background grid */}
            <div className="bg-grid"></div>

            <div className="container">
                {/* Header */}
                <div className="header">
                    <div className="section-label">Nuestros Servicios</div>
                    <h2 className="section-title">
                        Todo lo que tu equipo{' '}
                        <span className="text-gradient">necesita</span>
                    </h2>
                    <p className="section-subtitle">
                        Soluciones técnicas integrales para usuarios hogareños y empresas.
                        Expertos certificados, repuestos originales y garantía escrita.
                    </p>
                </div>

                {/* Cards grid */}
                <div className="cards-grid">
                    {services.map((s: any, i: number) => (
                        <div key={s.id} className="service-card"
                            style={{ '--delay': `${i * 0.1}s` } as any}>
                            {/* Top accent line */}
                            <div className="accent-line" style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}></div>

                            <div className="service-icon" style={{ borderColor: `${s.color}33`, background: `${s.color}11` }}>
                                {s.icon}
                            </div>

                            <h3>{s.title}</h3>

                            <p>{s.desc}</p>

                            {/* Tags */}
                            <div className="tags">
                                {s.tags.map((t: string) => (
                                    <span key={t} style={{ color: s.color, border: `1px solid ${s.color}33`, background: `${s.color}0d` }}>{t}</span>
                                ))}
                            </div>

                            {/* Arrow */}
                            <div className="arrow" style={{ color: `${s.color}66` }}>→</div>
                        </div>
                    ))}

                    {/* CTA Card */}
                    <div className="cta-card">
                        <div className="cta-icon">💬</div>
                        <div>
                            <h3>¿No encuentras lo que buscas?</h3>
                            <p>Cuéntanos tu problema y te damos una solución personalizada.</p>
                            <a href="#contacto" className="btn-primary">
                                Consultar ahora
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .services-section {
                    background: #0a0f1e;
                    position: relative;
                    overflow: hidden;
                    padding: 100px 0;
                }

                .bg-grid {
                    position: absolute;
                    inset: 0;
                    background-image: linear-gradient(rgba(0, 168, 255, 0.05) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(0, 168, 255, 0.05) 1px, transparent 1px);
                    background-size: 40px 40px;
                    opacity: 0.5;
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
                    margin-bottom: 24px;
                    letter-spacing: -0.01em;
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

                .cards-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 24px;
                }

                .service-card {
                    background: rgba(13, 21, 38, 0.6);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 20px;
                    padding: 36px 28px;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.4s ease;
                    animation: fadeInUp 0.6s var(--delay) both;
                }

                .service-card:hover {
                    background: rgba(13, 21, 38, 0.9);
                    transform: translateY(-8px);
                    border-color: rgba(0, 168, 255, 0.3);
                    box-shadow: 0 12px 30px rgba(0,0,0,0.4);
                }

                .accent-line {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    opacity: 0.6;
                    transition: opacity 0.3s;
                }

                .service-card:hover .accent-line {
                    opacity: 1;
                }

                .service-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: 14px;
                    border: 1px solid;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    margin-bottom: 24px;
                    transition: transform 0.3s;
                }

                .service-card:hover .service-icon {
                    transform: scale(1.1) rotate(5deg);
                }

                h3 {
                    font-size: 18px;
                    font-weight: 700;
                    color: #f0f4ff;
                    margin-bottom: 12px;
                    line-height: 1.3;
                }

                p {
                    font-size: 14px;
                    color: #8899bb;
                    line-height: 1.7;
                    margin-bottom: 20px;
                }

                .tags {
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                }

                .tags span {
                    padding: 3px 10px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 600;
                }

                .arrow {
                    position: absolute;
                    bottom: 24px;
                    right: 24px;
                    font-size: 20px;
                    transition: all 0.3s;
                    opacity: 0;
                    transform: translateX(-10px);
                }

                .service-card:hover .arrow {
                    opacity: 1;
                    transform: translateX(0);
                }

                .cta-card {
                    padding: 36px 28px;
                    border-radius: 20px;
                    background: linear-gradient(135deg, rgba(0,168,255,0.1) 0%, rgba(0,255,136,0.05) 100%);
                    border: 1px dashed rgba(0,168,255,0.35);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    gap: 16px;
                    min-height: 200px;
                }

                .cta-icon {
                    font-size: 40px;
                }

                .btn-primary {
                    display: inline-block;
                    padding: 12px 24px;
                    background: linear-gradient(135deg, #00a8ff, #0077cc);
                    color: #fff;
                    border-radius: 10px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 14px;
                    transition: all 0.3s;
                    box-shadow: 0 4px 15px rgba(0,168,255,0.3);
                }

                .btn-primary:hover {
                    shadow: 0 6px 20px rgba(0,168,255,0.5);
                    transform: translateY(-2px);
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 640px) {
                    .cards-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </section>
    );
}
