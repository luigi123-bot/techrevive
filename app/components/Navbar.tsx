'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const links = [
        { label: 'Servicios', href: '#servicios' },
        { label: '¿Por qué nosotros?', href: '#porque' },
        { label: 'Proceso', href: '#proceso' },
        { label: 'Testimonios', href: '#testimonios' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            {/* Logo */}
            <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: 'linear-gradient(135deg, #00a8ff, #0055aa)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, flexShrink: 0,
                    boxShadow: '0 0 16px rgba(0,168,255,0.4)'
                }}>⚡</div>
                <span className="font-display" style={{ fontSize: 18, fontWeight: 700, color: '#f0f4ff', letterSpacing: 1 }}>
                    TECH<span style={{ color: 'var(--electric-blue)' }}>REVIVE</span>
                </span>
            </a>

            {/* Desktop Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}
                className="hidden md:flex">
                {links.map(l => (
                    <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
                ))}
                <a href="#contacto" className="nav-cta">Contáctanos</a>
            </div>

            {/* Mobile Hamburger */}
            <button
                id="mobile-menu-btn"
                className="md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--text-primary)', fontSize: 22, padding: 4
                }}
                aria-label="Abrir menú"
            >
                {menuOpen ? '✕' : '☰'}
            </button>

            {/* Mobile Menu */}
            {menuOpen && (
                <div style={{
                    position: 'absolute', top: 70, left: 0, right: 0,
                    background: 'rgba(5,8,16,0.97)', backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid var(--border-subtle)',
                    padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16
                }}>
                    {links.map(l => (
                        <a key={l.href} href={l.href} className="nav-link"
                            onClick={() => setMenuOpen(false)}
                            style={{ fontSize: 15 }}>{l.label}</a>
                    ))}
                    <a href="#contacto" className="nav-cta" style={{ textAlign: 'center' }}
                        onClick={() => setMenuOpen(false)}>Contáctanos</a>
                </div>
            )}
        </nav>
    );
}
