import Contract from "../util/Contract";
import { IAbi, IContract } from "../types";
import { simpleAggregator } from "./abi";

export default async function (): Promise<IContract> {
  const simpleAggregatorContract = new Contract(
    simpleAggregator.abi,
    simpleAggregator.address,
    simpleAggregator.name
  );
  await simpleAggregatorContract.caculateEventsHash();
  return simpleAggregatorContract.getContractEventDatas();
}
