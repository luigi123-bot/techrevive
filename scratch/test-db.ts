import mongoose from 'mongoose';
import dns from 'node:dns';

async function test() {
    console.log('--- Diagnóstico de Conexión MongoDB ---');
    console.log('Node version:', process.version);
    
    if (typeof dns.setDefaultResultOrder === 'function') {
        console.log('Configurando dns.setDefaultResultOrder("ipv4first")...');
        dns.setDefaultResultOrder('ipv4first');
    }

    const uri = 'mongodb+srv://luciagotopo_db_user:l6o6cwWMi60VjYTY@cluster0.z5lbxjb.mongodb.net/techrevive?retryWrites=true&w=majority';
    
    console.log('Intentando conectar a:', uri.replace(/:[^@]+@/, ':****@'));

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            family: 4
        });
        console.log('✅ CONEXIÓN EXITOSA');
        await mongoose.disconnect();
    } catch (e: any) {
        console.error('❌ ERROR DE CONEXIÓN:');
        console.error('Mensaje:', e.message);
        console.error('Código:', e.code);
        console.error('Syscall:', e.syscall);
        console.error('Hostname:', e.hostname);
        
        if (e.code === 'ECONNREFUSED' && e.syscall === 'querySrv') {
            console.log('\n💡 Tip: El error ECONNREFUSED en querySrv sugiere un problema de resolución DNS.');
            console.log('Prueba a cambiar el servidor DNS de tu equipo a 8.8.8.8 o usa una conexión sin SRV.');
        }
    }
}

test();
