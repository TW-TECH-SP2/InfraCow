import PDFDocument from "pdfkit";

export function generateReportPDF(res) {
  const doc = new PDFDocument();

  res.setHeader("Content-Disposition", "attachment; filename=relatorio.pdf");
  res.setHeader("Content-Type", "application/pdf");

  doc.pipe(res);
  doc.fontSize(20).text("Relatório de Monitoramento de Bovinos 🐄", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text("Temperatura corporal média: 37.6°C");
  doc.text("Data da medição: 29/10/2025");
  doc.moveDown();
  doc.text("Status: Normal", { underline: true });
  doc.end();
}
