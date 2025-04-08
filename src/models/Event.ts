import type BaseModel from "@/models/BaseModel";
import type SimpleCommittee from "@/models/committee/SimpleCommittee.ts";
import type FormQuestion from "@/models/FormQuestion.ts"
import type File from "@/models/File.ts"

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
  signUpForm?: FormQuestion[];
}
