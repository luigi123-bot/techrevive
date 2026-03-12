import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    tags: [String],
    color: { type: String, default: '#00a8ff' },
    active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
