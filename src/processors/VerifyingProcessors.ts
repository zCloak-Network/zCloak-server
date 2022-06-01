import { getTRepository } from "../database";
import { VerifyingEntity } from "../database/entity/Verifying";
import { Verifying } from "../database/types";
import { IVerifyingProcessor } from "./processorsInterface";
import * as log4js from "../utils/log4js";

export default class VerifyingProcessors implements IVerifyingProcessor {
  async isSave(receiptLogData: Verifying): Promise<boolean> {
    const verifyingRepository = await getTRepository(VerifyingEntity);
    const result = await verifyingRepository.findOneBy({ transactionHash: receiptLogData.transactionHash });
    return result === null ? true : false;
  }

  async save(receiptLogData: Verifying, versionId: number): Promise<void> {
    try {
      const verifyingRepository = await getTRepository(VerifyingEntity);
      receiptLogData.versionId = versionId;
      await verifyingRepository
        .save(receiptLogData as unknown as VerifyingEntity)
        .then((res) => log4js.info(`mysql save ${verifyingRepository.metadata.tableName}\n${JSON.stringify(res)}`));
    } catch (error) {
      log4js.error("The error occurs in saving Verifying.");
      throw new Error(error + "");
    }
  }

  isAdapt(eventType: string): boolean {
    if (eventType === "Verifying") {
      return true;
    }
    return false;
  }
}
