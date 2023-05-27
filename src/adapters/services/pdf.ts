import jsPDF from "jspdf";
import path from "path";
import fs from "fs/promises";
import { TransactionCategory } from "../../usecases/transaction/interface/transactionRepository";

interface TableData {
  [key: string]: string,
}

export class PDF {
  static staticPath = path.join(process.cwd(), "public/users/reports");

  static async generateReport(
    transactions: TransactionCategory[],
    username: string,
  ): Promise<string> {
    const pdf = new jsPDF();
    const x = 0, y = 0;
    const data: TableData[] = [];

    transactions.forEach((transaction) => {
      data.push({
        "Título": transaction.title,
        "Valor": transaction.isEntry
          ? `R$ ${transaction.value}`
          : `R$ -${transaction.value}`,
        "Data": PDF.formatDate(transaction.date),
        "Categoria": transaction.category,
      });
    });

    pdf.table(x, y, data, [
      "Título",
      "Valor",
      "Data",
      "Categoria",
    ], {
      headerBackgroundColor: "#49AD5A",
      headerTextColor: "#FFFFFF",
      autoSize: true,
      printHeaders: true,
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