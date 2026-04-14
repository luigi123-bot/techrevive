"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './admin-dashboard.css';
import { InventoryManagement } from '@/components/admin/InventoryManagement';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, Calendar, MessageSquare, Laptop, CheckCircle2, AlertCircle, Archive, History } from "lucide-react";

export default function AdminDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedRequest, setSelectedRequest] = useState<any>(null);
    const [showArchived, setShowArchived] = useState(false);
    const [services, setServices] = useState<any[]>([]);
    const [serviceForm, setServiceForm] = useState({ id: '', title: '', desc: '', icon: '🔧', tags: '', color: '#00a8ff', active: true });
    const [serviceFilter, setServiceFilter] = useState('all'); // all, active, draft
    const [selectedTag, setSelectedTag] = useState('all');
    const [userForm, setUserForm] = useState({ name: '', email: '', password: '', role: 'user' });
    const [saving, setSaving] = useState(false);
    const [generatingAI, setGeneratingAI] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [requests, setRequests] = useState<any[]>([]);
    const [dragOverCol, setDragOverCol] = useState<string | null>(null);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showManualForm, setShowManualForm] = useState(false);
    const [manualRequestForm, setManualRequestForm] = useState({ name: '', email: '', phone: '', service: 'Reparación de PC o Laptop', message: '' });
    const [inventory, setInventory] = useState<any[]>([]);
    const [inventoryForm, setInventoryForm] = useState({ name: '', type: 'product', brand: '', model: '', serialNumber: '', status: 'available', serviceRequestId: '', ownerName: '', notes: '' });
    const [invLoading, setInvLoading] = useState(false);
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
            // Iniciar la carga de datos si es admin
            initDashboard();
        } else {
            router.push('/login');
        }
    }, []);

    const initDashboard = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/init-data');
            const json = await res.json();
            
            if (res.ok) {
                // Sincronizar estados locales con la carga masiva
                setData({
                    stats: json.stats,
                    recentRequests: json.requests.slice(0, 5),
                    recentUsers: json.users.slice(0, 5)
                });
                setServices(json.services);
                setRequests(json.requests);
            }
        } catch (error) {
            console.error('Error initializing dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    // Funciones de actualización individuales (mantienen el panel activo sin recargar todo)
    const refreshData = () => initDashboard();

    const fetchStats = async () => {
        // Redirigir a init para mantener sincronizado, o llamar al stats individual si se prefiere
        const res = await fetch('/api/admin/stats');
        const json = await res.json();
        if (res.ok) setData(json);
    };

    const fetchServices = async () => {
        const res = await fetch('/api/services');
        const json = await res.json();
        if (res.ok) setServices(json);
    };

    const fetchRequests = async () => {
        const res = await fetch('/api/requests');
        const json = await res.json();
        if (res.ok) setRequests(json);
    };

    const fetchInventory = async () => {
        setInvLoading(true);
        try {
            const res = await fetch('/api/inventory');
            const json = await res.json();
            if (res.ok) setInventory(json);
        } catch (error) { console.error(error); }
        finally { setInvLoading(false); }
    };

    useEffect(() => {
        if (activeTab === 'inventory') fetchInventory();
    }, [activeTab]);

    const handleUpdateRequestStatus = async (id: string, newStatus: string) => {
        // Optimistic update
        setRequests(prev => prev.map(r => r._id === id ? { ...r, status: newStatus } : r));
        try {
            const res = await fetch('/api/requests', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus }),
            });
            if (!res.ok) fetchRequests(); // rollback on error
        } catch (error) {
            fetchRequests(); // rollback
            console.error(error);
        }
    };

    const handleDeleteRequest = async (id: string) => {
        if (!confirm('¿Eliminar esta solicitud definitivamente?')) return;
        setRequests(prev => prev.filter(r => r._id !== id));
        try {
            await fetch(`/api/requests?id=${id}`, { method: 'DELETE' });
        } catch (error) { console.error(error); }
    };

    const handleCreateManualRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...manualRequestForm, source: 'admin_manual' }),
            });
            if (res.ok) {
                alert('Solicitud creada y guardada en base de datos');
                setManualRequestForm({ name: '', email: '', phone: '', service: 'Reparación de PC o Laptop', message: '' });
                setShowManualForm(false);
                fetchRequests();
            }
        } catch (error) { console.error(error); }
        finally { setSaving(false); }
    };

    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData('requestId', id);
        setDraggingId(id);
    };

    const handleDragEnd = () => {
        setDraggingId(null);
        setDragOverCol(null);
    };

    const handleDrop = (e: React.DragEvent, status: string) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('requestId');
        if (id) handleUpdateRequestStatus(id, status);
        setDragOverCol(null);
        setDraggingId(null);
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

    const handleSaveInventory = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/inventory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inventoryForm),
            });
            if (res.ok) {
                alert('Registro de inventario guardado');
                setInventoryForm({ name: '', type: 'equipment', brand: '', model: '', serialNumber: '', status: 'repairing', serviceRequestId: '', ownerName: '', notes: '' });
                fetchInventory();
            }
        } catch (error) { console.error(error); }
        finally { setSaving(false); }
    };

    const handleDeleteInventory = async (id: string) => {
        if (!confirm('¿Eliminar este registro del inventario?')) return;
        try {
            const res = await fetch(`/api/inventory?id=${id}`, { method: 'DELETE' });
            if (res.ok) fetchInventory();
        } catch (error) { console.error(error); }
    };

    const handleUpdateInventoryStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch('/api/inventory', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus }),
            });
            if (res.ok) fetchInventory();
        } catch (error) { console.error(error); }
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
            </div>
        );
    }

    return (
        <div className={`admin-layout ${isMobileMenuOpen ? 'sidebar-open' : ''}`}>
            {isMobileMenuOpen && <div className="sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}
            
            <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="brand">
                    <div className="logo-badge">⚡</div>
                    <span className="logo-text">TECH<span className="accent">REVIVE</span></span>
                    <button className="close-sidebar-btn" onClick={() => setIsMobileMenuOpen(false)}>✕</button>
                </div>

                <nav className="nav-menu">
                    <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }}>
                        <span className="nav-icon">📊</span> Panel General
                    </button>
                    <button className={activeTab === 'users' ? 'active' : ''} onClick={() => { setActiveTab('users'); setIsMobileMenuOpen(false); }}>
                        <span className="nav-icon">👥</span> Usuarios
                    </button>
                    <button className={activeTab === 'requests' ? 'active' : ''} onClick={() => { setActiveTab('requests'); setIsMobileMenuOpen(false); }}>
                        <span className="nav-icon">📩</span> Solicitudes
                    </button>
                    <button className={activeTab === 'services' ? 'active' : ''} onClick={() => { setActiveTab('services'); setIsMobileMenuOpen(false); }}>
                        <span className="nav-icon">🔧</span> Servicios
                    </button>
                    <button className={activeTab === 'inventory' ? 'active' : ''} onClick={() => { setActiveTab('inventory'); setIsMobileMenuOpen(false); }}>
                        <span className="nav-icon">📦</span> Inventario (Stock)
                    </button>
                    <button className={activeTab === 'metrics' ? 'active' : ''} onClick={() => { setActiveTab('metrics'); setIsMobileMenuOpen(false); }}>
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
                        <button 
                            className="mobile-menu-btn" 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle Sidebar"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <div>
                            <h2>{
                                activeTab === 'overview' ? 'Vista General' :
                                    activeTab === 'users' ? 'Gestión de Usuarios' :
                                        activeTab === 'requests' ? 'Solicitudes y Equipos Cliente' :
                                            activeTab === 'services' ? 'Configuración de Servicios' : 
                                                activeTab === 'inventory' ? 'Inventario de Productos (Stock)' : 'Web Metrics'
                            }</h2>
                            <p className="breadcrumb">TechRevive Admin / {activeTab}</p>
                        </div>
                    </div>
                    <div className="h-right">
                        <a href="/" target="_blank" rel="noopener noreferrer" className="btn-view-site">🌐 <span className="hide-mobile">Ver Sitio Web</span></a>
                        <button className="btn-logout" onClick={logout} title="Cerrar Sesión">🚪 <span className="hide-mobile">Salir</span></button>
                    </div>
                </header>

                <div className="content-container">
                    {activeTab === 'overview' && (
                        <div className="dashboard-view w-full overflow-hidden">
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <span className="label">Usuarios</span>
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
                                    <span className="label">Visitas</span>
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
                                    
                                    {/* Mobile Cards for Leads */}
                                    <div className="lg:hidden space-y-4">
                                        {data?.recentRequests.map((req: any) => (
                                            <div key={req._id} className="p-4 bg-[#03060c] border border-white/5 rounded-2xl space-y-2">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-bold text-white text-sm">{req.name}</p>
                                                        <p className="text-[11px] text-slate-500">{req.email}</p>
                                                    </div>
                                                    <span className={`badge ${req.status}`}>{req.status}</span>
                                                </div>
                                                <div className="pt-2 border-t border-white/[0.03]">
                                                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Servicio Solicitado</p>
                                                    <p className="text-xs text-slate-300 mt-1">{req.service}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Desktop Table for Leads */}
                                    <div className="hidden lg:block table-responsive">
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
                                                    <span className="ue truncate max-w-[120px]">{u.email}</span>
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
                        <div className="users-management-container space-y-8">
                            <div className="create-user-section">
                                <section className="full-view-card p-6 sm:p-8 bg-[#0b1120] border border-white/5 rounded-3xl">
                                    <div className="view-header mb-6">
                                        <h3 className="text-xl font-bold text-white">Registrar Nuevo Usuario</h3>
                                        <p className="text-sm text-slate-500">Añade nuevos miembros al equipo administrativo.</p>
                                    </div>
                                    <form onSubmit={handleCreateUser} className="fancy-form">
                                        <div className="input-group">
                                            <label>Nombre Completo</label>
                                            <input type="text" placeholder="Juan Ocoro" value={userForm.name} onChange={e => setUserForm({ ...userForm, name: e.target.value })} required />
                                        </div>
                                        <div className="input-group">
                                            <label>Email</label>
                                            <input type="email" placeholder="email@ejemplo.com" value={userForm.email} onChange={e => setUserForm({ ...userForm, email: e.target.value })} required />
                                        </div>
                                        <div className="input-group">
                                            <label>Contraseña</label>
                                            <input type="password" placeholder="••••••••" value={userForm.password} onChange={e => setUserForm({ ...userForm, password: e.target.value })} required />
                                        </div>
                                        <div className="input-group">
                                            <label>Rol Inicial</label>
                                            <select value={userForm.role} onChange={e => setUserForm({ ...userForm, role: e.target.value })}>
                                                <option value="user">Usuario Estándar</option>
                                                <option value="admin">Administrador</option>
                                            </select>
                                        </div>
                                        <button className="btn-primary col-span-1 sm:col-span-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20">
                                            Crear y Enviar Accesos
                                        </button>
                                    </form>
                                </section>
                            </div>

                            <div className="full-view-card p-6 sm:p-8 bg-[#0b1120] border border-white/5 rounded-3xl">
                                <div className="view-header mb-6">
                                    <h3 className="text-xl font-bold text-white">Directorio de Usuarios</h3>
                                    <p className="text-sm text-slate-500">Gestiona los permisos y accesos de los usuarios registrados.</p>
                                </div>
                                
                                {/* Mobile view: Cards for Users */}
                                <div className="lg:hidden space-y-4">
                                    {data?.recentUsers.map((u: any) => (
                                        <div key={u._id} className="p-4 bg-[#03060c] border border-white/5 rounded-2xl flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center font-bold text-blue-400 shrink-0">
                                                {u.name[0].toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-white text-sm truncate">{u.name}</p>
                                                <p className="text-[10px] text-slate-500 truncate">{u.email}</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-2 shrink-0">
                                                <select
                                                    className={`role-select ${u.role}`}
                                                    style={{ fontSize: '10px', padding: '4px 8px' }}
                                                    value={u.role}
                                                    onChange={(e) => handleUpdateRole(u._id, e.target.value)}
                                                >
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                                <button className="text-xs text-slate-500 hover:text-red-400 p-1" onClick={() => handleDeleteUser(u._id)}>🗑️</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Desktop view: Table for Users */}
                                <div className="hidden lg:block table-responsive">
                                    <table className="w-full">
                                        <thead>
                                            <tr><th>Nombre Completo</th><th>Correo Electrónico</th><th>Rol Actual</th><th>Acciones</th></tr>
                                        </thead>
                                        <tbody>
                                            {data?.recentUsers.map((u: any) => (
                                                <tr key={u._id}>
                                                    <td className="font-bold text-slate-200">{u.name}</td>
                                                    <td className="text-slate-400">{u.email}</td>
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
                                                        <button className="btn-delete hover:scale-125 transition-transform" onClick={() => handleDeleteUser(u._id)}>🗑️</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'requests' && (() => {
                        const COLUMNS = showArchived 
                            ? [{ key: 'archived', label: 'Archivados', emoji: '📁', color: '#94a3b8' }]
                            : [
                                { key: 'pending',     label: 'Recibido',   emoji: '📥', color: '#facc15' },
                                { key: 'contacted',   label: 'Contactado', emoji: '📞', color: '#00a8ff' },
                                { key: 'in_progress', label: 'En Proceso', emoji: '⚙️',  color: '#a855f7' },
                                { key: 'completed',   label: 'Completado', emoji: '✅', color: '#00ff88' },
                            ];
                        return (
                            <div className="kanban-board">
                                <div className="kanban-topbar">
                                    <div className="k-left flex items-center gap-4">
                                        <span className="kanban-count">{requests.filter(r => showArchived ? r.status === 'archived' : r.status !== 'archived').length} solicitudes</span>
                                        <button className="btn-refresh-kan" onClick={fetchRequests}>↻ Actualizar</button>
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            onClick={() => setShowArchived(!showArchived)}
                                            className={`border-white/10 ${showArchived ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                                        >
                                            {showArchived ? <History className="w-4 h-4 mr-2" /> : <Archive className="w-4 h-4 mr-2" />}
                                            {showArchived ? 'Ver Activos' : 'Ver Archivados'}
                                        </Button>
                                    </div>
                                    <button className="btn-new-request" onClick={() => setShowManualForm(!showManualForm)}>
                                        {showManualForm ? '✕ Cancelar' : '➕ Nueva Solicitud'}
                                    </button>
                                </div>

                                {showManualForm && (
                                    <div className="manual-request-form-overlay">
                                        <section className="full-view-card manual-card">
                                            <div className="view-header">
                                                <h3>Nueva Solicitud de Servicio / Ingreso de Equipo</h3>
                                                <p>Registra ingresos de equipos para reparación o solicitudes de clientes aquí.</p>
                                            </div>
                                            <form onSubmit={handleCreateManualRequest} className="fancy-form">
                                                <div className="input-group">
                                                    <label>Nombre del Cliente</label>
                                                    <input type="text" placeholder="ej: Luis Gotopo" value={manualRequestForm.name} onChange={e => setManualRequestForm({ ...manualRequestForm, name: e.target.value })} required />
                                                </div>
                                                <div className="input-group">
                                                    <label>Correo Electrónico</label>
                                                    <input type="email" placeholder="cliente@email.com" value={manualRequestForm.email} onChange={e => setManualRequestForm({ ...manualRequestForm, email: e.target.value })} required />
                                                </div>
                                                <div className="input-group">
                                                    <label>Teléfono de Contacto</label>
                                                    <input type="tel" placeholder="+57..." value={manualRequestForm.phone} onChange={e => setManualRequestForm({ ...manualRequestForm, phone: e.target.value })} required />
                                                </div>
                                                <div className="input-group">
                                                    <label>Servicio Requerido</label>
                                                    <select value={manualRequestForm.service} onChange={e => setManualRequestForm({ ...manualRequestForm, service: e.target.value })} style={{ background: '#03060c', color: '#fff', border: '1px solid #1e293b', padding: '14px', borderRadius: '12px' }}>
                                                        <option value="Reparación de PC o Laptop">Reparación de PC o Laptop</option>
                                                        <option value="Mantenimiento preventivo/correctivo">Mantenimiento</option>
                                                        <option value="Actualización de hardware">Actualización</option>
                                                        <option value="Instalación de programas o SO">Software/SO</option>
                                                        <option value="Armado de PC Gamer">PC Gamer</option>
                                                        <option value="Otro">Otro</option>
                                                    </select>
                                                </div>
                                                <div className="input-group" style={{ gridColumn: 'span 2' }}>
                                                    <label>Detalle del Problema / Nota</label>
                                                    <textarea placeholder="Describe lo que reporta el cliente..." value={manualRequestForm.message} onChange={e => setManualRequestForm({ ...manualRequestForm, message: e.target.value })} required style={{ minHeight: '100px', background: '#03060c', color: '#fff', border: '1px solid #1e293b', padding: '14px', borderRadius: '12px', width: '100%' }} />
                                                </div>
                                                <button className="btn-primary" style={{ gridColumn: 'span 2' }} disabled={saving}>
                                                    {saving ? 'Guardando...' : '📦 Guardar Solicitud en Sistema'}
                                                </button>
                                            </form>
                                        </section>
                                    </div>
                                )}
                                <div className="kanban-cols">
                                    {COLUMNS.map(col => {
                                        const colCards = requests.filter(r => r.status === col.key);
                                        const isOver = dragOverCol === col.key;
                                        return (
                                            <div
                                                key={col.key}
                                                className={`kanban-col ${isOver ? 'drop-active' : ''}`}
                                                style={{ borderTopColor: col.color }}
                                                onDragOver={e => { e.preventDefault(); setDragOverCol(col.key); }}
                                                onDragLeave={() => setDragOverCol(null)}
                                                onDrop={e => handleDrop(e, col.key)}
                                            >
                                                <div className="col-header">
                                                    <span className="col-emoji">{col.emoji}</span>
                                                    <span className="col-title" style={{ color: col.color }}>{col.label}</span>
                                                    <span className="col-badge" style={{ background: col.color + '22', color: col.color }}>{colCards.length}</span>
                                                </div>

                                                <div className="col-cards">
                                                    {colCards.length === 0 && (
                                                        <div className="empty-col">
                                                            <span>Arrastra aquí</span>
                                                        </div>
                                                    )}
                                                    {colCards.map(req => (
                                                        <div
                                                            key={req._id}
                                                            className={`kan-card ${draggingId === req._id ? 'dragging' : ''}`}
                                                            draggable
                                                            onDragStart={e => handleDragStart(e, req._id)}
                                                            onDragEnd={handleDragEnd}
                                                            onClick={() => setSelectedRequest(req)}
                                                        >
                                                            <div className="kan-card-top">
                                                                <div className="kan-avatar">{req.name?.[0]?.toUpperCase()}</div>
                                                                <div className="kan-info">
                                                                    <span className="kan-name">{req.name}</span>
                                                                    <span className="kan-email">{req.email}</span>
                                                                </div>
                                                                <button className="kan-del" onClick={() => handleDeleteRequest(req._id)} title="Eliminar">✕</button>
                                                            </div>
                                                            <div className="kan-service-tag" style={{ color: col.color, borderColor: col.color + '44', background: col.color + '11' }}>
                                                                🔧 {req.service}
                                                            </div>
                                                            {req.phone && <div className="kan-phone">📱 {req.phone}</div>}
                                                            {inventory.some(inv => inv.serviceRequestId === req._id) && (
                                                                <div className="kan-inventory-indicator">
                                                                    💼 Equipo en Inventario
                                                                </div>
                                                            )}
                                                            <p className="kan-msg">{req.message}</p>
                                                            <div className="kan-footer">
                                                                <span className="kan-date">{new Date(req.createdAt).toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                                                <span className="kan-drag-hint">⠿ Arrastra</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Modal de Detalles de Solicitud */}
                                <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
                                    <DialogContent className="sm:max-w-[600px] bg-[#0b1120] border-white/10 text-white">
                                        <DialogHeader>
                                            <DialogTitle className="text-xl flex items-center gap-2">
                                                <Badge className={`uppercase text-[10px] ${
                                                    selectedRequest?.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' :
                                                    selectedRequest?.status === 'contacted' ? 'bg-blue-500/20 text-blue-500 border-blue-500/50' :
                                                    selectedRequest?.status === 'in_progress' ? 'bg-purple-500/20 text-purple-500 border-purple-500/50' :
                                                    selectedRequest?.status === 'archived' ? 'bg-slate-500/20 text-slate-400 border-slate-500/50' :
                                                    'bg-green-500/20 text-green-500 border-green-500/50'
                                                }`}>
                                                    {selectedRequest?.status === 'pending' ? 'Recibido' :
                                                     selectedRequest?.status === 'contacted' ? 'Contactado' :
                                                     selectedRequest?.status === 'in_progress' ? 'En Proceso' : 
                                                     selectedRequest?.status === 'archived' ? 'Archivado' : 'Completado'}
                                                </Badge>
                                                Detalles de la Solicitud
                                            </DialogTitle>
                                            <div className="flex gap-2 ml-auto">
                                                {selectedRequest?.status !== 'archived' ? (
                                                    <Button 
                                                        size="sm" 
                                                        variant="outline" 
                                                        className="h-8 border-white/10 text-slate-400 hover:text-white"
                                                        onClick={() => {
                                                            handleUpdateRequestStatus(selectedRequest._id, 'archived');
                                                            setSelectedRequest(null);
                                                        }}
                                                    >
                                                        <Archive className="w-3.5 h-3.5 mr-2" /> Archivar
                                                    </Button>
                                                ) : (
                                                    <Button 
                                                        size="sm" 
                                                        variant="outline" 
                                                        className="h-8 border-white/10 text-slate-400 hover:text-white"
                                                        onClick={() => {
                                                            handleUpdateRequestStatus(selectedRequest._id, 'pending');
                                                            setSelectedRequest(null);
                                                        }}
                                                    >
                                                        <History className="w-3.5 h-3.5 mr-2" /> Restaurar
                                                    </Button>
                                                )}
                                            </div>
                                            <DialogDescription className="text-slate-400">
                                                Información detallada del cliente y el servicio requerido.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="grid gap-6 py-4">
                                            {/* Sección Cliente */}
                                            <div className="space-y-4">
                                                <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                                                    <User className="w-4 h-4" /> Información del Cliente
                                                </h4>
                                                <div className="grid grid-cols-2 gap-4 bg-[#03060c] p-4 rounded-xl border border-white/5">
                                                    <div className="space-y-1">
                                                        <Label className="text-[10px] text-slate-500 uppercase">Nombre</Label>
                                                        <p className="text-sm font-medium">{selectedRequest?.name}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-[10px] text-slate-500 uppercase">Fecha</Label>
                                                        <p className="text-sm font-medium flex items-center gap-1">
                                                            <Calendar className="w-3 h-3 text-slate-400" />
                                                            {selectedRequest?.createdAt && new Date(selectedRequest.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-[10px] text-slate-500 uppercase">Correo</Label>
                                                        <p className="text-sm font-medium flex items-center gap-2">
                                                            <Mail className="w-3 h-3 text-slate-400" />
                                                            {selectedRequest?.email}
                                                        </p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-[10px] text-slate-500 uppercase">Teléfono</Label>
                                                        <p className="text-sm font-medium flex items-center gap-2">
                                                            <Phone className="w-3 h-3 text-slate-400" />
                                                            {selectedRequest?.phone || 'No registrado'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Sección Servicio */}
                                            <div className="space-y-4">
                                                <h4 className="text-sm font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                                                    <Laptop className="w-4 h-4" /> Detalles del Servicio
                                                </h4>
                                                <div className="bg-[#03060c] p-4 rounded-xl border border-white/5 space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm font-bold text-white">{selectedRequest?.service}</span>
                                                        <span className="text-[10px] text-slate-500 font-mono">ID: {selectedRequest?._id?.slice(-6)}</span>
                                                    </div>
                                                    <Separator className="bg-white/5" />
                                                    <div className="space-y-2 text-left">
                                                        <Label className="text-[10px] text-slate-500 uppercase flex items-center gap-1 text-left">
                                                            <MessageSquare className="w-3 h-3" /> Mensaje / Notas del Cliente
                                                        </Label>
                                                        <p className="text-sm text-slate-300 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5 text-left">
                                                            {selectedRequest?.message}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Equipos Vinculados */}
                                            {inventory.filter(inv => inv.serviceRequestId === selectedRequest?._id).length > 0 && (
                                                <div className="space-y-4">
                                                    <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                                                        <CheckCircle2 className="w-4 h-4" /> Equipos Relacionados
                                                    </h4>
                                                    <div className="space-y-2">
                                                        {inventory.filter(inv => inv.serviceRequestId === selectedRequest?._id).map(item => (
                                                            <div key={item._id} className="flex items-center justify-between bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-xl">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                                                                        <Laptop className="w-4 h-4" />
                                                                    </div>
                                                                    <div className="text-left">
                                                                        <p className="text-xs font-bold text-white">{item.name}</p>
                                                                        <p className="text-[10px] text-slate-500 font-mono">{item.brand} {item.model} - S/N: {item.serialNumber}</p>
                                                                    </div>
                                                                </div>
                                                                <Badge className="bg-emerald-500 text-white text-[9px]">{item.status}</Badge>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        );
                    })()}

                    {activeTab === 'inventory' && (
                        <InventoryManagement 
                            requests={requests}
                            inventory={inventory}
                                            fetchInventory={fetchInventory}
                            handleSaveInventory={handleSaveInventory}
                            handleDeleteInventory={handleDeleteInventory}
                            handleUpdateInventoryStatus={handleUpdateInventoryStatus}
                            inventoryForm={inventoryForm}
                            setInventoryForm={setInventoryForm}
                            invLoading={invLoading}
                        />
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
                                            <input type="text" placeholder="ej: Reparación de PC" value={serviceForm.title} onChange={e => setServiceForm({ ...serviceForm, title: e.target.value })} required />
                                        </div>

                                        <div className="form-row">
                                            <div className="input-group">
                                                <label>Icono (Emoji)</label>
                                                <input type="text" value={serviceForm.icon} onChange={e => setServiceForm({ ...serviceForm, icon: e.target.value })} required />
                                            </div>
                                            <div className="input-group">
                                                <label>Etiquetas (separadas por comas)</label>
                                                <input type="text" placeholder="AWS, SSL, 24/7" value={serviceForm.tags} onChange={e => setServiceForm({ ...serviceForm, tags: e.target.value })} />
                                            </div>
                                        </div>

                                        <div className="input-group">
                                            <div className="label-with-action">
                                                <label>Descripción del Servicio</label>
                                                <button type="button" className="btn-ai-magic" onClick={handleGenerateAIDesc} disabled={generatingAI}>
                                                    {generatingAI ? '🧠 Pensando...' : '✨ Generar con IA'}
                                                </button>
                                            </div>
                                            <textarea value={serviceForm.desc} onChange={e => setServiceForm({ ...serviceForm, desc: e.target.value })} required />
                                        </div>

                                        <div className="form-submit-area">
                                            <button type="submit" className="btn-save-modern" disabled={saving}>
                                                {saving ? 'Guardando...' : '🔄 Sincronizar con Web'}
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
                                                    <span key={i} style={{ color: serviceForm.color, border: `1px solid ${serviceForm.color}33`, background: `${serviceForm.color}0d` }}>{t.trim()}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div className="list-side">
                                <section className="current-services-list">
                                    <div className="sticky-list-header">
                                        <div className="list-head">
                                            <h3>Servicios</h3>
                                            <span className="count-badge">{services.length}</span>
                                        </div>
                                        <div className="filter-modes">
                                            <button className={serviceFilter === 'all' ? 'active' : ''} onClick={() => setServiceFilter('all')}>Todos</button>
                                            <button className={serviceFilter === 'active' ? 'active' : ''} onClick={() => setServiceFilter('active')}>Activos</button>
                                            <button className={serviceFilter === 'draft' ? 'active' : ''} onClick={() => setServiceFilter('draft')}>Borrador</button>
                                        </div>
                                        <div className="tag-cloud-mini" style={{ marginTop: '12px' }}>
                                            <span className={`tag-chip ${selectedTag === 'all' ? 'active' : ''}`} onClick={() => setSelectedTag('all')}>#all</span>
                                            {Array.from(new Set(services.flatMap(s => s.tags || []))).map(tag => (
                                                <span key={tag} className={`tag-chip ${selectedTag === tag ? 'active' : ''}`} onClick={() => setSelectedTag(tag)}>#{tag}</span>
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
                                                    <div className="s-icon-box" style={{ color: s.color, background: s.color + '18' }}>{s.icon}</div>
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
                        <div className="metrics-dashboard space-y-8">
                            <div className="metrics-header">
                                <h3 className="text-xl font-bold text-white">Análisis de Rendimiento Web</h3>
                                <p className="text-sm text-slate-500">Tráfico y conversiones de los últimos 7 días.</p>
                            </div>
                            
                            <div className="charts-grid-main">
                                <div className="big-chart-container p-6 sm:p-10 bg-[#0b1120] border border-white/5 rounded-3xl overflow-hidden">
                                    <div className="chart-info flex gap-6 mb-10">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Visitas</div>
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400"><span className="w-3 h-3 rounded-full bg-green-500"></span> Conversiones</div>
                                    </div>
                                    <div className="bars-area flex items-end justify-between h-[200px] border-b border-white/5">
                                        {[
                                            { day: 'Lun', h1: '40%', h2: '15%' },
                                            { day: 'Mar', h1: '60%', h2: '25%' },
                                            { day: 'Mie', h1: '80%', h2: '45%' },
                                            { day: 'Jue', h1: '70%', h2: '35%' },
                                            { day: 'Vie', h1: '95%', h2: '60%' },
                                            { day: 'Sab', h1: '45%', h2: '20%' },
                                            { day: 'Dom', h1: '30%', h2: '10%' },
                                        ].map(d => (
                                            <div key={d.day} className="flex-1 flex flex-col items-center gap-3 h-full">
                                                <div className="relative w-full max-w-[12px] sm:max-w-[24px] h-full flex flex-col-reverse justify-start">
                                                    <div className="absolute inset-0 bg-white/5 rounded-full"></div>
                                                    <div className="relative z-10 w-full bg-blue-500 rounded-full transition-all duration-1000" style={{ height: d.h1 }}></div>
                                                    <div className="absolute bottom-0 z-20 w-full bg-green-500 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(34,197,94,0.4)]" style={{ height: d.h2 }}></div>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-500">{d.day}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="p-6 bg-[#0b1120] border border-white/5 rounded-2xl">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Tiempo Promedio</p>
                                        <h4 className="text-2xl font-bold text-white">4m 32s</h4>
                                        <p className="text-[10px] text-green-400 mt-1">↑ 12% vs anterior</p>
                                    </div>
                                    <div className="p-6 bg-[#0b1120] border border-white/5 rounded-2xl">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Drop-off Rate</p>
                                        <h4 className="text-2xl font-bold text-red-500">12.4%</h4>
                                        <p className="text-[10px] text-red-400/50 mt-1">↓ 2% mejorado</p>
                                    </div>
                                    <div className="p-6 bg-[#0b1120] border border-white/5 rounded-2xl">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Nuevo vs Recurrente</p>
                                        <h4 className="text-2xl font-bold text-blue-400">64% / 36%</h4>
                                        <p className="text-[10px] text-slate-500 mt-1">Base estable</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
