import mongoose from 'mongoose';
import dns from 'node:dns';

// Forzar el uso de los servidores DNS de Google para resolver registros SRV de MongoDB Atlas
// Esto soluciona el error ECONNREFUSED en querySrv cuando el DNS local no es confiable.
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Forzar la resolución de DNS a IPv4 primero
if (typeof dns.setDefaultResultOrder === 'function') {
  dns.setDefaultResultOrder('ipv4first');
}

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
    } catch (e: any) {
        cached.promise = null;
        console.error('❌ Error detallado de conexión a MongoDB:', {
            mensaje: e.message,
            codigo: e.code,
            syscall: e.syscall,
            hostname: e.hostname
        });
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
