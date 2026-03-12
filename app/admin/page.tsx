"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [services, setServices] = useState<any[]>([]);
    const [serviceForm, setServiceForm] = useState({ id: '', title: '', desc: '', icon: '🔧', tags: '', color: '#00a8ff', active: true });
    const [serviceFilter, setServiceFilter] = useState('all'); // all, active, draft
    const [selectedTag, setSelectedTag] = useState('all');
    const [userForm, setUserForm] = useState({ name: '', email: '', password: '', role: 'user' });
    const [saving, setSaving] = useState(false);
    const [generatingAI, setGeneratingAI] = useState(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.role !== 'admin') {
                router.push('/');
                return;
            }
            setUser(parsedUser);
        } else {
            router.push('/login');
            return;
        }

        fetchStats();
        fetchServices();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/admin/stats');
            const json = await res.json();
            if (res.ok) setData(json);
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    const fetchServices = async () => {
        try {
            const res = await fetch('/api/services');
            const json = await res.json();
            if (res.ok) setServices(json);
        } catch (error) { console.error(error); }
    };

    const handleSaveService = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...serviceForm,
                    tags: typeof serviceForm.tags === 'string' ? serviceForm.tags.split(',').map(t => t.trim()) : serviceForm.tags
                }),
            });
            if (res.ok) {
                alert('Servicio sincronizado con éxito');
                setServiceForm({ id: '', title: '', desc: '', icon: '🔧', tags: '', color: '#00a8ff', active: true });
                fetchServices();
            }
        } catch (error) { console.error(error); }
        finally { setSaving(false); }
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userForm),
            });
            if (res.ok) {
                alert('Usuario creado y credenciales enviadas por correo');
                setUserForm({ name: '', email: '', password: '', role: 'user' });
                fetchStats(); // Refresh user list
            } else {
                const err = await res.json();
                alert(err.error);
            }
        } catch (error) { console.error(error); }
        finally { setSaving(false); }
    };

    const handleUpdateRole = async (userId: string, newRole: string) => {
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, role: newRole }),
            });
            if (res.ok) fetchStats();
        } catch (error) { console.error(error); }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;
        try {
            const res = await fetch(`/api/admin/users?userId=${userId}`, { method: 'DELETE' });
            if (res.ok) fetchStats();
        } catch (error) { console.error(error); }
    };

    const handleDeleteService = async (serviceId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('¿Seguro que deseas eliminar este servicio definitivamente?')) return;
        try {
            const res = await fetch(`/api/services?id=${serviceId}`, { method: 'DELETE' });
            if (res.ok) {
                alert('Servicio eliminado');
                fetchServices();
                if (serviceForm.id === serviceId) setServiceForm({ id: '', title: '', desc: '', icon: '🔧', tags: '', color: '#00a8ff', active: true });
            }
        } catch (error) { console.error(error); }
    };

    const handleGenerateAIDesc = async () => {
        if (!serviceForm.title) return alert('Primero ingresa un título para el servicio');
        setGeneratingAI(true);
        try {
            const res = await fetch('/api/admin/generate-service-desc', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: serviceForm.title,
                    tags: serviceForm.tags,
                    currentDesc: serviceForm.desc
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setServiceForm({ ...serviceForm, desc: data.description });
            } else {
                alert('Error con la IA: ' + data.error);
            }
        } catch (error) { console.error(error); }
        finally { setGeneratingAI(false); }
    };

    const logout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="loader"></div>
                <p>Iniciando Sistema de Gestión Admin...</p>
                <style jsx>{`
                    .admin-loading { min-height: 100vh; background: #050810; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #00a8ff; font-family: 'Inter', sans-serif; gap: 20px; }
                    .loader { width: 50px; height: 50px; border: 3px solid rgba(0, 168, 255, 0.1); border-top-color: #00a8ff; border-radius: 50%; animation: spin 1s linear infinite; }
                    @keyframes spin { to { transform: rotate(360deg); } }
                `}</style>
            </div>
        );
    }

    return (
        <div className="admin-layout">
            <aside className="sidebar">
                <div className="brand">
                    <div className="logo-badge">⚡</div>
                    <span className="logo-text">TECH<span className="accent">REVIVE</span></span>
                </div>

                <nav className="nav-menu">
                    <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
                        <span className="nav-icon">📊</span> Panel General
                    </button>
                    <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
                        <span className="nav-icon">👥</span> Usuarios
                    </button>
                    <button className={activeTab === 'requests' ? 'active' : ''} onClick={() => setActiveTab('requests')}>
                        <span className="nav-icon">📩</span> Solicitudes
                    </button>
                    <button className={activeTab === 'services' ? 'active' : ''} onClick={() => setActiveTab('services')}>
                        <span className="nav-icon">🔧</span> Servicios
                    </button>
                    <button className={activeTab === 'metrics' ? 'active' : ''} onClick={() => setActiveTab('metrics')}>
                        <span className="nav-icon">📈</span> Métricas
                    </button>
                </nav>

                <div className="user-section">
                    <div className="admin-user">
                        <div className="avatar">{user?.name[0].toUpperCase()}</div>
                        <div className="u-info">
                            <span className="u-name">{user?.name}</span>
                            <span className="u-status">Admin Online</span>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="main-content">
                <header className="main-header">
                    <div className="h-left">
                        <h2>{
                            activeTab === 'overview' ? 'Vista General' :
                                activeTab === 'users' ? 'Gestión de Usuarios' :
                                    activeTab === 'requests' ? 'Solicitudes de Servicio' :
                                        activeTab === 'services' ? 'Configuración de Servicios' : 'Web Metrics'
                        }</h2>
                        <p className="breadcrumb">TechRevive Admin / {activeTab}</p>
                    </div>
                    <div className="h-right">
                        <button className="btn-logout" onClick={logout}>Cerrar Sesión</button>
                    </div>
                </header>

                <div className="content-container">
                    {activeTab === 'overview' && (
                        <div className="dashboard-view">
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <span className="label">Usuarios Totales</span>
                                    <div className="val-row">
                                        <span className="val">{data?.stats.totalUsers}</span>
                                        <span className="trend up">+12%</span>
                                    </div>
                                    <div className="progress-bg"><div className="progress-bar" style={{ width: '70%', background: '#00a8ff' }}></div></div>
                                </div>
                                <div className="stat-card">
                                    <span className="label">Solicitudes</span>
                                    <div className="val-row">
                                        <span className="val highlight">{data?.stats.totalRequests}</span>
                                        <span className="trend up">+5%</span>
                                    </div>
                                    <div className="progress-bg"><div className="progress-bar" style={{ width: '45%', background: '#facc15' }}></div></div>
                                </div>
                                <div className="stat-card">
                                    <span className="label">Visitas Únicas</span>
                                    <div className="val-row">
                                        <span className="val">{data?.stats.pageViews}</span>
                                        <span className="trend up">+24%</span>
                                    </div>
                                    <div className="progress-bg"><div className="progress-bar" style={{ width: '85%', background: '#00ff88' }}></div></div>
                                </div>
                                <div className="stat-card">
                                    <span className="label">Conversión</span>
                                    <div className="val-row">
                                        <span className="val text-gradient">{data?.stats.conversionRate}</span>
                                        <span className="trend down">-2%</span>
                                    </div>
                                    <div className="progress-bg"><div className="progress-bar" style={{ width: '30%', background: '#ff3366' }}></div></div>
                                </div>
                            </div>

                            <div className="activity-row">
                                <section className="card-section requests">
                                    <div className="section-head">
                                        <h3>Últimos Leads</h3>
                                        <button className="btn-view-all">Ver todos</button>
                                    </div>
                                    <div className="table-responsive">
                                        <table>
                                            <thead>
                                                <tr><th>Nombre</th><th>Servicio</th><th>Estado</th></tr>
                                            </thead>
                                            <tbody>
                                                {data?.recentRequests.map((req: any) => (
                                                    <tr key={req._id}>
                                                        <td>
                                                            <div className="name-col">
                                                                <span className="n-main">{req.name}</span>
                                                                <span className="n-sub">{req.email}</span>
                                                            </div>
                                                        </td>
                                                        <td>{req.service}</td>
                                                        <td><span className={`badge ${req.status}`}>{req.status}</span></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>

                                <section className="card-section users">
                                    <div className="section-head">
                                        <h3>Nuevos Registros</h3>
                                    </div>
                                    <div className="user-feed">
                                        {data?.recentUsers.map((u: any) => (
                                            <div key={u._id} className="u-feed-item">
                                                <div className="u-avatar">{u.name[0]}</div>
                                                <div className="u-details">
                                                    <span className="un">{u.name}</span>
                                                    <span className="ue">{u.email}</span>
                                                </div>
                                                <span className={`u-r ${u.role}`}>{u.role}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div className="users-management-container">
                            <div className="create-user-section">
                                <section className="full-view-card">
                                    <div className="view-header">
                                        <h3>Registrar Nuevo Usuario</h3>
                                    </div>
                                    <form onSubmit={handleCreateUser} className="fancy-form">
                                        <div className="input-group">
                                            <label>Nombre Completo</label>
                                            <input type="text" value={userForm.name} onChange={e => setUserForm({ ...userForm, name: e.target.value })} required />
                                        </div>
                                        <div className="input-group">
                                            <label>Email</label>
                                            <input type="email" value={userForm.email} onChange={e => setUserForm({ ...userForm, email: e.target.value })} required />
                                        </div>
                                        <div className="input-group">
                                            <label>Contraseña Temporal</label>
                                            <input type="password" value={userForm.password} onChange={e => setUserForm({ ...userForm, password: e.target.value })} required />
                                        </div>
                                        <div className="input-group">
                                            <label>Rol Inicial</label>
                                            <select value={userForm.role} onChange={e => setUserForm({ ...userForm, role: e.target.value })} style={{ background: '#03060c', color: '#fff', border: '1px solid #1e293b', padding: '14px', borderRadius: '12px' }}>
                                                <option value="user">Usuario Estándar</option>
                                                <option value="admin">Administrador</option>
                                            </select>
                                        </div>
                                        <button className="btn-primary" style={{ gridColumn: 'span 2' }}>Crear y Enviar Accesos</button>
                                    </form>
                                </section>
                            </div>

                            <div className="full-view-card" style={{ marginTop: '30px' }}>
                                <div className="view-header">
                                    <h3>Directorio de Usuarios Completo</h3>
                                </div>
                                <table>
                                    <thead>
                                        <tr><th>Nombre Completo</th><th>Correo Electrónico</th><th>Rol Actual</th><th>Acciones</th></tr>
                                    </thead>
                                    <tbody>
                                        {data?.recentUsers.map((u: any) => (
                                            <tr key={u._id}>
                                                <td>{u.name}</td>
                                                <td>{u.email}</td>
                                                <td>
                                                    <select
                                                        className={`role-select ${u.role}`}
                                                        value={u.role}
                                                        onChange={(e) => handleUpdateRole(u._id, e.target.value)}
                                                    >
                                                        <option value="user">User</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <button className="btn-delete" onClick={() => handleDeleteUser(u._id)}>🗑️</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'services' && (
                        <div className="services-admin-master">
                            <div className="editor-side">
                                <section className="config-form-card">
                                    <div className="section-header-compact">
                                        <h3>{serviceForm.id ? 'Editando Servicio' : 'Crear Nuevo Servicio'}</h3>
                                        <div className="status-toggle">
                                            <label className="switch">
                                                <input type="checkbox" checked={serviceForm.active} onChange={e => setServiceForm({ ...serviceForm, active: e.target.checked })} />
                                                <span className="slider"></span>
                                            </label>
                                            <span className="status-label">{serviceForm.active ? 'Activo' : 'Borrador'}</span>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSaveService} className="fancy-form-compact">
                                        <div className="form-row">
                                            <div className="input-group">
                                                <label>ID Identificador</label>
                                                <input type="text" placeholder="ej: cloud-hosting" value={serviceForm.id} onChange={e => setServiceForm({ ...serviceForm, id: e.target.value })} required />
                                            </div>
                                            <div className="input-group">
                                                <label>Color de Acento</label>
                                                <div className="color-picker-wrapper">
                                                    <input type="color" value={serviceForm.color} onChange={e => setServiceForm({ ...serviceForm, color: e.target.value })} />
                                                    <span className="color-hex">{serviceForm.color}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="input-group">
                                            <label>Título del Servicio</label>
                                            <input type="text" value={serviceForm.title} onChange={e => setServiceForm({ ...serviceForm, title: e.target.value })} required />
                                        </div>

                                        <div className="form-row">
                                            <div className="input-group">
                                                <label>Icono (Emoji)</label>
                                                <input type="text" value={serviceForm.icon} onChange={e => setServiceForm({ ...serviceForm, icon: e.target.value })} required />
                                            </div>
                                            <div className="input-group">
                                                <label>Etiquetas (Separadas por comas)</label>
                                                <input type="text" placeholder="AWS, SSL, 24/7" value={serviceForm.tags} onChange={e => setServiceForm({ ...serviceForm, tags: e.target.value })} />
                                            </div>
                                        </div>

                                        <div className="input-group">
                                            <div className="label-with-action">
                                                <label>Descripción del Servicio</label>
                                                <button
                                                    type="button"
                                                    className="btn-ai-magic"
                                                    onClick={handleGenerateAIDesc}
                                                    disabled={generatingAI}
                                                >
                                                    {generatingAI ? '🧠 Pensando...' : '✨ Generar con IA'}
                                                </button>
                                            </div>
                                            <textarea value={serviceForm.desc} onChange={e => setServiceForm({ ...serviceForm, desc: e.target.value })} required />
                                        </div>

                                        <div className="form-submit-area">
                                            <button type="submit" className="btn-save-modern" disabled={saving}>
                                                {saving ? 'Guardando...' : 'Sincronizar con Web'}
                                            </button>
                                            {serviceForm.id && (
                                                <button type="button" className="btn-cancel" onClick={() => setServiceForm({ id: '', title: '', desc: '', icon: '🔧', tags: '', color: '#00a8ff', active: true })}>Descartar</button>
                                            )}
                                        </div>
                                    </form>
                                </section>

                                <section className="live-preview-section">
                                    <span className="live-label">Vista Previa Interactiva</span>
                                    <div className="preview-card-wrapper">
                                        <div className="service-home-preview">
                                            <div className="accent-line" style={{ background: `linear-gradient(90deg, transparent, ${serviceForm.color}, transparent)` }}></div>
                                            <div className="icon-box" style={{ borderColor: `${serviceForm.color}33`, background: `${serviceForm.color}11` }}>{serviceForm.icon}</div>
                                            <h4>{serviceForm.title || 'Título del Servicio'}</h4>
                                            <p>{serviceForm.desc || 'Descripción profesional generada para captar clientes...'}</p>
                                            <div className="tags-box">
                                                {(typeof serviceForm.tags === 'string' ? serviceForm.tags.split(',') : (serviceForm.tags || [])).map((t, i) => t.trim() && (
                                                    <span key={i} style={{ color: serviceForm.color, border: `1px solid ${serviceForm.color}33`, background: `${serviceForm.color}0d` }}>{t}</span>
                                                ))}
                                            </div>
                                            <div className="arrow-preview" style={{ color: `${serviceForm.color}66` }}>→</div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div className="list-side">
                                <section className="current-services-list">
                                    <div className="sticky-list-header">
                                        <div className="list-head">
                                            <h3>Inventario</h3>
                                            <span className="count-badge">{services.length}</span>
                                        </div>

                                        <div className="filter-modes">
                                            <button className={serviceFilter === 'all' ? 'active' : ''} onClick={() => setServiceFilter('all')}>Todos</button>
                                            <button className={serviceFilter === 'active' ? 'active' : ''} onClick={() => setServiceFilter('active')}>Activos</button>
                                            <button className={serviceFilter === 'draft' ? 'active' : ''} onClick={() => setServiceFilter('draft')}>Borradores</button>
                                        </div>

                                        <div className="tag-cloud-mini">
                                            <span className={`tag-chip ${selectedTag === 'all' ? 'active' : ''}`} onClick={() => setSelectedTag('all')}>#all</span>
                                            {Array.from(new Set(services.flatMap(s => s.tags || []))).map(tag => (
                                                <span
                                                    key={tag}
                                                    className={`tag-chip ${selectedTag === tag ? 'active' : ''}`}
                                                    onClick={() => setSelectedTag(tag)}
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="s-manage-grid">
                                        {services
                                            .filter(s => {
                                                const matchesStatus = serviceFilter === 'all' ? true : (serviceFilter === 'active' ? s.active : !s.active);
                                                const matchesTag = selectedTag === 'all' ? true : s.tags?.includes(selectedTag);
                                                return matchesStatus && matchesTag;
                                            })
                                            .map(s => (
                                                <div key={s.id} className={`s-manage-card ${!s.active ? 'inactive' : ''}`} onClick={() => setServiceForm({ ...s, tags: Array.isArray(s.tags) ? s.tags.join(', ') : (s.tags || '') })}>
                                                    <div className="s-icon-box" style={{ color: s.color, background: s.color + '11' }}>{s.icon}</div>
                                                    <div className="s-content-box">
                                                        <span className="s-name">{s.title}</span>
                                                        <span className="s-id-text">{s.id}</span>
                                                    </div>
                                                    <div className="s-actions-box">
                                                        <span className={`status-dot ${s.active ? 'active' : 'draft'}`}></span>
                                                        <button className="btn-delete-small" onClick={(e) => handleDeleteService(s.id, e)}>🗑️</button>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    )}

                    {activeTab === 'metrics' && (
                        <div className="metrics-dashboard">
                            <div className="metrics-header">
                                <h3>Distribución de Tráfico y Conversión Semanal</h3>
                            </div>
                            <div className="metrics-content">
                                <div className="charts-grid-main">
                                    <div className="big-chart-container">
                                        <div className="chart-info">
                                            <div className="c-info-item"><span className="dot blue"></span> Visitas</div>
                                            <div className="c-info-item"><span className="dot green"></span> Conversiones</div>
                                        </div>
                                        <div className="bars-area">
                                            {[
                                                { day: 'Lun', h1: '40%', h2: '15%' },
                                                { day: 'Mar', h1: '60%', h2: '25%' },
                                                { day: 'Mie', h1: '80%', h2: '45%' },
                                                { day: 'Jue', h1: '70%', h2: '35%' },
                                                { day: 'Vie', h1: '95%', h2: '60%' },
                                                { day: 'Sab', h1: '45%', h2: '20%' },
                                                { day: 'Dom', h1: '30%', h2: '10%' },
                                            ].map(d => (
                                                <div key={d.day} className="bar-group">
                                                    <div className="bar-stack">
                                                        <div className="bar-val b1" style={{ height: d.h1 }}></div>
                                                        <div className="bar-val b2" style={{ height: d.h2 }}></div>
                                                    </div>
                                                    <span className="b-day">{d.day}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="metrics-side-stats">
                                        <div className="m-mini-stat">
                                            <span>Tiempo Promedio</span>
                                            <h4>4m 32s</h4>
                                        </div>
                                        <div className="m-mini-stat">
                                            <span>Drop-off Rate</span>
                                            <h4 style={{ color: '#ff3366' }}>12.4%</h4>
                                        </div>
                                        <div className="m-mini-stat">
                                            <span>Nuevo vs Recurrente</span>
                                            <h4>64% / 36%</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <style jsx>{`
                .admin-layout { display: grid; grid-template-columns: 280px 1fr; min-height: 100vh; background: #050810; color: #fff; font-family: 'Outfit', sans-serif; }
                
                /* Sidebar */
                .sidebar { background: #03060c; border-right: 1px solid rgba(0, 168, 255, 0.1); padding: 40px 0; display: flex; flex-direction: column; position: sticky; top: 0; height: 100vh; }
                .brand { padding: 0 32px; margin-bottom: 60px; display: flex; align-items: center; gap: 12px; }
                .logo-badge { width: 40px; height: 40px; background: linear-gradient(135deg, #00a8ff, #0055cc); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 0 15px rgba(0, 168, 255, 0.3); }
                .logo-text { font-family: 'Orbitron', sans-serif; font-size: 20px; font-weight: 900; letter-spacing: 1px; }
                .accent { color: #00a8ff; }

                .nav-menu { flex: 1; padding: 0 20px; display: flex; flex-direction: column; gap: 6px; }
                .nav-menu button { border: none; background: none; color: #64748b; padding: 14px 16px; text-align: left; cursor: pointer; border-radius: 12px; transition: 0.3s; font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 12px; }
                .nav-menu button:hover { background: rgba(0, 168, 255, 0.05); color: #fff; }
                .nav-menu button.active { background: linear-gradient(90deg, rgba(0, 168, 255, 0.15), transparent); color: #00a8ff; border-left: 3px solid #00a8ff; }
                .nav-icon { font-size: 18px; }

                .user-section { padding: 0 20px; margin-top: auto; }
                .admin-user { background: rgba(255,255,255,0.03); padding: 16px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; gap: 12px; }
                .avatar { width: 40px; height: 40px; border-radius: 12px; background: #1e293b; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #00a8ff; font-size: 18px; }
                .u-info { display: flex; flex-direction: column; }
                .u-name { font-size: 14px; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px; }
                .u-status { font-size: 11px; color: #00ff88; font-weight: 600; display: flex; align-items: center; gap: 4px; }
                .u-status::before { content: ''; width: 6px; height: 6px; background: #00ff88; border-radius: 50%; box-shadow: 0 0 5px #00ff88; }

                /* Main Content */
                .main-content { padding: 40px; }
                .main-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
                .h-left h2 { font-family: 'Orbitron', sans-serif; font-size: 28px; font-weight: 900; color: #fff; margin-bottom: 4px; }
                .breadcrumb { font-size: 13px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
                .btn-logout { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); color: #f87171; padding: 10px 20px; border-radius: 10px; font-weight: 700; cursor: pointer; transition: 0.3s; }
                .btn-logout:hover { background: #ef4444; color: #fff; border-color: #ef4444; transform: translateY(-2px); }

                /* Stats Grid */
                .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 40px; }
                .stat-card { background: #0b1120; border: 1px solid rgba(255,255,255,0.05); padding: 24px; border-radius: 20px; display: flex; flex-direction: column; gap: 12px; transition: 0.3s; }
                .stat-card:hover { transform: translateY(-5px); border-color: rgba(0, 168, 255, 0.3); background: #0f172a; }
                .stat-card .label { font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase; }
                .val-row { display: flex; justify-content: space-between; align-items: center; }
                .stat-card .val { font-family: 'Orbitron', sans-serif; font-size: 28px; font-weight: 900; color: #fff; }
                .stat-card .trend { font-size: 12px; font-weight: 800; padding: 4px 8px; border-radius: 6px; }
                .trend.up { background: rgba(0, 255, 136, 0.1); color: #00ff88; }
                .trend.down { background: rgba(255, 51, 102, 0.1); color: #ff3366; }
                .highlight { color: #facc15 !important; }
                .text-gradient { background: linear-gradient(90deg, #00a8ff, #00ff88); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .progress-bg { height: 4px; background: rgba(255,255,255,0.05); border-radius: 2px; overflow: hidden; }
                .progress-bar { height: 100%; border-radius: 2px; transition: width 1s ease-out; }

                /* Activity Row */
                .activity-row { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
                .card-section { background: #0b1120; border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 30px; }
                .section-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
                .section-head h3 { font-size: 18px; font-weight: 700; color: #fff; }
                .btn-view-all { background: none; border: 1px solid rgba(0, 168, 255, 0.2); color: #00a8ff; padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; }

                table { width: 100%; border-collapse: collapse; }
                th { text-align: left; padding: 12px; color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; border-bottom: 1px solid #1e293b; }
                td { padding: 16px 12px; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.02); }
                .name-col { display: flex; flex-direction: column; }
                .n-main { font-weight: 700; color: #f8fafc; }
                .n-sub { font-size: 12px; color: #64748b; }

                .badge { padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase; }
                .badge.pending { background: rgba(250, 204, 21, 0.1); color: #facc15; }
                .badge.completed { background: rgba(0, 255, 136, 0.1); color: #00ff88; }

                .user-feed { display: flex; flex-direction: column; gap: 16px; }
                .u-feed-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(255,255,255,0.02); border-radius: 12px; transition: 0.3s; }
                .u-avatar { width: 36px; height: 36px; background: #1e293b; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #00a8ff; }
                .u-details { flex: 1; display: flex; flex-direction: column; }
                .un { font-size: 14px; font-weight: 700; color: #fff; }
                .ue { font-size: 11px; color: #64748b; }
                .u-r { font-size: 10px; font-weight: 900; padding: 2px 6px; border-radius: 4px; background: rgba(0, 168, 255, 0.1); color: #00a8ff; text-transform: uppercase; }

                /* Role Select Customization */
                .role-select { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 4px 8px; border-radius: 6px; font-size: 12px; cursor: pointer; outline: none; }
                .role-select.admin { border-color: rgba(248, 113, 113, 0.4); color: #f87171; }
                .role-select.user { border-color: rgba(0, 168, 255, 0.4); color: #00a8ff; }
                
                .btn-delete { background: none; border: none; cursor: pointer; font-size: 16px; opacity: 0.6; transition: 0.3s; }
                .btn-delete:hover { opacity: 1; transform: scale(1.2); }

                /* Services Modern UI */
                .services-admin-master { display: grid; grid-template-columns: 1fr 400px; gap: 40px; }
                .editor-side { display: flex; flex-direction: column; gap: 30px; }
                .section-header-compact { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); }
                .status-toggle { display: flex; align-items: center; gap: 10px; }
                .status-label { font-size: 11px; font-weight: 800; text-transform: uppercase; color: #8899bb; }
                
                .fancy-form-compact { display: flex; flex-direction: column; gap: 16px; }
                .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                .color-picker-wrapper { display: flex; align-items: center; gap: 10px; background: #03060c; padding: 6px 12px; border-radius: 10px; border: 1px solid #1e293b; }
                .color-picker-wrapper input[type="color"] { width: 30px; height: 30px; border: none; background: none; cursor: pointer; }
                .color-hex { font-family: monospace; font-size: 12px; color: #8899bb; }
                
                .btn-save-modern { background: linear-gradient(135deg, #00a8ff, #0055cc); color: #fff; padding: 14px; border: none; border-radius: 12px; font-weight: 800; cursor: pointer; box-shadow: 0 4px 15px rgba(0, 168, 255, 0.3); }
                .btn-cancel { background: rgba(255,255,255,0.03); color: #fff; border: 1px solid rgba(255,255,255,0.1); padding: 14px; border-radius: 12px; font-weight: 700; cursor: pointer; }
                .form-submit-area { display: grid; grid-template-columns: 1fr auto; gap: 12px; padding-top: 10px; }

                /* Switch Styles */
                .switch { position: relative; display: inline-block; width: 34px; height: 20px; }
                .switch input { opacity: 0; width: 0; height: 0; }
                .slider { position: absolute; cursor: pointer; inset: 0; background-color: #1e293b; transition: .4s; border-radius: 34px; }
                .slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
                input:checked + .slider { background-color: #00ff88; }
                input:checked + .slider:before { transform: translateX(14px); }

                /* Preview Card - Enhanced */
                .preview-card-wrapper { background: radial-gradient(circle at center, #0a1120 0%, #03060c 100%); padding: 40px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.03); display: flex; justify-content: center; }
                .service-home-preview { width: 300px; background: rgba(13, 21, 38, 0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 20px; padding: 36px 28px; position: relative; overflow: hidden; display: flex; flex-direction: column; gap: 15px; }
                .accent-line { position: absolute; top: 0; left: 0; right: 0; height: 2px; }
                .icon-box { width: 56px; height: 56px; border-radius: 14px; border: 1px solid; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 10px; }
                .tags-box { display: flex; flex-wrap: wrap; gap: 8px; }
                .tags-box span { padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
                .arrow-preview { position: absolute; bottom: 24px; right: 24px; font-size: 20px; }

                /* List UI - Enhanced Filtering */
                .sticky-list-header { position: sticky; top: 0; background: #0b1120; z-index: 10; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 20px; }
                .filter-modes { display: flex; gap: 8px; margin: 15px 0; background: #03060c; padding: 4px; border-radius: 10px; }
                .filter-modes button { flex: 1; background: none; border: none; color: #64748b; font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 8px; cursor: pointer; border-radius: 8px; transition: 0.3s; }
                .filter-modes button.active { background: #1e293b; color: #00a8ff; }
                
                .tag-cloud-mini { display: flex; flex-wrap: wrap; gap: 6px; }
                .tag-chip { font-size: 10px; font-weight: 800; color: #64748b; background: rgba(255,255,255,0.03); padding: 2px 8px; border-radius: 20px; cursor: pointer; transition: 0.2s; }
                .tag-chip:hover { border-color: #00a8ff; color: #fff; }
                .tag-chip.active { background: #00a8ff; color: #fff; }

                .s-manage-grid { display: flex; flex-direction: column; gap: 12px; }
                .s-manage-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 15px; border-radius: 16px; display: flex; align-items: center; gap: 15px; transition: 0.3s; cursor: pointer; }
                .s-manage-card:hover { background: rgba(0, 168, 255, 0.05); transform: translateX(5px); border-color: rgba(0, 168, 255, 0.2); }
                .s-manage-card.active-item { border-color: #00a8ff; background: rgba(0, 168, 255, 0.08); }
                .s-manage-card.inactive { opacity: 0.5; filter: grayscale(1); }
                .s-content-box { flex: 1; display: flex; flex-direction: column; }
                .s-name { font-weight: 700; color: #fff; font-size: 14px; }
                .s-id-text { font-size: 11px; color: #64748b; font-family: monospace; }
                .s-actions-box { display: flex; align-items: center; gap: 12px; }
                .edit-hint { opacity: 0; transition: 0.2s; font-size: 12px; }
                .s-manage-card:hover .edit-hint { opacity: 1; }
                .btn-delete-small { background: none; border: none; cursor: pointer; font-size: 14px; opacity: 0; transition: 0.2s; padding: 4px; border-radius: 4px; }
                .s-manage-card:hover .btn-delete-small { opacity: 0.6; }
                .btn-delete-small:hover { opacity: 1 !important; background: rgba(239, 68, 68, 0.1); transform: scale(1.1); }
                .status-dot { width: 8px; height: 8px; border-radius: 50%; }
                .status-dot.active { background: #00ff88; box-shadow: 0 0 5px #00ff88; }
                .status-dot.draft { background: #64748b; }

                /* AI Button */
                .label-with-action { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
                .btn-ai-magic { background: rgba(0, 168, 255, 0.1); border: 1px solid rgba(0, 168, 255, 0.2); color: #00a8ff; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 800; cursor: pointer; transition: 0.3s; }
                .btn-ai-magic:hover:not(:disabled) { background: #00a8ff; color: #fff; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0, 168, 255, 0.3); }
                .btn-ai-magic:disabled { opacity: 0.5; cursor: wait; }

                /* Global UI Overrides */
                .full-view-card { background: #0b1120; padding: 40px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.05); }
                .view-header { margin-bottom: 30px; }
                .u-role-tag.admin { color: #f87171; border: 1px solid rgba(248, 113, 113, 0.3); padding: 4px 10px; border-radius: 20px; font-size: 11px; }

                /* Services Config */
                .services-config-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 32px; }
                .config-form-card, .current-services-list { background: #0b1120; border-radius: 24px; padding: 32px; border: 1px solid rgba(255,255,255,0.05); }
                .fancy-form { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 24px; }
                .input-group { display: flex; flex-direction: column; gap: 8px; }
                .input-group.full { grid-column: 1 / -1; }
                .input-group label { font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase; }
                .input-group input, .input-group textarea { background: #03060c; border: 1px solid #1e293b; border-radius: 12px; padding: 14px; color: #fff; font-size: 14px; outline: none; transition: 0.3s; }
                .input-group input:focus, .input-group textarea:focus { border-color: #00a8ff; box-shadow: 0 0 10px rgba(0, 168, 255, 0.15); }
                .input-group textarea { height: 120px; resize: none; }
                .btn-primary { grid-column: 1 / -1; background: linear-gradient(135deg, #00a8ff, #0055cc); border: none; padding: 16px; border-radius: 12px; color: #fff; font-weight: 800; cursor: pointer; font-size: 15px; box-shadow: 0 5px 15px rgba(0, 168, 255, 0.3); transition: 0.3s; }
                .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0, 168, 255, 0.4); }

                .s-grid { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 24px; }
                .s-mini-card { background: #03060c; padding: 16px; border-radius: 16px; display: flex; align-items: center; gap: 16px; border: 1px solid transparent; transition: 0.3s; }
                .s-mini-card:hover { border-color: rgba(0, 168, 255, 0.2); transform: scale(1.02); }
                .s-icon-box { width: 44px; height: 44px; background: rgba(255,255,255,0.02); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
                .s-main { flex: 1; display: flex; flex-direction: column; }
                .s-t { font-weight: 700; color: #fff; font-size: 15px; }
                .s-i { font-size: 11px; color: #64748b; font-weight: 600; }
                .s-edit-btn { background: none; border: none; font-size: 18px; cursor: pointer; transition: transform 0.2s; }
                .s-edit-btn:hover { transform: scale(1.2); }

                /* Metrics */
                .metrics-dashboard { background: #0b1120; border-radius: 24px; padding: 40px; border: 1px solid rgba(255,255,255,0.05); }
                .charts-grid-main { display: grid; grid-template-columns: 2fr 1fr; gap: 40px; margin-top: 32px; }
                .big-chart-container { background: #03060c; border-radius: 20px; padding: 30px; }
                .chart-info { display: flex; gap: 24px; margin-bottom: 30px; }
                .c-info-item { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: #64748b; }
                .dot { width: 8px; height: 8px; border-radius: 50%; }
                .dot.blue { background: #00a8ff; box-shadow: 0 0 10px #00a8ff; }
                .dot.green { background: #00ff88; box-shadow: 0 0 10px #00ff88; }
                .bars-area { height: 300px; display: flex; align-items: flex-end; justify-content: space-between; padding-top: 20px; }
                .bar-group { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 12px; }
                .bar-stack { width: 40px; height: 240px; background: rgba(255,255,255,0.02); border-radius: 10px; position: relative; display: flex; align-items: flex-end; justify-content: center; overflow: hidden; }
                .bar-val { width: 100%; position: absolute; bottom: 0; left: 0; border-radius: 10px 10px 0 0; transition: height 1.5s cubic-bezier(0.4, 0, 0.2, 1); }
                .bar-val.b1 { background: linear-gradient(to top, #0055cc, #00a8ff); opacity: 0.8; z-index: 1; }
                .bar-val.b2 { background: linear-gradient(to top, #00cc66, #00ff88); z-index: 2; width: 60%; }
                .b-day { font-size: 12px; font-weight: 800; color: #64748b; }

                .metrics-side-stats { display: flex; flex-direction: column; gap: 20px; }
                .m-mini-stat { background: #03060c; padding: 24px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.03); }
                .m-mini-stat span { font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 8px; display: block; }
                .m-mini-stat h4 { font-family: 'Orbitron', sans-serif; font-size: 22px; font-weight: 900; color: #fff; }

                @media (max-width: 1400px) {
                    .stats-grid { grid-template-columns: repeat(2, 1fr); }
                    .activity-row, .charts-grid-main, .services-config-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
}
