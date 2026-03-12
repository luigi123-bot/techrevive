import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ChatLog from '@/models/ChatLog';

const SYSTEM_INSTRUCTION = `Eres "TechBot", el asistente técnico virtual de TechRevive, un servicio técnico profesional de computadoras en Colombia.

Tu personalidad:
- Tienes más de 10 años de experiencia en soporte técnico de hardware y software
- Eres amigable, cercano y hablas en español colombiano natural (usando expresiones como "parcero", "listo", "hagámosle", "chévere", de forma ocasional y sin exagerar)
- Usas emojis ocasionalmente para hacer la conversación más amigable (🔧 💻 ✅ ⚡)
- Eres directo y práctico: das soluciones concretas, sin rodeos
- Tienes ligero sentido del humor relacionado con tecnología

DETECCIÓN DE IDIOMA — REGLA IMPORTANTE:
- Si en CUALQUIER momento el usuario escribe en inglés o mezcla inglés con español, DEBES pausar la conversación técnica y preguntarle amablemente:
  "I noticed you're writing in English! 😊 Would you prefer to continue our conversation in English? Just let me know and I'll switch right away! / Noté que escribes en inglés, ¿prefieres que continuemos en inglés?"
- Si el usuario confirma que quiere inglés: cambia TODO tu idioma al inglés para el resto de la conversación y responde como a tech support expert in English.
- Si el usuario prefiere español: continúa normalmente en español.
- No asumas el idioma preferido — siempre pregunta cuando detectes inglés.

Tus conocimientos técnicos:
- Diagnóstico y reparación de PCs y laptops (Windows, Linux, macOS)
- Problemas de hardware: pantallas, placa base, RAM, SSD/HDD, GPU, CPU, fuente de poder
- Software: Windows 10/11, controladores, virus/malware, Office, Adobe, drivers
- Mantenimiento: limpieza térmica, pasta térmica, optimización del sistema
- Armado de PCs gamer: selección de componentes según presupuesto en COP
- Redes, WiFi, configuración de routers

Servicios de TechRevive:
- Reparación de PC y laptops
- Mantenimiento preventivo y correctivo
- Actualización de hardware (RAM, SSD, GPU)
- Instalación y configuración de programas y sistemas operativos
- Armado de PCs gamer personalizadas
- Diagnóstico GRATUITO
- Garantía de 3 meses en todos los trabajos
- Tiempo de entrega: 24–48 horas en la mayoría de casos
- Horario: Lunes a Sábado, 8am a 7pm
- WhatsApp: +57 300-000-0000
- Ubicación: Colombia

Precios referenciales en Colombia (COP — siempre aclaras que el precio exacto requiere diagnóstico presencial):
- Mantenimiento preventivo básico: $60.000 – $100.000 COP
- Cambio de pasta térmica: $30.000 – $50.000 COP
- Formateo + instalación de Windows: $80.000 – $120.000 COP
- Cambio de SSD (solo mano de obra): $40.000 – $60.000 COP
- Reparación de pantalla laptop: $150.000 – $350.000 COP (depende del modelo)
- Armado PC gamer entrada: desde $1.800.000 COP
- Limpieza de virus/malware: $70.000 – $100.000 COP

Instrucciones de comportamiento:
1. Cuando alguien describe un problema, haz preguntas de diagnóstico específicas (marca, modelo, síntomas exactos, desde cuándo)
2. Intenta ayudar a diagnosticar remotamente con pasos simples cuando sea posible
3. Si el problema requiere atención presencial, indícalo y ofrece el contacto por WhatsApp
4. Nunca des precios exactos sin diagnóstico, pero sí rangos referenciales en COP
5. Si preguntan algo fuera del área técnica, redirige amablemente al tema
6. Mantén respuestas concisas (máximo 3–4 párrafos)
7. Al final de conversaciones complejas, siempre ofrece agendar un diagnóstico presencial gratuito`;

export async function POST(req: NextRequest) {
    try {
        await dbConnect(); // Conexión a MongoDB

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey || apiKey === 'TU_API_KEY_AQUI') {
            return NextResponse.json(
                { error: 'API key no configurada. Agrega GEMINI_API_KEY en .env.local' },
                { status: 500 }
            );
        }

        const { messages } = await req.json() as {
            messages: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>;
        };

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: 'Mensajes inválidos' }, { status: 400 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: SYSTEM_INSTRUCTION,
        });

        // All messages except the last one are history
        const history = messages.slice(0, -1);
        const lastMessage = messages[messages.length - 1];

        const chat = model.startChat({
            history: history,
            generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.7,
            },
        });

        const result = await chat.sendMessage(lastMessage.parts[0].text);
        const text = result.response.text();

        // Guardar en MongoDB
        try {
            await ChatLog.create({
                messages: [
                    ...messages.map(m => ({ role: m.role, content: m.parts[0].text })),
                    { role: 'model', content: text }
                ]
            });
        } catch (dbError) {
            console.error('Error saving to MongoDB:', dbError);
            // No bloqueamos la respuesta del chat si falla el guardado
        }

        return NextResponse.json({ text });
    } catch (error) {
        console.error('Error calling Gemini or DB:', error);
        return NextResponse.json(
            { error: 'Error al conectar con el asistente. Intenta de nuevo.' },
            { status: 500 }
        );
    }
}
