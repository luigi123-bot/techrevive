'use client';

import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', service: '', message: ''
    });
    const [sent, setSent] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const msg = encodeURIComponent(
            `Hola TechRevive! 👋\n\n` +
            `*Nombre:* ${formData.name}\n` +
            `*Email:* ${formData.email}\n` +
            `*Teléfono:* ${formData.phone}\n` +
            `*Servicio:* ${formData.service}\n\n` +
            `*Mensaje:*\n${formData.message}`
        );
        window.open(`https://wa.me/58412000000?text=${msg}`, '_blank');
        setSent(true);
    };

    const contactItems = [
        {
            id: 'contact-whatsapp',
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
            label: 'WhatsApp',
            value: '+58 412-000-0000',
            sub: 'Respuesta inmediata',
            href: 'https://wa.me/58412000000',
            color: '#25D366',
        },
        {
            id: 'contact-phone',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--electric-blue)" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                </svg>
            ),
            label: 'Teléfono',
            value: '+58 212-000-0000',
            sub: 'Lun–Sáb 8am – 7pm',
            href: 'tel:+582120000000',
            color: 'var(--electric-blue)',
        },
        {
            id: 'contact-email',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            ),
            label: 'Correo',
            value: 'info@techrevive.com',
            sub: 'Respondemos en 24h',
            href: 'mailto:info@techrevive.com',
            color: '#a78bfa',
        },
        {
            id: 'contact-location',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
            ),
            label: 'Ubicación',
            value: 'Av. Tecnología, Local 12, Caracas',
            sub: 'Visítanos sin cita previa',
            href: 'https://maps.google.com',
            color: '#f59e0b',
        },
    ];

    const socials = [
        {
            id: 'social-instagram', label: 'Instagram', href: 'https://instagram.com/techrevive', icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            )
        },
        {
            id: 'social-facebook', label: 'Facebook', href: 'https://facebook.com/techrevive', icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            )
        },
        {
            id: 'social-tiktok', label: 'TikTok', href: 'https://tiktok.com/@techrevive', icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
            )
        },
    ];

    return (
        <section id="contacto" className="section-padding" style={{
            background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden'
        }}>
            {/* Background */}
            <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
            <div className="orb orb-blue" style={{ width: 600, height: 600, bottom: '-20%', right: '-10%', opacity: 0.5 }} />

            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 64 }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>Contacto</div>
                    <h2 className="section-title" style={{ textAlign: 'center' }}>
                        ¿Tu equipo tiene{' '}
                        <span className="text-gradient">problemas?</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
                        Estamos aquí para ayudarte. Contáctanos por cualquier canal y te
                        respondemos de inmediato.
                    </p>
                </div>

                <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 48, alignItems: 'start'
                }}>
                    {/* Left: Contact info */}
                    <div>
                        {/* CTA destacado */}
                        <a href="https://wa.me/58412000000?text=Hola%2C+necesito+soporte+técnico"
                            target="_blank" rel="noopener noreferrer"
                            id="contact-main-whatsapp"
                            style={{
                                display: 'flex', alignItems: 'center', gap: 16,
                                padding: '20px 24px', marginBottom: 24,
                                background: 'linear-gradient(135deg, rgba(37,211,102,0.15), rgba(18,140,126,0.08))',
                                border: '1.5px solid rgba(37,211,102,0.4)',
                                borderRadius: 16, textDecoration: 'none',
                                transition: 'all 0.3s',
                            }}>
                            <div style={{
                                width: 52, height: 52, borderRadius: 12, flexShrink: 0,
                                background: 'rgba(37,211,102,0.15)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="#25D366">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </div>
                            <div>
                                <div style={{ fontSize: 15, fontWeight: 700, color: '#25D366', marginBottom: 2 }}>
                                    Chat en WhatsApp →
                                </div>
                                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                                    Respuesta inmediata · Lun–Sáb 8am–7pm
                                </div>
                            </div>
                        </a>

                        {/* Contact items */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                            {contactItems.map(ci => (
                                <a key={ci.id} id={ci.id} href={ci.href} target="_blank" rel="noopener noreferrer"
                                    className="contact-info-card" style={{ textDecoration: 'none' }}>
                                    <div style={{
                                        width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                                        background: `${ci.color}11`,
                                        border: `1px solid ${ci.color}2d`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {ci.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1 }}>{ci.label}</div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{ci.value}</div>
                                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{ci.sub}</div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Social Networks */}
                        <div>
                            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600 }}>Síguenos</p>
                            <div style={{ display: 'flex', gap: 10 }}>
                                {socials.map(s => (
                                    <a key={s.id} id={s.id} href={s.href} target="_blank" rel="noopener noreferrer"
                                        className="social-icon" title={s.label} aria-label={s.label}>
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div style={{
                        padding: '40px 36px',
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 24,
                        backdropFilter: 'blur(16px)'
                    }}>
                        {sent ? (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
                                <h3 className="font-display" style={{ fontSize: 22, color: 'var(--text-primary)', marginBottom: 12 }}>
                                    ¡Mensaje enviado!
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
                                    Te hemos redirigido a WhatsApp. Responderemos a la brevedad.
                                </p>
                                <button onClick={() => setSent(false)} className="btn-secondary"
                                    style={{ cursor: 'pointer' }}>
                                    Enviar otro mensaje
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="font-display" style={{
                                    fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6
                                }}>Envíanos un mensaje</h3>
                                <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 28 }}>
                                    Completa el formulario y te contactamos vía WhatsApp al instante.
                                </p>

                                <form onSubmit={handleSubmit}
                                    style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                        <div>
                                            <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6, fontWeight: 500 }}>
                                                Nombre *
                                            </label>
                                            <input id="form-name" name="name" type="text" required
                                                placeholder="Tu nombre"
                                                className="input-field" value={formData.name} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6, fontWeight: 500 }}>
                                                Teléfono
                                            </label>
                                            <input id="form-phone" name="phone" type="tel"
                                                placeholder="+58 412-..."
                                                className="input-field" value={formData.phone} onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6, fontWeight: 500 }}>
                                            Correo electrónico
                                        </label>
                                        <input id="form-email" name="email" type="email"
                                            placeholder="tu@email.com"
                                            className="input-field" value={formData.email} onChange={handleChange} />
                                    </div>

                                    <div>
                                        <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6, fontWeight: 500 }}>
                                            Servicio de interés *
                                        </label>
                                        <select id="form-service" name="service" required
                                            className="input-field" value={formData.service} onChange={handleChange}
                                            style={{ cursor: 'pointer' }}>
                                            <option value="" disabled>Selecciona un servicio…</option>
                                            <option value="Reparación de PC o Laptop">Reparación de PC o Laptop</option>
                                            <option value="Mantenimiento preventivo/correctivo">Mantenimiento preventivo/correctivo</option>
                                            <option value="Actualización de hardware">Actualización de hardware</option>
                                            <option value="Instalación de programas o SO">Instalación de programas o SO</option>
                                            <option value="Armado de PC Gamer">Armado de PC Gamer</option>
                                            <option value="Otro">Otro</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6, fontWeight: 500 }}>
                                            Describe tu problema *
                                        </label>
                                        <textarea id="form-message" name="message" required
                                            placeholder="Cuéntanos qué le pasa a tu equipo…"
                                            className="input-field" value={formData.message} onChange={handleChange} />
                                    </div>

                                    <button type="submit" id="form-submit-btn" className="btn-primary"
                                        style={{ justifyContent: 'center', width: '100%', marginTop: 4 }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Enviar por WhatsApp
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
