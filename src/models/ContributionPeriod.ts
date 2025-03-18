import type BaseModel from "@/models/BaseModel";

export default interface ContributionPeriod extends BaseModel {
  id?: number;
  startDate?: string;
  endDate?: string;
  halfYearFee?: number;
  fullYearFee?: number;
  alumniFee?: number;
  listId?: number;
}
