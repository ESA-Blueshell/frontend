import type Model from "./Model";

export default interface ContributionModel extends Model {
  userId: number,
  paid: boolean;
  contributionPeriodId?: number;
}

