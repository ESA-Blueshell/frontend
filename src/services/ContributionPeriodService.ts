import BaseService from './BaseService';
import type ContributionPeriod from "../models/ContributionPeriod";
import type Contribution from "@/models/Contribution";
import type UserModel from "@/models/User";

export default class ContributionPeriodService extends BaseService {
  constructor() {
    super('/contributionPeriods');
  }

  // Get all contribution periods or a specific period by ID
  public async getContributionPeriods(id?: number): Promise<ContributionPeriod[]> {
    return super.get({id})
      .then((response) => response.data as ContributionPeriod[]);
  }

  // Create a new contribution period
  public async createContributionPeriod(contributionPeriod: ContributionPeriod): Promise<ContributionPeriod> {
    return super.post({
      model: contributionPeriod
    }).then((response) => response.data as ContributionPeriod);
  }

  // Update an existing contribution period
  public async updateContributionPeriod(contributionPeriod: ContributionPeriod): Promise<ContributionPeriod> {
    return super.put({model: contributionPeriod})
      .then((response) => response.data as ContributionPeriod);
  }

  public async getContributions(id: number): Promise<Contribution[]> {
    return this.get({id, action: 'contributions'})
      .then((response) => response.data as Contribution[]);
  }

  // Get contributions by period ID
  public async getContributionForUser(id: number, user: UserModel): Promise<Contribution> {
    return this.get({id, action: `users/${user.id}/contribution`})
      .then((response) => response.data as Contribution);
  }
}
