import BaseService from './BaseService';
import type Contribution from "../models/Contribution";

export default class ContributionService extends BaseService {
  constructor() {
    super('/contributions');
  }

  // Get all contributions or a specific contribution by ID
  public async getContributions(id?: number): Promise<Contribution[]> {
    return super.get({id}).then((response) => response.data as Contribution[]);
  }

  // Get contributions by period ID
  public async getContributionsByPeriod(periodId: number): Promise<Contribution[]> {
    return this.get({params: {periodId}})
      .then((response) => response.data as Contribution[]);
  }

  // Mark a contribution as paid (custom action)
  public async changeContributionPaid(contribution: Contribution, paid: boolean): Promise<Contribution> {
    return this.put({
      model: contribution,
      action: 'paid',
      params: {paid}
    }).then((response) => response.data as Contribution);
  }

  // Create a new contribution
  public async createContribution(contribution: Contribution): Promise<Contribution> {
    return super.post({
      model: contribution
    }).then((response) => response.data as Contribution);
  }

  // Update an existing contribution
  public async updateContribution(contribution: Contribution): Promise<Contribution> {
    return super.put({model: contribution})
      .then((response) => response.data as Contribution);
  }
}
