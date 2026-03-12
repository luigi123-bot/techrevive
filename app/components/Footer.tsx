"use client";

export default function Footer() {
    const year = new Date().getFullYear();

    const services = [
        { label: 'Reparación de PC & Laptops', href: '#servicios' },
        { label: 'Mantenimiento preventivo', href: '#servicios' },
        { label: 'Actualización de hardware', href: '#servicios' },
        { label: 'Instalación de programas', href: '#servicios' },
        { label: 'Armado de PCs Gamer', href: '#servicios' },
    ];

    const info = [
        { label: '¿Por qué elegirnos?', href: '#porque' },
        { label: 'Nuestro proceso', href: '#proceso' },
        { label: 'Testimonios', href: '#testimonios' },
        { label: 'Contacto', href: '#contacto' },
    ];

    const socials = [
        {
            id: 'footer-instagram',
            href: 'https://instagram.com/techrevive',
            label: 'Instagram',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
        },
        {
            id: 'footer-facebook',
            href: 'https://facebook.com/techrevive',
            label: 'Facebook',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
        },
        {
            id: 'footer-whatsapp',
            href: 'https://wa.me/58412000000',
            label: 'WhatsApp',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
        },
        {
            id: 'footer-tiktok',
            href: 'https://tiktok.com/@techrevive',
            label: 'TikTok',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
            ),
        },
    ];

    return (
        <footer className="footer">
            {/* Top glow line */}
            <div className="glow-line"></div>

            <div className="container">
                {/* Main grid */}
                <div className="footer-grid">
                    {/* Brand column */}
                    <div className="brand-col">
                        {/* Logo */}
                        <a href="#" className="logo">
                            <div className="logo-badge">⚡</div>
                            <span className="logo-text">
                                TECH<span className="accent">REVIVE</span>
                            </span>
                        </a>

                        <p className="brand-desc">
                            Tu aliado tecnológico de confianza. Reparación, mantenimiento y potenciación
                            de tus equipos con garantía y profesionalismo.
                        </p>

                        {/* Social icons */}
                        <div className="social-icons">
                            {socials.map(s => (
                                <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" className="social-icon">
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services links */}
                    <div className="links-col">
                        <h4>Servicios</h4>
                        <div className="links-list">
                            {services.map(s => (
                                <a key={s.label} href={s.href} className="footer-link">{s.label}</a>
                            ))}
                        </div>
                    </div>

                    {/* Info links */}
                    <div className="links-col">
                        <h4>Empresa</h4>
                        <div className="links-list">
                            {info.map(i => (
                                <a key={i.label} href={i.href} className="footer-link">{i.label}</a>
                            ))}
                        </div>
                    </div>

                    {/* Contact info */}
                    <div className="contact-col">
                        <h4>Contacto</h4>
                        <div className="contact-info-list">
                            <a href="https://wa.me/58412000000" target="_blank" rel="noopener noreferrer" className="whatsapp-link">
                                <div className="contact-label">WHATSAPP</div>
                                <div className="whatsapp-val">+58 412-000-0000</div>
                            </a>
                            <div className="contact-item">
                                <div className="contact-label">TELÉFONO</div>
                                <div className="contact-val">+58 212-000-0000</div>
                            </div>
                            <div className="contact-item">
                                <div className="contact-label">EMAIL</div>
                                <div className="contact-val">info@techrevive.com</div>
                            </div>
                            <div className="contact-item">
                                <div className="contact-label">HORARIO</div>
                                <div className="contact-val">Lunes – Sábado</div>
                                <div className="contact-val">8:00 AM – 7:00 PM</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="bottom-bar">
                    <p className="copyright">
                        © {year} <span className="accent">TechRevive</span>. Todos los derechos reservados.
                    </p>
                    <div className="made-with">
                        <span>Hecho con</span>
                        <span className="heart">♥</span>
                        <span>para tus equipos</span>
                    </div>
                    <div className="status">
                        <div className="status-dot"></div>
                        <span>Servicio disponible ahora</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .footer {
                    background: #050810;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    position: relative;
                    overflow: hidden;
                    font-family: 'Inter', sans-serif;
                }

                .glow-line {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #00a8ff, #00ff88, #00a8ff, transparent);
                    opacity: 0.4;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 64px 24px 32px;
                }

                .footer-grid {
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr 1.5fr;
                    gap: 48px;
                    margin-bottom: 56px;
                }

                .brand-col {
                    display: flex;
                    flex-direction: column;
                }

                .logo {
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 20px;
                }

                .logo-badge {
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    background: linear-gradient(135deg, #00a8ff, #0055aa);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    color: white;
                    box-shadow: 0 0 16px rgba(0,168,255,0.4);
                }

                .logo-text {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 18px;
                    font-weight: 700;
                    color: #f0f4ff;
                    letter-spacing: 1px;
                }

                .accent {
                    color: #00a8ff;
                }

                .brand-desc {
                    font-size: 14px;
                    color: #4a5568;
                    line-height: 1.75;
                    margin-bottom: 24px;
                    max-width: 280px;
                }

                .social-icons {
                    display: flex;
                    gap: 10px;
                }

                .social-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #4a5568;
                    transition: all 0.3s;
                }

                .social-icon:hover {
                    background: #00a8ff;
                    color: white;
                    transform: translateY(-3px);
                }

                .links-col h4, .contact-col h4 {
                    font-size: 13px;
                    font-weight: 700;
                    color: #f0f4ff;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    margin-bottom: 20px;
                }

                .links-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .footer-link {
                    color: #4a5568;
                    text-decoration: none;
                    font-size: 14px;
                    transition: all 0.2s;
                }

                .footer-link:hover {
                    color: #00a8ff;
                }

                .contact-info-list {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                }

                .contact-label {
                    font-size: 11px;
                    color: #4a5568;
                    margin-bottom: 2px;
                    letter-spacing: 0.5px;
                    font-weight: 600;
                }

                .whatsapp-link {
                    text-decoration: none;
                }

                .whatsapp-val {
                    font-size: 14px;
                    color: #25D366;
                    font-weight: 600;
                }

                .contact-val {
                    font-size: 14px;
                    color: #8899bb;
                    font-weight: 500;
                }

                .bottom-bar {
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    padding-top: 28px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 16px;
                }

                .copyright {
                    font-size: 13px;
                    color: #4a5568;
                }

                .made-with {
                    display: flex;
                    gap: 4px;
                    align-items: center;
                    font-size: 12px;
                    color: #4a5568;
                }

                .heart {
                    color: #ff3366;
                }

                .status {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12px;
                    color: #4a5568;
                }

                .status-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #00ff88;
                    box-shadow: 0 0 6px #00ff88;
                }

                @media (max-width: 900px) {
                    .footer-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 40px;
                    }
                }

                @media (max-width: 480px) {
                    .footer-grid {
                        grid-template-columns: 1fr;
                    }
                    .bottom-bar {
                        justify-content: center;
                        text-align: center;
                    }
                }
            `}</style>
        </footer>
    );
}
