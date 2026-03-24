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
import { Trash2, Package, Wrench, RefreshCcw } from "lucide-react";

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
    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Formulario de Registro */}
                <Card className="lg:col-span-1 border-white/5 bg-[#0b1120]">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white text-lg">
                            <Package className="w-5 h-5 text-blue-400" />
                            Registrar Ingreso
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSaveInventory} className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-slate-400 text-xs text-left">Nombre del Dispositivo</Label>
                                <Input 
                                    className="bg-[#03060c] border-white/10 text-white h-11"
                                    placeholder="Ej: MacBook Pro"
                                    value={inventoryForm.name} 
                                    onChange={e => setInventoryForm({ ...inventoryForm, name: e.target.value })} 
                                    required 
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-400 text-xs text-left">Marca</Label>
                                    <Input className="bg-[#03060c] border-white/10 text-white h-11" value={inventoryForm.brand} onChange={e => setInventoryForm({ ...inventoryForm, brand: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-400 text-xs text-left">Modelo</Label>
                                    <Input className="bg-[#03060c] border-white/10 text-white h-11" value={inventoryForm.model} onChange={e => setInventoryForm({ ...inventoryForm, model: e.target.value })} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-400 text-xs text-left">S/N</Label>
                                <Input className="bg-[#03060c] border-white/10 text-white h-11" value={inventoryForm.serialNumber} onChange={e => setInventoryForm({ ...inventoryForm, serialNumber: e.target.value })} />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-400 text-xs text-left">Tipo</Label>
                                <Select value={inventoryForm.type} onValueChange={(val) => setInventoryForm({ ...inventoryForm, type: val })}>
                                    <SelectTrigger className="bg-[#03060c] border-white/10 text-white h-11">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#0f172a] border-white/10 text-white">
                                        <SelectItem value="equipment">🛠️ Equipo Cliente</SelectItem>
                                        <SelectItem value="product">📦 Producto Stock</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-400 text-xs text-left">Vincular Solicitud</Label>
                                <Select value={inventoryForm.serviceRequestId} onValueChange={(val) => {
                                    const req = requests.find(r => r._id === val);
                                    setInventoryForm({ ...inventoryForm, serviceRequestId: val, ownerName: req?.name || '' });
                                }}>
                                    <SelectTrigger className="bg-[#03060c] border-white/10 text-white h-11">
                                        <SelectValue placeholder="-- Seleccionar --" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#0f172a] border-white/10 text-white">
                                        <SelectItem value="none">Sin vinculación</SelectItem>
                                        {requests.map(req => (
                                            <SelectItem key={req._id} value={req._id}>{req.name} - {req.service}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 mt-4" disabled={invLoading}>
                                {invLoading ? 'Guardando...' : 'Registrar en Sistema'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Lista de Inventario Shadcn */}
                <Card className="lg:col-span-2 border-white/5 bg-[#0b1120]">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-white text-lg">Inventario Activo</CardTitle>
                        <Button variant="outline" size="sm" onClick={fetchInventory} className="border-white/10 text-slate-400 hover:text-white">
                            <RefreshCcw className="w-4 h-4 mr-2" /> Actualizar
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-xl border border-white/5 overflow-hidden">
                            <Table>
                                <TableHeader className="bg-[#03060c]/50">
                                    <TableRow className="border-white/5 hover:bg-transparent">
                                        <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Dispositivo</TableHead>
                                        <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Info Técnica</TableHead>
                                        <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Propietario</TableHead>
                                        <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Estado</TableHead>
                                        <TableHead className="text-right text-slate-400 font-bold uppercase text-[10px] tracking-wider">Acción</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {inventory.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-20 text-slate-500">
                                                No hay equipos registrados en el sistema
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        inventory.map((item) => (
                                            <TableRow key={item._id} className="border-white/5 hover:bg-white/5 transition-colors">
                                                <TableCell className="font-medium text-white p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2.5 bg-slate-800/50 rounded-xl border border-white/5">
                                                            {item.type === 'equipment' ? <Wrench className="w-4 h-4 text-blue-400" /> : <Package className="w-4 h-4 text-emerald-400" />}
                                                        </div>
                                                        <div className="flex flex-col text-left">
                                                            <span className="text-sm font-bold">{item.name}</span>
                                                            <span className="text-[10px] text-slate-500 uppercase tracking-tight">{item.type === 'equipment' ? 'Equipo' : 'Stock'}</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="p-4 text-left">
                                                    <div className="text-slate-300 text-sm font-semibold">{item.brand} {item.model}</div>
                                                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{item.serialNumber}</div>
                                                </TableCell>
                                                <TableCell className="text-slate-400 text-sm p-4 text-left">{item.ownerName || <span className="text-slate-600 italic">Disponibilidad Stock</span>}</TableCell>
                                                <TableCell className="p-4">
                                                    <Select 
                                                        value={item.status} 
                                                        onValueChange={(val) => handleUpdateInventoryStatus(item._id, val)}
                                                    >
                                                        <SelectTrigger 
                                                            className={`h-9 w-[140px] border-none bg-opacity-10 font-bold text-[10px] uppercase rounded-lg
                                                            ${item.status === 'repairing' ? 'bg-yellow-500 text-yellow-500' : 
                                                              item.status === 'available' ? 'bg-green-500 text-green-500' : 
                                                              item.status === 'delivered' ? 'bg-blue-500 text-blue-500' : 
                                                              'bg-red-500 text-red-500'}`}
                                                        >
                                                            <SelectValue />
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
                                                        className="text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
