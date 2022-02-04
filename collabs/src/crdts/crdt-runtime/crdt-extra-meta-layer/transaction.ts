import { Message, MessageMeta } from "../../../core";
import { ReceiveCRDTExtraMeta } from "./crdt_extra_meta_implementations";

export interface Transaction {
  readonly crdtExtraMeta: ReceiveCRDTExtraMeta;
  readonly messages: { messagePath: Message[]; meta: MessageMeta }[];
}
