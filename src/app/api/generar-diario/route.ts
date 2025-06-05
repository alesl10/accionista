// // 📁 /app/api/generar-diario/route.ts (Next.js 13+/App Router)
// import { NextRequest, NextResponse } from 'next/server';
// import puppeteer from 'puppeteer';
// import handlebars from 'handlebars';
// import path from 'path';
// import fs from 'fs/promises';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export async function POST(req: NextRequest) {
//   try {
//     const { html } = await req.json();

//     // Cargar template
//     const templatePath = path.join(__dirname, 'template.hbs');
//     const templateHtml = await fs.readFile(templatePath, 'utf-8');
//     const template = handlebars.compile(templateHtml);
//     const finalHtml = template({ contenido: html });

//     const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
//     const page = await browser.newPage();

//     await page.setContent(finalHtml, { waitUntil: 'networkidle0' });

//     const pdfBuffer = await page.pdf({
//       format: 'legal',
//       printBackground: true,
//       margin: {
//         top: '20mm',
//         bottom: '20mm',
//         left: '20mm',
//         right: '20mm',
//       },
//     });

//     await browser.close();

//     return new NextResponse(pdfBuffer, {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/pdf',
//         'Content-Disposition': 'inline; filename="diario.pdf"'
//       },
//     });
//   } catch (error) {
//     console.error('❌ Error al generar PDF:', error);
//     return NextResponse.json({ error: 'Error interno al generar el PDF' }, { status: 500 });
//   }
// }

