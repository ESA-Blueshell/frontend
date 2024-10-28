import BaseService from './BaseService';
import type UserModel from "../models/UserModel";

export default class UserService extends BaseService {
  constructor() {
    super('/users')
  }

  public async getUsers(): Promise<UserModel[]> {
    return super.get({}).then((response) => response.data as UserModel[]);
  }

  public async getUser(id: number): Promise<UserModel[]> {
    return super.get({id}).then((response) => response.data as UserModel[]);
  }

  async setMembership(user: UserModel, isMember: boolean): Promise<UserModel> {
    return this.put({model: user, action: 'member', params: {isMember}})
      .then((response) => response.data as UserModel)
  }

  async syncWithBrevo(user: UserModel): Promise<UserModel> {
    return this.put({model: user, action: 'brevo'})
      .then((response) => response.data as UserModel);
  }

  async update(user: UserModel): Promise<UserModel> {
    return this.put({model: user})
      .then((response) => response.data as UserModel);
  }
}
