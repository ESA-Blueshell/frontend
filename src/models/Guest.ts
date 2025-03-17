import type BaseModel from "@/models/BaseModel";

export interface Guest extends BaseModel {
  id: number;
  name?: string;
  discord?: string;
  email?: string;
  createdAt?: string;
  accessToken?: string;
}
