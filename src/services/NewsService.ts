import BaseService from "./BaseService.ts";
import type NewsModel from "@/models/NewsModel.ts";
import type {Page, Pageable} from "@/models/Pageable.ts";

export default class NewsService extends BaseService {
  constructor() {
    super("/api/news");
  }

  async getNews(): Promise<NewsModel[]> {
    return this.get();
  }

  async getNewsPageable(pageable: Pageable): Promise<Page<NewsModel>> {
    return this.get("/pageable", pageable);
  }

  async createNews(news: NewsModel): Promise<NewsModel> {
    return this.post(news);
  }

  async updateNews(id: string, news: NewsModel): Promise<NewsModel> {
    return this.put(news, `/${id}`);
  }

  async deleteNews(id: string): Promise<void> {
    return this.delete(`/${id}`);
  }
}
