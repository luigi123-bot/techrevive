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
        <div className="flex flex-col gap-6">
            {/* ── Stats Cards ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0b1120] p-5 transition-all hover:border-blue-500/20 hover:-translate-y-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                            <Monitor className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total</span>
                    </div>
                    <div className="text-3xl font-black text-white tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>{stats.total}</div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0b1120] p-5 transition-all hover:border-emerald-500/20 hover:-translate-y-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Disponibles</span>
                    </div>
                    <div className="text-3xl font-black text-emerald-400 tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>{stats.available}</div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0b1120] p-5 transition-all hover:border-amber-500/20 hover:-translate-y-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                            <Wrench className="w-4 h-4 text-amber-400" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">En Reparación</span>
                    </div>
                    <div className="text-3xl font-black text-amber-400 tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>{stats.repairing}</div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0b1120] p-5 transition-all hover:border-rose-500/20 hover:-translate-y-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
                            <AlertTriangle className="w-4 h-4 text-rose-400" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Dañados</span>
                    </div>
                    <div className="text-3xl font-black text-rose-400 tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>{stats.broken}</div>
                </div>
            </div>

            {/* ── Toolbar ── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                        className="bg-[#0b1120] border-white/5 text-white h-12 pl-11 rounded-xl focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 placeholder:text-slate-600"
                        placeholder="Buscar dispositivo, marca, modelo o serial..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="h-12 w-[170px] bg-[#0b1120] border-white/5 text-slate-300 rounded-xl focus:border-blue-500/40">
                            <SelectValue placeholder="Filtrar estado" />
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
                        className="h-12 w-12 border-white/5 bg-[#0b1120] text-slate-400 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/5 rounded-xl transition-all"
                    >
                        <RefreshCcw className="w-4 h-4" />
                    </Button>
                    <Button
                        onClick={() => setShowForm(!showForm)}
                        className={`h-12 px-5 rounded-xl font-bold text-sm gap-2 transition-all ${showForm
                            ? 'bg-slate-700 hover:bg-slate-600 text-white'
                            : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-lg shadow-blue-500/20'
                            }`}
                    >
                        <Plus className="w-4 h-4" />
                        {showForm ? 'Cerrar' : 'Nuevo'}
                    </Button>
                </div>
            </div>

            {/* ── New Item Form (collapsible) ── */}
            {showForm && (
                <Card className="border-blue-500/20 bg-gradient-to-br from-[#0b1120] to-[#0d1630] overflow-hidden animate-in slide-in-from-top-2 duration-300">
                    <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-white text-lg">
                            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                <Package className="w-5 h-5 text-blue-400" />
                            </div>
                            Registrar Nuevo Dispositivo
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={(e) => { handleSaveInventory(e); setShowForm(false); }} className="space-y-5">
                            <div className="space-y-2">
                                <Label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Nombre del Dispositivo</Label>
                                <Input
                                    className="bg-[#03060c] border-white/10 text-white h-12 rounded-xl focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20"
                                    placeholder="Ej: MacBook Pro 2023"
                                    value={inventoryForm.name}
                                    onChange={e => setInventoryForm({ ...inventoryForm, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Marca</Label>
                                    <Input
                                        className="bg-[#03060c] border-white/10 text-white h-12 rounded-xl focus:border-blue-500/40"
                                        placeholder="Ej: Apple"
                                        value={inventoryForm.brand}
                                        onChange={e => setInventoryForm({ ...inventoryForm, brand: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Modelo</Label>
                                    <Input
                                        className="bg-[#03060c] border-white/10 text-white h-12 rounded-xl focus:border-blue-500/40"
                                        placeholder="Ej: A2338"
                                        value={inventoryForm.model}
                                        onChange={e => setInventoryForm({ ...inventoryForm, model: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-400 text-xs font-bold uppercase tracking-wider">S/N o Código</Label>
                                    <Input
                                        className="bg-[#03060c] border-white/10 text-white h-12 rounded-xl focus:border-blue-500/40"
                                        placeholder="Ej: SN-123456"
                                        value={inventoryForm.serialNumber}
                                        onChange={e => setInventoryForm({ ...inventoryForm, serialNumber: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5"
                                    disabled={invLoading}
                                >
                                    {invLoading ? (
                                        <span className="flex items-center gap-2">
                                            <RefreshCcw className="w-4 h-4 animate-spin" /> Guardando...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Plus className="w-4 h-4" /> Agregar al Inventario
                                        </span>
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="border-white/10 text-slate-400 hover:text-white h-12 rounded-xl px-6"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* ── Inventory Table ── */}
            <Card className="border-white/5 bg-[#0b1120] overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-0">
                    <div className="flex items-center gap-3">
                        <CardTitle className="text-white text-lg font-bold">Inventario</CardTitle>
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-black tracking-wide">
                            {filteredInventory.length} {filteredInventory.length === 1 ? 'equipo' : 'equipos'}
                        </span>
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <div className="rounded-xl border border-white/5 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-[#03060c]/80">
                                <TableRow className="border-white/5 hover:bg-transparent">
                                    <TableHead className="text-slate-500 font-extrabold uppercase text-[10px] tracking-wider py-4">Dispositivo</TableHead>
                                    <TableHead className="text-slate-500 font-extrabold uppercase text-[10px] tracking-wider py-4">Info Técnica</TableHead>
                                    <TableHead className="text-slate-500 font-extrabold uppercase text-[10px] tracking-wider py-4">Propietario</TableHead>
                                    <TableHead className="text-slate-500 font-extrabold uppercase text-[10px] tracking-wider py-4">Estado</TableHead>
                                    <TableHead className="text-right text-slate-500 font-extrabold uppercase text-[10px] tracking-wider py-4">Acción</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredInventory.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-24">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="p-5 rounded-2xl bg-slate-800/30 border border-white/5">
                                                    <HardDrive className="w-8 h-8 text-slate-600" />
                                                </div>
                                                <div>
                                                    <p className="text-slate-400 font-semibold text-sm">No se encontraron equipos</p>
                                                    <p className="text-slate-600 text-xs mt-1">
                                                        {searchTerm || filterStatus !== 'all'
                                                            ? 'Intenta cambiar los filtros de búsqueda'
                                                            : 'Agrega el primer dispositivo al inventario'}
                                                    </p>
                                                </div>
                                                {!searchTerm && filterStatus === 'all' && (
                                                    <Button
                                                        onClick={() => setShowForm(true)}
                                                        className="mt-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 rounded-xl text-xs font-bold px-4 h-9"
                                                    >
                                                        <Plus className="w-3.5 h-3.5 mr-1.5" /> Agregar Dispositivo
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredInventory.map((item) => {
                                        const status = statusConfig[item.status] || statusConfig.broken;
                                        return (
                                            <TableRow
                                                key={item._id}
                                                className="border-white/[0.03] hover:bg-white/[0.02] transition-colors group"
                                            >
                                                <TableCell className="font-medium text-white p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2.5 rounded-xl border ${status.border} ${status.bg} transition-all group-hover:scale-105`}>
                                                            {item.type === 'equipment'
                                                                ? <Monitor className={`w-4 h-4 ${status.color}`} />
                                                                : <Package className={`w-4 h-4 ${status.color}`} />}
                                                        </div>
                                                        <div className="flex flex-col text-left">
                                                            <span className="text-sm font-bold text-white leading-tight">{item.name}</span>
                                                            <span className="text-[10px] text-slate-600 uppercase tracking-tight font-bold mt-0.5">
                                                                {item.type === 'equipment' ? '🖥 Equipo' : '📦 Stock'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="p-4 text-left">
                                                    <div className="text-slate-300 text-sm font-semibold">{item.brand} {item.model}</div>
                                                    <div className="flex items-center gap-1.5 mt-1">
                                                        <span className="text-[9px] text-slate-600 font-bold uppercase">SN:</span>
                                                        <span className="text-[11px] text-slate-500 font-mono bg-white/[0.03] px-2 py-0.5 rounded">{item.serialNumber || '—'}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="p-4 text-left">
                                                    {item.ownerName ? (
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center text-blue-400 text-[10px] font-black">
                                                                {item.ownerName.charAt(0).toUpperCase()}
                                                            </div>
                                                            <span className="text-slate-300 text-sm font-medium">{item.ownerName}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-slate-600 text-xs italic flex items-center gap-1.5">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
                                                            Disponible en stock
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="p-4">
                                                    <Select
                                                        value={item.status}
                                                        onValueChange={(val) => handleUpdateInventoryStatus(item._id, val)}
                                                    >
                                                        <SelectTrigger
                                                            className={`h-9 w-[155px] border ${status.border} ${status.bg} ${status.color} font-bold text-[10px] uppercase rounded-lg gap-1.5 tracking-wide`}
                                                        >
                                                            <span className="flex items-center gap-1.5">
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
                                                </TableCell>
                                                <TableCell className="text-right p-4">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDeleteInventory(item._id)}
                                                        className="text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
