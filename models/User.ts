import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor, proporciona un nombre'],
    },
    email: {
        type: String,
        required: [true, 'Por favor, proporciona un correo'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor, usa un correo válido'],
    },
    password: {
        type: String,
        required: [true, 'Por favor, proporciona una contraseña'],
        minlength: 6,
        select: false, // Don't return password by default
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    resetPasswordCode: String,
    resetPasswordExpire: Date,
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
