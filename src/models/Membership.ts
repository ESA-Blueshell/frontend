import type BaseModel from "@/models/BaseModel";
import type {MemberType} from "@/models/enums/MemberType.ts";

export default interface Membership extends BaseModel {
  id?: number;
  date?: string;
  city?: string;
  country?: string;
  signature?: File;
  memberType?: MemberType;
  startDate?: string;
  endDate?: string;
}
