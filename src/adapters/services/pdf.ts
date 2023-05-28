import jsPDF from "jspdf";
import path from "path";
import fs from "fs/promises";
import { TransactionCategory } from "../../usecases/transaction/interface/transactionRepository";
import autoTable from "jspdf-autotable";

export class PDF {
  static staticPath = path.join(process.cwd(), "public/users/reports");

  static async generateReport(
    transactions: TransactionCategory[],
    username: string,
  ): Promise<string> {
    const pdf = new jsPDF();

    autoTable(pdf, {
      head: [["Título", "Valor", "Data", "Categoria"]],
      body: transactions.map((t) => [
        t.title,
        t.isEntry ? `+ R$ ${t.value}` : `- R$ ${t.value}`,
        PDF.formatDate(t.date),
        t.category,
      ]),
      headStyles: {
        fillColor: "#49AD5A",
        textColor: "#FFFFFF",
      },
      didParseCell: (data) => {
        const valueColumnIndex = 1;
        if (data.column.index !== valueColumnIndex) {
          return;
        }

        data.cell.styles.fontStyle = "bold";

        if (data.cell.text[0].split(" ")[0] === "+") {
          data.cell.styles.textColor = "#49AD5A";
        } else if (data.cell.text[0].split(" ")[0] === "-") {
          data.cell.styles.textColor = "#EF5350";
        }
      },
    });

    return await PDF.saveReport(pdf, username);
  }

  static async removeReport(path: string) {
    await fs.unlink(path);
  }

  private static async saveReport(
    pdf: jsPDF,
    username: string,
  ): Promise<string> {
    try {
      await fs.stat(PDF.staticPath);
    } catch(_) {
      await fs.mkdir(PDF.staticPath);
    }
    const pdfPath = path.join(PDF.staticPath, `${username}.pdf`);
    await pdf.save(pdfPath, {
      returnPromise: true,
    });

    return pdfPath;
  }

  private static formatDate(date: Date) {
    const unitOffset = 1;
    const leftDigits = 2;

    const day = date.getDate().toString().padStart(leftDigits, "0");
    const month = (date.getMonth() + unitOffset)
      .toString().padStart(leftDigits, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
}