import type BaseModel from "./BaseModel";
import type { ResetType } from "./enums/ResetType";


export default interface ActivationRequest extends BaseModel {
token: string;
resetType: ResetType;
username?: string;
password?: string;
}
