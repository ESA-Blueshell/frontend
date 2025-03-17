import type BaseModel from "./BaseModel";

export default interface ContributionPeriodModel extends BaseModel{
  startDate: string;
  endDate: string;
  halfYearFee: number;
  fullYearFee: number;
  alumniFee: number;
  listId?: number;
}
