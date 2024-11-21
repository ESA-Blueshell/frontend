import type Model from "../models/Model";

export default interface ActivateUserRequest extends Model {
  username: string;
  token: string;
}

