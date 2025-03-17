import type BaseModel from "./BaseModel";


export default interface JwtRequest extends BaseModel {
username?: string;
password?: string;
}
