import type BaseModel from "@/models/BaseModel";
import type SimpleCommittee from "@/models/committee/SimpleCommittee.ts";

export default interface Event extends BaseModel {
  id?: number;
  committeeId?: number;
  committee?: SimpleCommittee;
  title: string;
  description: string;
  location?: string;
  startTime: string;
  endTime: string;
  memberPrice?: number;
  publicPrice?: number;
  visible?: boolean;
  membersOnly?: boolean;
  signUp?: boolean;
  banner?: File;
  signUpForm?: [];
}
