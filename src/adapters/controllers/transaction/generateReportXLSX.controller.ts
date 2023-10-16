import { FastifyReply, FastifyRequest } from "fastify";
import { GenerateReportXLSX } from "../../../usecases/transaction/generateReportXLSX";
import { GenerateReportInput } from "../schemas/transaction/generateReport.schema";
import fs from "fs";
import path from "path";
import { Token } from "../../data/token";
import { XLSX } from "../../services/xlsx";
import { StatusCodes } from "http-status-codes";

export class GenerateReportXLSXController {
  readonly usecase: GenerateReportXLSX;

  constructor(usecase: GenerateReportXLSX) {
    this.usecase = usecase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { initDate, endDate } = request.query as GenerateReportInput;
    const token = Token.decode(request.cookies["financi-jwt"]!);

    try {
      const reportPath = await this.usecase.generate(
        token.id,
        { initDate, endDate },
      );

      const fileStream = fs.createReadStream(reportPath);
      await reply
        .type("application/octet-stream")
        .header(
          "Content-Disposition",
          `attachment; filename=${path.basename(reportPath)}`,
        )
        .send(fileStream);

      await XLSX.removeReport(reportPath);
    } catch (e) {
      const error = e as Error;

      await reply
        .status(StatusCodes.BAD_REQUEST)
        .send({ msg: error.message });
    }
  }
}