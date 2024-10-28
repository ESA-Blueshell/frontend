import BaseService from './BaseService';
import type ContributionPeriodModel from "../models/ContributionPeriodModel";
import type ContributionModel from "@/models/ContributionModel";

export default class ContributionPeriodService extends BaseService {
  constructor() {
    super('/contributionPeriods');
  }

  // Get all contribution periods or a specific period by ID
  public async getContributionPeriods(id?: number): Promise<ContributionPeriodModel[]> {
    return super.get({id})
      .then((response) => response.data as ContributionPeriodModel[]);
  }

  // Create a new contribution period
  public async createContributionPeriod(contributionPeriod: ContributionPeriodModel): Promise<ContributionPeriodModel> {
    return super.post({
      model: contributionPeriod
    }).then((response) => response.data as ContributionPeriodModel);
  }

  // Update an existing contribution period
  public async updateContributionPeriod(contributionPeriod: ContributionPeriodModel): Promise<ContributionPeriodModel> {
    return super.put({model: contributionPeriod})
      .then((response) => response.data as ContributionPeriodModel);
  }

  // Get contributions by period ID
  public async getContributions(id: number): Promise<ContributionModel[]> {
    return this.get({id, action: 'contributions'})
      .then((response) => response.data as ContributionModel[]);
  }
}
