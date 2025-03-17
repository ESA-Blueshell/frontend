import type BaseModel from "@/models/BaseModel";

export interface EventSignUp extends BaseModel {
  eventId?: number;
  fullName?: string;
  discord?: string;
  email?: string;
  formAnswers?: [];
}
