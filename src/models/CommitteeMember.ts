import type BaseModel from "@/models/BaseModel";
import type SimpleUser from "@/models/user/SimpleUser";

export default interface CommitteeMember extends BaseModel {
  role?: string;
  userId?: number;
  user?: SimpleUser;
  committeeId?: number;
}
