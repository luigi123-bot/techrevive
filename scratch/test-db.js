const mongoose = require('mongoose');
const dns = require('node:dns');

async function test() {
    console.log('--- Diagnóstico de Conexión MongoDB (JS) ---');
    console.log('Node version:', process.version);
    
    if (typeof dns.setDefaultResultOrder === 'function') {
        console.log('Configurando dns.setDefaultResultOrder("ipv4first")...');
        dns.setDefaultResultOrder('ipv4first');
    }

    const uri = 'mongodb+srv://luciagotopo_db_user:l6o6cwWMi60VjYTY@cluster0.z5lbxjb.mongodb.net/techrevive?retryWrites=true&w=majority';
    
    console.log('Intentando conectar a MongoDB Atlas...');

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            family: 4
        });
        console.log('✅ CONEXIÓN EXITOSA');
        await mongoose.disconnect();
    } catch (e) {
        console.error('❌ ERROR DE CONEXIÓN:');
        console.error('Mensaje:', e.message);
        console.error('Código:', e.code);
        console.error('Syscall:', e.syscall);
        console.error('Hostname:', e.hostname);
        
        if (e.code === 'ECONNREFUSED' && e.syscall === 'querySrv') {
            console.log('\n💡 Tip: El error ECONNREFUSED en querySrv sugiere un problema de resolución DNS.');
            console.log('Esto sucede a menudo cuando el servidor DNS de tu red no puede resolver registros SRV.');
        }
    }
}

test();
