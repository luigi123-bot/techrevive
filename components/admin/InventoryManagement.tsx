"use client";

import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2, Package, Wrench, RefreshCcw, Search, Plus, Monitor, HardDrive, CheckCircle2, AlertTriangle, Truck, XCircle } from "lucide-react";

interface InventoryItem {
    _id: string;
    name: string;
    type: string;
    brand: string;
    model: string;
    serialNumber: string;
    status: string;
    ownerName: string;
}

interface InventoryManagementProps {
    requests: any[];
    inventory: InventoryItem[];
    fetchInventory: () => void;
    handleSaveInventory: (e: React.FormEvent) => Promise<void>;
    handleDeleteInventory: (id: string) => Promise<void>;
    handleUpdateInventoryStatus: (id: string, status: string) => Promise<void>;
    inventoryForm: any;
    setInventoryForm: (form: any) => void;
    invLoading: boolean;
}

const statusConfig: Record<string, { label: string; icon: React.ReactNode; color: string; bg: string; border: string }> = {
    repairing: { label: 'En Reparación', icon: <Wrench className="w-3 h-3" />, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    available: { label: 'Disponible', icon: <CheckCircle2 className="w-3 h-3" />, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    delivered: { label: 'Entregado', icon: <Truck className="w-3 h-3" />, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    broken: { label: 'Dañado', icon: <XCircle className="w-3 h-3" />, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
};

export function InventoryManagement({
    requests,
    inventory,
    fetchInventory,
    handleSaveInventory,
    handleDeleteInventory,
    handleUpdateInventoryStatus,
    inventoryForm,
    setInventoryForm,
    invLoading
}: InventoryManagementProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showForm, setShowForm] = useState(false);

    const filteredInventory = inventory.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Stats
    const stats = {
        total: inventory.length,
        repairing: inventory.filter(i => i.status === 'repairing').length,
        available: inventory.filter(i => i.status === 'available').length,
        delivered: inventory.filter(i => i.status === 'delivered').length,
        broken: inventory.filter(i => i.status === 'broken').length,
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-full overflow-hidden">
            {/* ── Stats Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
                <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0b1120] p-4 sm:p-5 transition-all hover:border-blue-500/20">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="p-1.5 sm:p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                            <Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-white tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>{stats.total}</div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0b1120] p-4 sm:p-5 transition-all hover:border-emerald-500/20">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">Venta</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>{stats.available}</div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0b1120] p-4 sm:p-5 transition-all hover:border-amber-500/20">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="p-1.5 sm:p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                            <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">Reparación</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>{stats.repairing}</div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0b1120] p-4 sm:p-5 transition-all hover:border-rose-500/20">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="p-1.5 sm:p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
                            <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" />
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">Dañados</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-rose-400 tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>{stats.broken}</div>
                </div>
            </div>

            {/* ── Toolbar ── */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 w-full">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                        className="bg-[#0b1120] border-white/5 text-white h-11 sm:h-12 pl-11 rounded-xl focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 placeholder:text-slate-600"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="h-11 sm:h-12 flex-1 lg:w-[170px] bg-[#0b1120] border-white/5 text-slate-300 rounded-xl focus:border-blue-500/40">
                            <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0f172a] border-white/10 text-white">
                            <SelectItem value="all">📋 Todos</SelectItem>
                            <SelectItem value="repairing">⚙️ En Reparación</SelectItem>
                            <SelectItem value="available">✅ Disponible</SelectItem>
                            <SelectItem value="delivered">📦 Entregado</SelectItem>
                            <SelectItem value="broken">❌ Dañado</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={fetchInventory}
                        className="h-11 w-11 sm:h-12 sm:w-12 border-white/5 bg-[#0b1120] text-slate-400 hover:text-blue-400 rounded-xl transition-all"
                    >
                        <RefreshCcw className="w-4 h-4" />
                    </Button>
                    <Button
                        onClick={() => setShowForm(!showForm)}
                        className={`h-11 sm:h-12 px-4 sm:px-6 rounded-xl font-bold text-sm gap-2 transition-all ${showForm
                            ? 'bg-slate-700 text-white'
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                        }`}
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">{showForm ? 'Cerrar' : 'Nuevo'}</span>
                    </Button>
                </div>
            </div>

            {/* ── New Item Form ── */}
            {showForm && (
                <Card className="border-blue-500/20 bg-gradient-to-br from-[#0b1120] to-[#0d1630]">
                    <div className="h-1 w-full bg-blue-500" />
                    <CardHeader className="p-4 sm:p-6 pb-2">
                        <CardTitle className="flex items-center gap-2 text-white text-base">
                            <Package className="w-4 h-4 text-blue-400" />
                            Registrar Dispositivo
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-2">
                        <form onSubmit={(e) => { handleSaveInventory(e); setShowForm(false); }} className="space-y-4">
                            <div className="space-y-1.5">
                                <Label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Nombre</Label>
                                <Input
                                    className="bg-[#03060c] border-white/10 text-white h-11 rounded-xl"
                                    placeholder="Ej: MacBook Pro"
                                    value={inventoryForm.name}
                                    onChange={e => setInventoryForm({ ...inventoryForm, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                <div className="space-y-1.5">
                                    <Label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Marca</Label>
                                    <Input
                                        className="bg-[#03060c] border-white/10 text-white h-11 rounded-xl"
                                        value={inventoryForm.brand}
                                        onChange={e => setInventoryForm({ ...inventoryForm, brand: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Modelo</Label>
                                    <Input
                                        className="bg-[#03060c] border-white/10 text-white h-11 rounded-xl"
                                        value={inventoryForm.model}
                                        onChange={e => setInventoryForm({ ...inventoryForm, model: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Serial</Label>
                                    <Input
                                        className="bg-[#03060c] border-white/10 text-white h-11 rounded-xl"
                                        value={inventoryForm.serialNumber}
                                        onChange={e => setInventoryForm({ ...inventoryForm, serialNumber: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Tipo</Label>
                                    <Select value={inventoryForm.type} onValueChange={v => setInventoryForm({ ...inventoryForm, type: v })}>
                                        <SelectTrigger className="bg-[#03060c] border-white/10 text-white h-11 rounded-xl">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#03060c] border-white/10 text-white">
                                            <SelectItem value="equipment">Monitor/Equipo</SelectItem>
                                            <SelectItem value="product">Producto/Repuesto</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Estado Inicial</Label>
                                    <Select value={inventoryForm.status} onValueChange={v => setInventoryForm({ ...inventoryForm, status: v })}>
                                        <SelectTrigger className="bg-[#03060c] border-white/10 text-white h-11 rounded-xl">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#03060c] border-white/10 text-white">
                                            <SelectItem value="available">Disponible</SelectItem>
                                            <SelectItem value="repairing">Reparación</SelectItem>
                                            <SelectItem value="broken">Dañado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-11 rounded-xl transition-all"
                                disabled={invLoading}
                            >
                                {invLoading ? 'Guardando...' : 'Confirmar Registro'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* ── Inventory Content ── */}
            <div className="w-full">
                <div className="flex items-center gap-3 mb-4 px-1">
                    <h3 className="text-white text-lg font-bold">Inventario Regional</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black">
                        {filteredInventory.length} ITEMS
                    </span>
                </div>

                {/* Mobile List View / Desktop Table View */}
                <Card className="border-white/5 bg-[#0b1120] overflow-hidden">
                    <div className="block lg:hidden">
                        {/* Mobile Cards */}
                        <div className="divide-y divide-white/5">
                            {filteredInventory.length === 0 ? (
                                <div className="p-12 text-center text-slate-500 text-sm">No se encontraron equipos</div>
                            ) : (
                                filteredInventory.map(item => {
                                    const status = statusConfig[item.status] || statusConfig.broken;
                                    return (
                                        <div key={item._id} className="p-4 space-y-3">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg border ${status.border} ${status.bg}`}>
                                                        {item.type === 'equipment' ? <Monitor className={`w-4 h-4 ${status.color}`} /> : <Package className={`w-4 h-4 ${status.color}`} />}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white font-bold text-sm">{item.name}</h4>
                                                        <p className="text-[10px] text-slate-500 uppercase font-black">{item.brand} {item.model}</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon" onClick={() => handleDeleteInventory(item._id)} className="text-slate-600 h-8 w-8">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="bg-white/[0.02] p-2 rounded-lg border border-white/5">
                                                    <p className="text-[9px] text-slate-600 font-bold uppercase mb-1">Dueño / Estado</p>
                                                    <p className="text-xs text-slate-300 font-medium truncate">{item.ownerName || 'Stock Interno'}</p>
                                                </div>
                                                <div className="bg-white/[0.02] p-2 rounded-lg border border-white/5">
                                                    <p className="text-[9px] text-slate-600 font-bold uppercase mb-1">Serial</p>
                                                    <p className="text-xs text-slate-400 font-mono truncate">{item.serialNumber || '—'}</p>
                                                </div>
                                            </div>
                                            <Select value={item.status} onValueChange={(val) => handleUpdateInventoryStatus(item._id, val)}>
                                                <SelectTrigger className={`h-9 w-full border ${status.border} ${status.bg} ${status.color} font-bold text-[10px] uppercase rounded-lg`}>
                                                    <span className="flex items-center gap-2">
                                                        {status.icon}
                                                        <SelectValue />
                                                    </span>
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#0f172a] border-white/10 text-white">
                                                    <SelectItem value="repairing">⚙️ En Reparación</SelectItem>
                                                    <SelectItem value="available">✅ Disponible</SelectItem>
                                                    <SelectItem value="delivered">📦 Entregado</SelectItem>
                                                    <SelectItem value="broken">❌ Dañado</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        {/* Desktop Table */}
                        <Table>
                            <TableHeader className="bg-[#03060c]/50">
                                <TableRow className="border-white/5">
                                    <TableHead className="text-slate-500 text-[10px] uppercase font-black py-4">Dispositivo</TableHead>
                                    <TableHead className="text-slate-500 text-[10px] uppercase font-black py-4">Info Técnica</TableHead>
                                    <TableHead className="text-slate-500 text-[10px] uppercase font-black py-4">Propietario</TableHead>
                                    <TableHead className="text-slate-500 text-[10px] uppercase font-black py-4">Estado</TableHead>
                                    <TableHead className="text-right text-slate-500 text-[10px] uppercase font-black py-4">Acción</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredInventory.map((item) => {
                                    const status = statusConfig[item.status] || statusConfig.broken;
                                    return (
                                        <TableRow key={item._id} className="border-white/[0.03] hover:bg-white/[0.01] group">
                                            <TableCell className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg border ${status.border} ${status.bg}`}>
                                                        {item.type === 'equipment' ? <Monitor className={`w-4 h-4 ${status.color}`} /> : <Package className={`w-4 h-4 ${status.color}`} />}
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-sm font-bold text-white leading-tight">{item.name}</p>
                                                        <p className="text-[10px] text-slate-600 font-bold uppercase">{item.type === 'equipment' ? 'Equipo' : 'Repuesto'}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-4 text-left">
                                                <p className="text-slate-300 text-sm font-semibold">{item.brand} {item.model}</p>
                                                <p className="text-[10px] text-slate-600 font-mono">{item.serialNumber || '—'}</p>
                                            </TableCell>
                                            <TableCell className="p-4 text-left">
                                                <span className="text-slate-400 text-sm">{item.ownerName || 'Stock Central'}</span>
                                            </TableCell>
                                            <TableCell className="p-4">
                                                <Select value={item.status} onValueChange={(val) => handleUpdateInventoryStatus(item._id, val)}>
                                                    <SelectTrigger className={`h-8 border ${status.border} ${status.bg} ${status.color} font-bold text-[9px] uppercase rounded-md`}>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-[#0f172a] border-white/10 text-white">
                                                        <SelectItem value="repairing">Reparación</SelectItem>
                                                        <SelectItem value="available">Disponible</SelectItem>
                                                        <SelectItem value="delivered">Entregado</SelectItem>
                                                        <SelectItem value="broken">Dañado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell className="text-right p-4">
                                                <Button variant="ghost" size="icon" onClick={() => handleDeleteInventory(item._id)} className="text-slate-600 hover:text-red-400">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </Card>
            </div>
        </div>
    );
}
