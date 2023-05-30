import * as jsXLSX from "xlsx";
import { TransactionCategory } from "../../usecases/transaction/interface/transactionRepository";
import path from "path";
import fs from "fs/promises";

export class XLSX {
  static staticPath = path.join(process.cwd(), "public/users/reports");

  static async generateReport(
    transactions: TransactionCategory[],
    username: string,
  ): Promise<string> {
    const parsedData = transactions.map((t) => {
      return {
        "Título": t.title,
        "Valor": `R$ ${Number(t.value).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}`,
        "Data": XLSX.formatDate(t.date),
        "Categoria": t.category,
      };
    });

    const worksheet = jsXLSX.utils.json_to_sheet(parsedData);
    const workbook = jsXLSX.utils.book_new();

    const defaultColumnWidth = 10;
    const maxWidth = parsedData
      .reduce((w, r) => Math.max(w, r["Título"].length), defaultColumnWidth);
    worksheet["!cols"] = [
      { wch: maxWidth },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];

    jsXLSX.utils.book_append_sheet(workbook, worksheet, "Transações");

    return await XLSX.saveReport(workbook, username);
  }

  static async removeReport(path: string) {
    await fs.unlink(path);
  }

  private static async saveReport(
    xlsx: jsXLSX.WorkBook,
    username: string,
  ): Promise<string> {
    try {
      await fs.stat(XLSX.staticPath);
    } catch(_) {
      await fs.mkdir(XLSX.staticPath);
    }
    const xlsxPath = path.join(XLSX.staticPath, `${username}.xlsx`);
    await new Promise<void>((resolve) => {
      jsXLSX.writeFileAsync(
        xlsxPath,
        xlsx,
        {
          compression: true,
        },
        resolve,
      );
    });

    return xlsxPath;
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