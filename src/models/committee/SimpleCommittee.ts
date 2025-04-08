import type BaseModel from "@/models/BaseModel";
import type CommitteeMember from "@/models/CommitteeMember";

export default interface SimpleCommittee extends BaseModel {
  id?: number;
  name?: string;
  description?: string;
}
