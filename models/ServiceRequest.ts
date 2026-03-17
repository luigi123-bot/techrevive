import mongoose from 'mongoose';

const ServiceRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    service: { type: String, required: true },
    message: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'in_progress', 'completed', 'cancelled'],
        default: 'pending'
    },
    source: { type: String, default: 'web_form' } // web_form, chatbot, etc.
}, { timestamps: true });

export default mongoose.models.ServiceRequest || mongoose.model('ServiceRequest', ServiceRequestSchema);
