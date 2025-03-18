import BaseService from "./BaseService";
import type Sponsor from "@/models/Sponsor";

export default class SponsorService extends BaseService {
  constructor() {
    super("/sponsors");
  }

  async getSponsors(): Promise<Sponsor[]> {
    return this.get();
  }

  async createSponsor(sponsor: Sponsor): Promise<Sponsor> {
    return this.post(sponsor);
  }

  async updateSponsor(id: number, sponsor: Sponsor): Promise<Sponsor> {
    return this.put(sponsor, `/${id}`);
  }

  async deleteSponsor(id: number): Promise<void> {
    return this.delete(`/${id}`);
  }
}
