import type BaseModel from "./BaseModel";

export default interface ContributionModel extends BaseModel {
  userId: number,
  paid: boolean;
  contributionPeriodId?: number;
}

