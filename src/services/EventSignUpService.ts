import BaseService from "./BaseService";
import type EventSignUp from "@/models/EventSignUp.ts";

export default class EventSignUpService extends BaseService {
  constructor() {
    super("/events");
  }

  async getEventSignUps(eventId: number): Promise<EventSignUp[]> {
    return this.get(`/${eventId}/signups`);
  }

  async getSignups(): Promise<EventSignUp[]> {
    return this.get("/signups");
  }

  async createSignUp(eventId: number, signUp: EventSignUp): Promise<EventSignUp> {
    return this.post(signUp, `/${eventId}/signups`);
  }

  async updateSignUp(eventId: number, signUp: EventSignUp): Promise<EventSignUp> {
    return this.put(signUp, `/${eventId}/signups`);
  }

  async deleteSignUp(eventSignUpId: number, accessToken?: string): Promise<void> {
    return this.delete(`/signups/${eventSignUpId}`, { accessToken });
  }

  async getByAccessToken(accessToken: string): Promise<EventSignUp> {
    return this.get(`/signups/byAccessToken/${accessToken}`);
  }
}
