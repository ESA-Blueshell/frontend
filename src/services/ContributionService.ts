import BaseService from "./BaseService";
import type Contribution from "@/models/Contribution";

export default class ContributionService extends BaseService {
  constructor() {
    super("/contributions");
  }

  async createContribution(contribution: Contribution): Promise<Contribution> {
    return this.post(contribution);
  }

  async markAsPaid(id: number, paid: boolean): Promise<Contribution> {
    return this.put({ paid }, `/${id}/paid`);
  }

  async getByPeriod(periodId: number): Promise<Contribution[]> {
    return this.get("", { contributionPeriodId: periodId });
  }

  async deleteContribution(id: number): Promise<void> {
    return this.delete(`/${id}`);
  }

  async sendReminder(periodId: number): Promise<void> {
    return this.post(null, `/contributionPeriods/${periodId}/remind`);
  }
}
