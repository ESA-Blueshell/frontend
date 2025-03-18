import BaseService from "./BaseService";
import type Event from "@/models/Event";

export default class EventService extends BaseService {
  constructor() {
    super("/events");
  }

  async createEvent(event: Event): Promise<Event> {
    return this.post(event);
  }

  async getEvent(id: number): Promise<Event> {
    return this.get(`/${id}`);
  }

  async getEvents(from?: string, to?: string): Promise<Event[]> {
    return this.get("", { from, to });
  }

  async getUpcomingEvents(editable = false): Promise<Event[]> {
    return this.get("/upcoming", { editable });
  }

  async getPastEvents(editable = false): Promise<Event[]> {
    return this.get("/past", { editable });
  }

  async updateEvent(id: number, event: Event): Promise<Event> {
    return this.put(event, `/${id}`);
  }

  async deleteEvent(id: number): Promise<void> {
    return this.delete(`/${id}`);
  }
}
