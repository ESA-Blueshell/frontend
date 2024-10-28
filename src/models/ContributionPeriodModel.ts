import type Model from "./Model";

export default interface ContributionPeriodModel extends Model{
  startDate: string;
  endDate: string;
  halfYearFee: number;
  fullYearFee: number;
  alumniFee: number;
  listId?: number;
}
