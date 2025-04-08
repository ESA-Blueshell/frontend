import type BaseModel from "@/models/BaseModel";

export type FormAnswer = 'open' | 'radio' | 'checkbox';

export default interface EventSignUp extends BaseModel {
  eventId?: number;
  fullName?: string;
  discord?: string;
  email?: string;
  formAnswers?: FormAnswer[];
}
