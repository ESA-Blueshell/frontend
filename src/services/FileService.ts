import BaseService from "./BaseService";
import type File from "@/models/File";

export default class FileService extends BaseService {
  constructor() {
    super("/files");
  }

  async downloadFile(filename: string): Promise<Blob> {
    const response = await this.axios.get(`/download/${filename}`, {
      ...this.authHeader(),
      responseType: "blob"
    });
    return response.data;
  }

  async getEventBanner(eventId: number): Promise<Blob> {
    const response = await this.axios.get(`/events/${eventId}/banner`, {
      ...this.authHeader(),
      responseType: "blob"
    });
    return response.data;
  }

  async uploadFile(file: File): Promise<File> {
    const formData = new FormData();
    formData.append("file", new Blob([file.base64Content!]), file.fileName);
    return this.post(formData);
  }
}
