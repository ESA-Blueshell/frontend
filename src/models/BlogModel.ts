import type BaseModel from "@/models/BaseModel";

export default interface BlogModel extends BaseModel {
  title: string;
  html: string;
  published_at: string;
}

export const defaultBlog: BlogModel = {
  type: 'BlogDTO',
  title: '',
  html: '',
  published_at: '',
};
