import type BaseModel from "@/models/BaseModel";

export interface News extends BaseModel {
  id?: string;
  creatorId: string;
  creatorUsername?: string;
  lastEditorId: string;
  lastEditorUsername?: string;
  newsType: string;
  title: string;
  content: string;
  postedAt?: string;
}

