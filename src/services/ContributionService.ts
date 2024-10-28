import BaseService from './BaseService';
import type ContributionModel from "../models/ContributionModel";

export default class ContributionService extends BaseService {
  constructor() {
    super('/contributions');
  }

  // Get all contributions or a specific contribution by ID
  public async getContributions(id?: number): Promise<ContributionModel[]> {
    return super.get({id}).then((response) => response.data as ContributionModel[]);
  }

  // Get contributions by period ID
  public async getContributionsByPeriod(periodId: number): Promise<ContributionModel[]> {
    return this.get({ params: { periodId } })
      .then((response) => response.data as ContributionModel[]);
  }

  // Mark a contribution as paid (custom action)
  public async changeContributionPaid(contribution: ContributionModel, paid: boolean): Promise<ContributionModel> {
    return this.put({
      model: contribution,
      action: 'paid',
      params: {paid}
    }).then((response) => response.data as ContributionModel);
  }

  // Create a new contribution
  public async createContribution(contribution: ContributionModel): Promise<ContributionModel> {
    return super.post({
      model: contribution
    }).then((response) => response.data as ContributionModel);
  }

  // Update an existing contribution
  public async updateContribution(contribution: ContributionModel): Promise<ContributionModel> {
    return super.put({model: contribution})
      .then((response) => response.data as ContributionModel);
  }
}
