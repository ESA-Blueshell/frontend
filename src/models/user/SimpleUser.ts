import type BaseModel from "@/models/BaseModel";

export default interface SimpleUser extends BaseModel {
  id: number;
  username?: string;
  discord?: string;
  firstName?: string;
  prefix?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
}
