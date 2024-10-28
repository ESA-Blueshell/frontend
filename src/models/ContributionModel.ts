import type Model from "./Model";
import type ContributionPeriodModel from "./ContributionPeriodModel";

export default interface ContributionModel extends Model {
  contributionPeriod?: ContributionPeriodModel;
  paid: boolean;
  userId: number,
}

