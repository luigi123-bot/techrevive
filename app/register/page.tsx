"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserPlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="17" y1="11" x2="23" y2="11"></line></svg>
);

const UserIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

const MailIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const LockIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const EyeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

const EyeOffIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
);

const ShieldCheckIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
);

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Error al crear la cuenta");
            }

            router.push("/login?registered=true");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <main className="auth-page">
            {/* Left Content Column */}
            <div className="content-side">
                <div className="bg-decor">
                    <div className="grid-overlay"></div>
                    <div className="glow-orb orb-1"></div>
                    <div className="glow-orb orb-2"></div>
                </div>

                <div className="content-inner">
                    <Link href="/" className="logo-link">
                        <div className="logo-badge">🛡️</div>
                        <span className="logo-text">TECHREVIVE</span>
                    </Link>

                    <div className="hero-text">
                        <h2 className="tagline">Acceso de Técnicos</h2>
                        <h1 className="main-heading">
                            Únete a la <span className="text-gradient">Red Profesional</span>
                        </h1>
                        <p className="description">
                            Regístrate para gestionar reparaciones, inventarios y clientes con nuestra suite avanzada de herramientas tecnológicas.
                        </p>
                    </div>

                    <div className="trust-card">
                        <div className="trust-icon"><ShieldCheckIcon /></div>
                        <div className="trust-content">
                            <h4>Protocolo de Seguridad SSL</h4>
                            <p>Tus datos están pretegidos con encriptación de grado militar AES-256.</p>
                        </div>
                    </div>

                    <ul className="benefits-list">
                        <li>Panel de administración intuitivo</li>
                        <li>Base de datos técnica global</li>
                        <li>Gestión de garantías integrada</li>
                    </ul>

                    <div className="footer-copyright">
                        © 2025 TechRevive Systems · Security Protocol Active
                    </div>
                </div>
            </div>

            {/* Right Form Column */}
            <div className="form-side">
                <div className="form-container">
                    <div className="form-header">
                        <h2 className="form-title">Crear Cuenta</h2>
                        <p className="form-subtitle">Completa tus datos para activar tu perfil profesional.</p>
                    </div>

                    {error && (
                        <div className="error-box">
                            <span className="error-icon">⚠️</span>
                            <span className="error-text">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="register-form">
                        <div className="input-field">
                            <label>NOMBRE COMPLETO</label>
                            <div className="input-wrapper">
                                <span className="field-icon"><UserIcon /></span>
                                <input
                                    type="text"
                                    placeholder="Luis Alberto Gotopo"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-field">
                            <label>CORREO ELECTRÓNICO</label>
                            <div className="input-wrapper">
                                <span className="field-icon"><MailIcon /></span>
                                <input
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-field">
                            <label>CONTRASEÑA</label>
                            <div className="input-wrapper">
                                <span className="field-icon"><LockIcon /></span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>
                        </div>

                        <button className="submit-button" type="submit" disabled={loading}>
                            {loading ? (
                                <div className="loader"></div>
                            ) : (
                                <>
                                    <span>ACTIVAR MI CUENTA</span>
                                    <UserPlusIcon />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="form-footer">
                        <p>¿Ya tienes una cuenta registrada?</p>
                        <Link href="/login" className="switch-link">
                            INICIAR SESIÓN AQUÍ
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .auth-page {
                    min-height: 100vh;
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    background: #050810;
                    color: #fff;
                    font-family: 'Inter', sans-serif;
                }

                /* --- Left Side --- */
                .content-side {
                    position: relative;
                    padding: 60px;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                    background: #03060c;
                    border-right: 1px solid rgba(255, 255, 255, 0.05);
                }

                .bg-decor {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                }

                .grid-overlay {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(0, 255, 136, 0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 255, 136, 0.05) 1px, transparent 1px);
                    background-size: 40px 40px;
                    mask-image: radial-gradient(circle at center, black, transparent 80%);
                }

                .glow-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(120px);
                    opacity: 0.2;
                }

                .orb-1 {
                    width: 400px;
                    height: 400px;
                    background: #00ff88;
                    top: -100px;
                    left: -100px;
                }

                .orb-2 {
                    width: 300px;
                    height: 300px;
                    background: #00a8ff;
                    bottom: -50px;
                    right: 10%;
                }

                .content-inner {
                    position: relative;
                    z-index: 1;
                    width: 100%;
                    max-width: 600px;
                }

                .logo-link {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    text-decoration: none;
                    margin-bottom: 80px;
                }

                .logo-badge {
                    width: 44px;
                    height: 44px;
                    background: linear-gradient(135deg, #00ff88, #0088ff);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    box-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
                }

                .logo-text {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 20px;
                    font-weight: 800;
                    letter-spacing: 2px;
                    color: #fff;
                }

                .hero-text {
                    margin-bottom: 40px;
                }

                .tagline {
                    font-size: 14px;
                    font-weight: 800;
                    color: #00ff88;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    margin-bottom: 12px;
                }

                .main-heading {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 48px;
                    font-weight: 900;
                    line-height: 1.1;
                    margin-bottom: 24px;
                }

                .text-gradient {
                    background: linear-gradient(rgba(0, 255, 136, 1), rgba(0, 168, 255, 1));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .description {
                    font-size: 18px;
                    color: #8899bb;
                    line-height: 1.6;
                }

                .trust-card {
                    display: flex;
                    gap: 20px;
                    background: rgba(0, 255, 136, 0.05);
                    border: 1px solid rgba(0, 255, 136, 0.15);
                    padding: 24px;
                    border-radius: 20px;
                    margin-bottom: 40px;
                }

                .trust-icon {
                    flex-shrink: 0;
                }

                .trust-content h4 {
                    font-size: 16px;
                    font-weight: 700;
                    color: #00ff88;
                    margin-bottom: 4px;
                }

                .trust-content p {
                    font-size: 13px;
                    color: #8899bb;
                    line-height: 1.5;
                }

                .benefits-list {
                    list-style: none;
                    margin-bottom: 60px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .benefits-list li {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 14px;
                    color: #f0f4ff;
                }

                .benefits-list li::before {
                    content: '→';
                    color: #00ff88;
                    font-weight: 800;
                }

                .footer-copyright {
                    font-size: 12px;
                    color: #4a5568;
                    letter-spacing: 1px;
                }

                /* --- Right Side --- */
                .form-side {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px;
                    background: #050810;
                }

                .form-container {
                    width: 100%;
                    max-width: 400px;
                    animation: fadeIn 0.8s ease-out;
                }

                .form-header {
                    margin-bottom: 40px;
                }

                .form-title {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 32px;
                    font-weight: 800;
                    color: #fff;
                    margin-bottom: 8px;
                }

                .form-subtitle {
                    color: #8899bb;
                    font-size: 15px;
                }

                .register-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .input-field {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                label {
                    font-size: 11px;
                    font-weight: 700;
                    color: #4a5568;
                    letter-spacing: 1.5px;
                }

                .input-wrapper {
                    position: relative;
                }

                .field-icon {
                    position: absolute;
                    left: 16px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #4a5568;
                }

                input {
                    width: 100%;
                    padding: 14px 14px 14px 48px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1.5px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    color: #fff;
                    font-size: 15px;
                    transition: all 0.3s;
                    outline: none;
                }

                input:focus {
                    background: rgba(0, 255, 136, 0.05);
                    border-color: #00ff88;
                    box-shadow: 0 0 15px rgba(0, 255, 136, 0.1);
                }

                .toggle-password {
                    position: absolute;
                    right: 16px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    color: #4a5568;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0;
                    transition: color 0.3s;
                }

                .toggle-password:hover {
                    color: #00ff88;
                }

                .submit-button {
                    margin-top: 10px;
                    height: 54px;
                    background: linear-gradient(135deg, #00ff88, #00a8ff);
                    color: #050810;
                    border: none;
                    border-radius: 12px;
                    font-weight: 800;
                    font-size: 14px;
                    letter-spacing: 1px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 4px 20px rgba(0, 255, 136, 0.3);
                }

                .submit-button:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 30px rgba(0, 255, 136, 0.5);
                    filter: brightness(1.1);
                }

                .submit-button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .loader {
                    width: 20px;
                    height: 20px;
                    border: 2px solid rgba(0, 0, 0, 0.1);
                    border-top-color: #050810;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }

                .error-box {
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.2);
                    padding: 12px 16px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 24px;
                }

                .error-text {
                    font-size: 13px;
                    color: #f87171;
                    font-weight: 500;
                }

                .form-footer {
                    margin-top: 40px;
                    text-align: center;
                }

                .form-footer p {
                    font-size: 14px;
                    color: #4a5568;
                    margin-bottom: 12px;
                }

                .switch-link {
                    font-size: 12px;
                    font-weight: 800;
                    color: #00a8ff;
                    text-decoration: none;
                    letter-spacing: 1px;
                    border: 1px solid rgba(0, 168, 255, 0.2);
                    padding: 8px 16px;
                    border-radius: 30px;
                    display: inline-block;
                    transition: all 0.3s;
                }

                .switch-link:hover {
                    background: rgba(0, 168, 255, 0.05);
                    border-color: #00a8ff;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* Mobile View */
                @media (max-width: 1024px) {
                    .auth-page {
                        grid-template-columns: 1fr;
                    }
                    .content-side {
                        display: none;
                    }
                    .form-side {
                        padding: 60px 20px;
                    }
                }
            `}</style>
        </main>
    );
}
