import type BaseModel from "@/models/BaseModel";

export default interface EventFeedback extends BaseModel {
  id: number;
  feedback?: string;
  eventId: number;
}
