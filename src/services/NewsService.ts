import BaseService from "./BaseService";
import type News from "@/models/News";
import type {Page, Pageable} from "@/models/Pageable.ts";

export default class NewsService extends BaseService {
  constructor() {
    super("/news");
  }

  async getNews(): Promise<News[]> {
    return this.get();
  }

  async getNewsPageable(pageable: Pageable): Promise<Page<News>> {
    return this.get("/pageable", pageable);
  }

  async createNews(news: News): Promise<News> {
    return this.post(news);
  }

  async updateNews(id: string, news: News): Promise<News> {
    return this.put(news, `/${id}`);
  }

  async deleteNews(id: string): Promise<void> {
    return this.delete(`/${id}`);
  }
}
