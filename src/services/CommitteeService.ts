// ./src/services/CommitteeService.ts
import BaseService from "./BaseService";
import type Committee from "@/models/Committee";
import type CommitteeMember from "@/models/CommitteeMember";

export default class CommitteeService extends BaseService {
  constructor() {
    super("/committees");
  }

  async getCommittees(isMember?: boolean): Promise<Committee[]> {
    return this.get("", { isMember });
  }

  async createCommittee(committee: Committee): Promise<Committee> {
    return this.post(committee);
  }

  async updateCommittee(id: number, committee: Committee): Promise<Committee> {
    return this.put(committee, `/${id}`);
  }

  async deleteCommittee(id: number): Promise<void> {
    return this.delete(`/${id}`);
  }

  async getMembers(committeeId: number): Promise<CommitteeMember[]> {
    return this.get(`/${committeeId}/members`);
  }
}
