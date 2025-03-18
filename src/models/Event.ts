import type BaseModel from "@/models/BaseModel";

export default interface Event extends BaseModel {
  id?: number;
  committeeId?: number;
  title: string;
  description: string;
  location?: string;
  startTime: string;
  endTime: string;
  memberPrice?: string;
  publicPrice?: string;
  visible?: boolean;
  membersOnly?: boolean;
  signUp?: boolean;
  banner?: File;
  signUpForm?: [];
}
