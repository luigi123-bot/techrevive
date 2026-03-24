import mongoose from 'mongoose';

const InventoryItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['product', 'equipment'], default: 'equipment' },
    brand: { type: String },
    model: { type: String },
    serialNumber: { type: String, unique: true, sparse: true },
    status: { 
        type: String, 
        enum: ['available', 'repairing', 'delivered', 'broken'], 
        default: 'repairing' 
    },
    // Relación opcional con una solicitud de servicio específica
    serviceRequestId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ServiceRequest',
        required: false 
    },
    ownerName: { type: String }, // Nombre del dueño si es del cliente
    notes: { type: String },
    receivedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.InventoryItem || mongoose.model('InventoryItem', InventoryItemSchema);
