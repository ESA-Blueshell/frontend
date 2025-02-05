import BaseService from './BaseService';
import type UserModel from "../models/UserModel";
import type ActivateUserRequest from "@/requests/ActivateUserRequest";
import type ActivateMemberRequest from "@/requests/ActivateMemberRequest";
import {AxiosError} from "axios";
import store from "@/plugins/store";

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
    return this.put({model: user, action: 'membership', params: {isMember}})
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

  async create(user: UserModel): Promise<UserModel> {
    return this.post({model: user})
      .then((response) => response.data as UserModel);
  }

  async adminCreate(user: UserModel): Promise<UserModel> {
    return this.post({model: user, action: 'admin'})
      .then((response) => response.data as UserModel);
  }

  async activateMember(user: ActivateMemberRequest): Promise<void> {
    return this.post({model: user, action: 'activateMember'})
      .then(response => response.data);
  }

  async activateUser(user: ActivateUserRequest): Promise<void> {
    return this.post({model: user, action: 'activate'})
      .then(response => response.data);
  }
}
