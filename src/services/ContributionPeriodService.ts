import BaseService from "./BaseService";
import type ContributionPeriod from "@/models/ContributionPeriod";
import type Contribution from "@/models/Contribution.ts";

export default class ContributionPeriodService extends BaseService {
  constructor() {
    super("/contributionPeriods");
  }

  async getContributionPeriods(): Promise<ContributionPeriod[]> {
    return this.get();
  }

  async createPeriod(period: ContributionPeriod): Promise<ContributionPeriod> {
    return this.post(period);
  }

  async updatePeriod(id: number, period: ContributionPeriod): Promise<ContributionPeriod> {
    return this.put(period, `/${id}`);
  }

  async deletePeriod(id: number): Promise<void> {
    return this.delete(`/${id}`);
  }

  async getPeriodContributions(id: number): Promise<Contribution[]> {
    return this.get(`/${id}/contributions`);
  }
}
