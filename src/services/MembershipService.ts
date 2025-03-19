import BaseService from "./BaseService";
import type {Membership} from "@/models";

export default class MembershipServiceService extends BaseService {
  constructor() {
    super("/memberships");
  }

  async getMemberships(): Promise<Membership[]> {
    return this.get();
  }

  async getMembership(id: number): Promise<Membership> {
    return this.get(`/${id}`);
  }

  async createMembership(membership: Membership): Promise<Membership> {
    return this.post(membership);
  }

  async updateMembership(id: number, membership: Membership): Promise<Membership> {
    return this.put(membership, `/${id}`);
  }
}
