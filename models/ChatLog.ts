import mongoose from 'mongoose';

const ChatLogSchema = new mongoose.Schema({
    messages: [
        {
            role: {
                type: String,
                enum: ['user', 'model'],
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
}, { timestamps: true });

// Check if the model exists before creating it (Next.js hot reloading)
export default mongoose.models.ChatLog || mongoose.model('ChatLog', ChatLogSchema);
