import type BaseModel from "@/models/BaseModel";

export default interface Contribution extends BaseModel {
  id?: number;
  userId?: number;
  contributionPeriodId?: number;
  paid?: boolean;
  remindedAt?: string;
}
