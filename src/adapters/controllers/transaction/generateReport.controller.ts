import { FastifyReply, FastifyRequest } from "fastify";
import { GenerateReport } from "../../../usecases/transaction/generateReport";
import { GenerateReportInput } from "../schemas/transaction/generateReport.schema";
import { Token } from "../../data/token";
import { StatusCodes } from "http-status-codes";
import { PDF } from "../../services/pdf";
import fs from "fs";
import path from "path";

export class GenerateReportController {
  readonly usecase: GenerateReport;

  constructor(usecase: GenerateReport) {
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

      await PDF.removeReport(reportPath);
    } catch (e) {
      const error = e as Error;

      await reply
        .status(StatusCodes.BAD_REQUEST)
        .send({ msg: error.message });
    }
  }
}