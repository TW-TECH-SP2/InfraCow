import PDFDocument from "pdfkit";

export const gerarRelatorioPDF = (req, res) => {
  const { titulo, conteudo } = req.body;
  const doc = new PDFDocument({ margin: 30 });

  res.setHeader("Content-Disposition", "attachment; filename=relatorio.pdf");
  res.setHeader("Content-Type", "application/pdf");
  
  doc.pipe(res);
  doc.fontSize(20).text(titulo, { align: "center" });
  doc.moveDown();

  conteudo.forEach(p => {
    doc.fontSize(12).text(p);
    doc.moveDown();
  });

  doc.end();
};