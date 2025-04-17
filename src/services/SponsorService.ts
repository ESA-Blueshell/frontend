import BaseApiService from "./BaseApiService.ts";
import type SponsorModel from "@/models/SponsorModel.ts";

export default class SponsorService extends BaseApiService {
  constructor() {
    super("/api/sponsors");
  }

  async getSponsors(): Promise<SponsorModel[]> {
    return this.get();
  }

  async createSponsor(sponsor: SponsorModel): Promise<SponsorModel> {
    return this.post(sponsor);
  }

  async updateSponsor(id: number, sponsor: SponsorModel): Promise<SponsorModel> {
    return this.put(sponsor, `/${id}`);
  }

  async deleteSponsor(id: number): Promise<void> {
    return this.delete(`/${id}`);
  }
}
