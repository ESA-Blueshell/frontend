import type BaseModel from "@/models/BaseModel";
import type {FileType} from "@/models/enums/FileType";


export interface File extends BaseModel {
  id?: number;
  name?: string;
  url?: string;
  uploaderId?: number;
  createdAt?: string;
  mediaType?: string;
  size?: number;
  fileName?: string;
  fileType?: FileType;
  base64Content?: string;
}
