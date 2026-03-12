import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
        }

        const { title, tags, currentDesc } = await req.json();

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            Eres un experto en marketing digital y tecnología para TechRevive.
            Tu tarea es generar una descripción atractiva, profesional y persuasiva para un servicio técnico.
            
            DATOS DEL SERVICIO:
            - Título: ${title}
            - Etiquetas: ${tags}
            - Descripción actual (parcial): ${currentDesc || 'No proporcionada'}

            REQUISITOS:
            1. Máximo 250 caracteres.
            2. Debe sonar premium y tecnológico.
            3. Enfocado en el beneficio para el cliente.
            4. Idioma: Español Colombiano profesional.
            5. NO uses negritas ni formatos Markdown, solo texto plano.
            6. Sé directo y evita rellenos.

            Genera solo el texto de la descripción.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();

        return NextResponse.json({ description: text });
    } catch (error: any) {
        console.error('AI Generation Error:', error);
        return NextResponse.json({ error: 'Error al generar con IA' }, { status: 500 });
    }
}
