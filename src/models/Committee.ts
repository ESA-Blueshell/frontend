import type BaseModel from "@/models/BaseModel";
import type {CommitteeMember} from "@/models/CommitteeMember";

export default interface Committee extends BaseModel {
  id?: number;
  name?: string;
  description?: string;
  members?: CommitteeMember[];
}
