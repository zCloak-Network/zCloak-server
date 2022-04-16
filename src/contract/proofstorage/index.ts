import Contract from "../util/Contract";
import { IAbi, IContract } from "../types";
import { proofstorage } from "./abi";

export default async function (): Promise<IContract> {
  const proofstorageContract = new Contract(
    proofstorage.abi,
    proofstorage.address,
    proofstorage.name
  );

  await proofstorageContract.caculateEventsHash();
  return proofstorageContract.getContractEventDatas();
}
