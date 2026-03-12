"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const UserIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

const KeyIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.778-7.778zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3L15.5 7.5z"></path></svg>
);

const EyeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

const EyeOffIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
);

const ArrowLeftIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);

export default function ForgotPasswordPage() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleRequestCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Algo salió mal");

            setMessage("Si el correo está registrado, recibirás un código de 6 dígitos.");
            setStep(2);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code, newPassword }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Código inválido o expirado");

            setMessage("¡Tu contraseña ha sido actualizada!");
            setTimeout(() => router.push("/login"), 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <main className="auth-page">
            <div className="content-side">
                <div className="bg-decor">
                    <div className="grid-overlay"></div>
                    <div className="glow-orb orb-1"></div>
                    <div className="glow-orb orb-2"></div>
                </div>

                <div className="content-inner">
                    <Link href="/login" className="logo-link">
                        <div className="logo-badge">🔑</div>
                        <span className="logo-text">TECHREVIVE</span>
                    </Link>

                    <div className="hero-text">
                        <h2 className="tagline">Seguridad de Cuenta</h2>
                        <h1 className="main-heading">
                            Recuperar <span className="text-gradient">Acceso</span>
                        </h1>
                        <p className="description">
                            No te preocupes, el equipo técnico de TechRevive tiene protocolos listos para que vuelvas a tu panel en minutos.
                        </p>
                    </div>

                    <div className="instruction-card">
                        <div className="step-num">!</div>
                        <div className="instruction-content">
                            <h4>Protocolo de Validación</h4>
                            <p>Enviaremos un código único de 6 dígitos a tu bandeja de entrada.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-side">
                <div className="form-container">
                    <div className="form-header">
                        <h2 className="form-title">
                            {step === 1 ? "Olvide mi clave" : "Establecer Nueva clave"}
                        </h2>
                        <p className="form-subtitle">
                            {step === 1
                                ? "Proporciona tu correo para recibir el código de validación."
                                : "Ingresa el código que enviamos a tu email."}
                        </p>
                    </div>

                    {error && (
                        <div className="error-box">
                            <span className="error-icon">⚠️</span>
                            <span className="error-text">{error}</span>
                        </div>
                    )}

                    {message && (
                        <div className="success-box">
                            <span className="success-icon">✅</span>
                            <span className="success-text">{message}</span>
                        </div>
                    )}

                    {step === 1 ? (
                        <form onSubmit={handleRequestCode} className="login-form">
                            <div className="input-field">
                                <label>CORREO ELECTRÓNICO</label>
                                <div className="input-wrapper">
                                    <span className="field-icon"><UserIcon /></span>
                                    <input
                                        type="email"
                                        placeholder="ejemplo@techrevive.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button className="submit-button" type="submit" disabled={loading}>
                                {loading ? <div className="loader"></div> : "ENVIAR CÓDIGO"}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetPassword} className="login-form">
                            <div className="input-field">
                                <label>CÓDIGO DE VERIFICACIÓN</label>
                                <div className="input-wrapper">
                                    <span className="field-icon"><KeyIcon /></span>
                                    <input
                                        type="text"
                                        placeholder="000000"
                                        maxLength={6}
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        required
                                        style={{ letterSpacing: '4px', textAlign: 'center' }}
                                    />
                                </div>
                            </div>

                            <div className="input-field">
                                <label>NUEVA CONTRASEÑA</label>
                                <div className="input-wrapper">
                                    <span className="field-icon"><LockIcon /></span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
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
                                {loading ? <div className="loader"></div> : "RESTABLECER CONTRASEÑA"}
                            </button>

                            <button
                                type="button"
                                className="back-step-btn"
                                onClick={() => setStep(1)}
                            >
                                Re-enviar código
                            </button>
                        </form>
                    )}

                    <div className="form-footer">
                        <Link href="/login" className="switch-link">
                            VOLVER AL INICIO DE SESIÓN
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

                .content-side {
                    position: relative;
                    padding: 60px;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                    background: #03060c;
                    border-right: 1px solid rgba(255, 255, 255, 0.05);
                }

                .bg-decor { position: absolute; inset: 0; z-index: 0; }
                .grid-overlay {
                    position: absolute; inset: 0;
                    background-image: linear-gradient(rgba(0, 168, 255, 0.05) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(0, 168, 255, 0.05) 1px, transparent 1px);
                    background-size: 40px 40px;
                }

                .glow-orb { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.2; }
                .orb-1 { width: 400px; height: 400px; background: #00a8ff; top: -100px; left: -100px; }
                .orb-2 { width: 300px; height: 300px; background: #7000ff; bottom: -50px; right: 10%; }

                .content-inner { position: relative; z-index: 1; width: 100%; max-width: 600px; }
                .logo-link { display: flex; align-items: center; gap: 12px; text-decoration: none; margin-bottom: 80px; }
                .logo-badge { width: 44px; height: 44px; background: linear-gradient(135deg, #00a8ff, #0055cc); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
                .logo-text { font-family: 'Orbitron', sans-serif; font-size: 20px; font-weight: 800; letter-spacing: 2px; color: #fff; }

                .main-heading { font-family: 'Orbitron', sans-serif; font-size: 42px; font-weight: 900; line-height: 1.1; margin-bottom: 24px; }
                .text-gradient { background: linear-gradient(rgba(0, 168, 255, 1), rgba(0, 255, 136, 1)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .description { font-size: 18px; color: #8899bb; line-height: 1.6; margin-bottom: 40px; }

                .instruction-card { display: flex; gap: 20px; background: rgba(0, 168, 255, 0.05); border: 1px solid rgba(0, 168, 255, 0.15); padding: 24px; border-radius: 20px; }
                .step-num { width: 40px; height: 40px; border-radius: 12px; background: #00a8ff; display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0; }
                .instruction-content h4 { color: #00a8ff; margin-bottom: 4px; }
                .instruction-content p { font-size: 13px; color: #8899bb; }

                .form-side { display: flex; align-items: center; justify-content: center; padding: 40px; background: #050810; }
                .form-container { width: 100%; max-width: 400px; animation: fadeIn 0.8s ease-out; }
                .form-header { margin-bottom: 40px; }
                .form-title { font-family: 'Orbitron', sans-serif; font-size: 28px; font-weight: 800; color: #fff; margin-bottom: 8px; }
                .form-subtitle { color: #8899bb; font-size: 14px; }

                .login-form { display: flex; flex-direction: column; gap: 24px; }
                .input-field { display: flex; flex-direction: column; gap: 10px; }
                label { font-size: 11px; font-weight: 700; color: #4a5568; letter-spacing: 1.5px; }
                .input-wrapper { position: relative; }
                .field-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #4a5568; }
                input { width: 100%; padding: 14px 14px 14px 48px; background: rgba(255, 255, 255, 0.02); border: 1.5px solid rgba(255, 255, 255, 0.1); border-radius: 12px; color: #fff; font-size: 15px; outline: none; }
                input:focus { border-color: #00a8ff; box-shadow: 0 0 15px rgba(0, 168, 255, 0.1); }

                .toggle-password { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #4a5568; cursor: pointer; }

                .submit-button { height: 54px; background: linear-gradient(135deg, #00a8ff, #0055cc); color: #fff; border: none; border-radius: 12px; font-weight: 700; font-size: 14px; cursor: pointer; box-shadow: 0 4px 20px rgba(0, 168, 255, 0.3); }
                .submit-button:disabled { opacity: 0.5; }

                .back-step-btn { background: none; border: none; color: #8899bb; font-size: 12px; margin-top: 10px; cursor: pointer; text-decoration: underline; }

                .loader { width: 20px; height: 20px; border: 2px solid rgba(255,255,255,.3); border-top-color: #fff; border-radius: 50%; animation: spin .8s linear infinite; margin: auto; }
                
                .error-box, .success-box { padding: 12px 16px; border-radius: 10px; display: flex; align-items: center; gap: 10px; margin-bottom: 24px; font-size: 13px; font-weight: 500; }
                .error-box { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); color: #f87171; }
                .success-box { background: rgba(0, 255, 136, 0.1); border: 1px solid rgba(0, 255, 136, 0.2); color: #00ff88; }

                .form-footer { margin-top: 40px; text-align: center; }
                .switch-link { color: #8899bb; font-size: 12px; text-decoration: none; border: 1px solid rgba(255, 255, 255, 0.1); padding: 8px 16px; border-radius: 30px; }

                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                @media (max-width: 1024px) {
                    .auth-page { grid-template-columns: 1fr; }
                    .content-side { display: none; }
                }
            `}</style>
        </main>
    );
}
