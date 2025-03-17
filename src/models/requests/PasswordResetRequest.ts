import type BaseModel from "./BaseModel";

// ================== Request Types ==================

export default interface PasswordResetRequest extends BaseModel {
username: string;
token: string;
password: string;
}
