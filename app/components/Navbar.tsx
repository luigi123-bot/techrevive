'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                localStorage.removeItem('user');
            }
        }

        setMounted(true);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleSignOut = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            localStorage.removeItem('user');
            setUser(null);
            router.push('/');
            router.refresh();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const links = [
        { label: 'Servicios', href: '#servicios' },
        { label: '¿Por qué nosotros?', href: '#porque' },
        { label: 'Proceso', href: '#proceso' },
        { label: 'Testimonios', href: '#testimonios' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="logo-icon">⚡</div>
                <span className="font-display logo-text">
                    TECH<span style={{ color: '#00a8ff' }}>REVIVE</span>
                </span>
            </Link>

            {/* Desktop Links */}
            <div className="nav-links hidden md:flex">
                {links.map(l => (
                    <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
                ))}

                {mounted && (user ? (
                    <div className="user-profile">
                        <div className="user-avatar">
                            {(user.name || user.email || '?').charAt(0)}
                        </div>
                        <div className="user-info">
                            <span className="user-name">{user.name}</span>
                            <button onClick={handleSignOut} className="sign-out-btn">Cerrar Sesión</button>
                        </div>
                    </div>
                ) : (
                    <Link href="/login" className="login-link">Ingreso</Link>
                ))}
                {mounted && user?.role === 'admin' && (
                    <Link href="/admin" className="admin-btn">
                        <span>⚙️</span> Panel Admin
                    </Link>
                )}
                <a href="#contacto" className="nav-cta">Contáctanos</a>
            </div>

            {/* Mobile Hamburger */}
            <button
                id="mobile-menu-btn"
                className="md:hidden hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Abrir menú"
            >
                {menuOpen ? '✕' : '☰'}
            </button>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="mobile-menu">
                    {links.map(l => (
                        <a key={l.href} href={l.href} className="nav-link"
                            onClick={() => setMenuOpen(false)}>{l.label}</a>
                    ))}
                    {mounted && user ? (
                        <>
                            <span className="user-name-mobile">{user.name}</span>
                            {user.role === 'admin' && (
                                <Link
                                    href="/admin"
                                    className="admin-btn-mobile"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    ⚙️ Panel Admin
                                </Link>
                            )}
                            <button
                                onClick={() => { handleSignOut(); setMenuOpen(false); }}
                                className="sign-out-btn-mobile"
                            >Salir</button>
                        </>
                    ) : mounted ? (
                        <Link href="/login" className="nav-link"
                            onClick={() => setMenuOpen(false)}>Ingreso</Link>
                    ) : null}
                    <a href="#contacto" className="nav-cta" style={{ textAlign: 'center' }}
                        onClick={() => setMenuOpen(false)}>Contáctanos</a>
                </div>
            )}

            <style jsx>{`
                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    padding: 0 40px;
                    height: 70px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    transition: all 0.4s ease;
                }

                .navbar.scrolled {
                    background: rgba(5, 8, 16, 0.92);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(0, 168, 255, 0.15);
                }

                .logo-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    background: linear-gradient(135deg, #00a8ff, #0055aa);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    flex-shrink: 0;
                    box-shadow: 0 0 16px rgba(0,168,255,0.4);
                    color: white;
                }

                .logo-text {
                    font-size: 18px;
                    font-weight: 700;
                    color: #f0f4ff;
                    letter-spacing: 1px;
                }

                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 32px;
                }

                .nav-link {
                    color: #ffffff;
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 500;
                    transition: all 0.2s;
                    position: relative;
                    padding: 8px 12px;
                }

                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 1.5px;
                    background: #00a8ff;
                    transition: width 0.3s ease;
                }

                .nav-link:hover {
                    color: #f0f4ff;
                }

                .nav-link:hover::after {
                    width: 100%;
                }

                .user-profile {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: rgba(255,255,255,0.05);
                    padding: 4px 12px 4px 6px;
                    borderRadius: 40px;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .user-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #00a8ff, #0055aa);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    fontSize: 12, fontWeight: 800, color: 'white';
                    text-transform: uppercase;
                    box-shadow: 0 0 10px rgba(0,168,255,0.3);
                    color: white;
                    font-weight: 800;
                }

                .user-info {
                    display: flex;
                    flex-direction: column;
                }

                .user-name {
                    font-size: 11px;
                    font-weight: 600;
                    color: #f0f4ff;
                    line-height: 1.2;
                }

                .sign-out-btn {
                    background: none;
                    border: none;
                    padding: 0;
                    color: rgba(255,255,255,0.4);
                    font-size: 10px;
                    font-weight: 700;
                    cursor: pointer;
                    text-align: left;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .sign-out-btn:hover {
                    color: #ff3366;
                }

                .login-link {
                    padding: 8px 16px;
                    border-radius: 8px;
                    border: 1px solid rgba(0, 168, 255, 0.4);
                    font-size: 13px;
                    color: #fff;
                    text-decoration: none;
                }

                .nav-cta {
                    background: linear-gradient(135deg, #00a8ff, #0077cc);
                    color: #fff;
                    padding: 10px 24px;
                    border-radius: 10px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 14px;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0,168,255,0.3);
                }

                .nav-cta:hover {
                    box-shadow: 0 6px 20px rgba(0,168,255,0.5);
                    transform: translateY(-2px);
                }

                .hamburger {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #f0f4ff;
                    font-size: 24px;
                    padding: 4px;
                }

                .mobile-menu {
                    position: absolute;
                    top: 70px;
                    left: 0;
                    right: 0;
                    background: rgba(5,8,16,0.97);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(0, 168, 255, 0.15);
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .user-name-mobile {
                    font-size: 15px;
                    color: #8899bb;
                    padding: 0 12px;
                }

                .sign-out-btn-mobile {
                    text-align: left;
                    background: none;
                    border: none;
                    color: #ff3366;
                    font-size: 15px;
                    padding: 8px 12px;
                    cursor: pointer;
                }

                .admin-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: linear-gradient(135deg, rgba(0,168,255,0.15), rgba(0,85,204,0.15));
                    border: 1px solid rgba(0,168,255,0.4);
                    color: #00a8ff;
                    padding: 8px 16px;
                    border-radius: 10px;
                    font-size: 13px;
                    font-weight: 700;
                    text-decoration: none;
                    transition: all 0.25s ease;
                    white-space: nowrap;
                }

                .admin-btn:hover {
                    background: linear-gradient(135deg, #00a8ff, #0055cc);
                    color: #fff;
                    border-color: #00a8ff;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0,168,255,0.35);
                }

                .admin-btn-mobile {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: linear-gradient(135deg, rgba(0,168,255,0.1), rgba(0,85,204,0.1));
                    border: 1px solid rgba(0,168,255,0.3);
                    color: #00a8ff;
                    padding: 12px 16px;
                    border-radius: 10px;
                    font-size: 15px;
                    font-weight: 700;
                    text-decoration: none;
                    transition: all 0.2s;
                }

                .admin-btn-mobile:hover {
                    background: rgba(0,168,255,0.2);
                }

                @media (max-width: 768px) {
                    .navbar {
                        padding: 0 20px;
                    }
                    .md\:hidden { display: block; }
                    .hidden { display: none; }
                }
            `}</style>
        </nav>
    );
}
