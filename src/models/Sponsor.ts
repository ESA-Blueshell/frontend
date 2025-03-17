import type BaseModel from "@/models/BaseModel";


export default interface Sponsor extends BaseModel {
  name: string;
  description: string;
}
