const mongoose = require('mongoose');
const dns = require('node:dns');

// FORZAR SERVIDORES DNS DE GOOGLE PARA ESTE PROCESO
dns.setServers(['8.8.8.8', '8.8.4.4']);

async function test() {
    console.log('--- Diagnóstico de Conexión MongoDB (Con DNS forzado) ---');
    console.log('Utilizando DNS de Google (8.8.8.8)...');

    const uri = 'mongodb+srv://luciagotopo_db_user:l6o6cwWMi60VjYTY@cluster0.z5lbxjb.mongodb.net/techrevive?retryWrites=true&w=majority';

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            family: 4
        });
        console.log('✅ CONEXIÓN EXITOSA CON DNS FORZADO');
        await mongoose.disconnect();
    } catch (e) {
        console.error('❌ ERROR INCLUSO CON DNS FORZADO:');
        console.error(e.message);
    }
}

test();
