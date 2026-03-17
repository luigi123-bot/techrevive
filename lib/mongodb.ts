import mongoose from 'mongoose';

// Configuración de DNS optimizada solo para la conexión de Mongoose si es necesario
// dns.setServers se eliminó para evitar conflictos globales en el proceso Node.js

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Por favor, define la variable MONGODB_URI en .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 10000, // Fallar rápido (10s) en lugar de esperar 30s
            connectTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            family: 4, // Forzar IPv4 para evitar problemas de resolución SRV en IPv6
        };

        cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
            console.log('✅ MongoDB Conectado exitosamente');
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
