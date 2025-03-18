import type BaseModel from "@/models/BaseModel";

export default interface Membership extends BaseModel {
  id?: number;
  date?: string;
  city?: string;
  country?: string;
  signature?: File;
  startDate?: string;
  endDate?: string;
}
