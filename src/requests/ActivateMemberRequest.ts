import type Model from "../models/Model";

export default interface ActivateMemberRequest extends Model {
  username: string;
  token: string;
  password: string;
}

