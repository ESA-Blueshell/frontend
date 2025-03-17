import type BaseModel from "./BaseModel";
import type ContributionModel from "./ContributionModel";
import type AuthorityModel from "./AuthorityModel";

export enum MemberType {
  ALUMNI='ALUMNI',
  HONORARY='HONORARY',
  REGULAR='REGULAR'
}

export default interface UserModel extends BaseModel {
  username: string;
  firstName: string;
  lastName: string;
  prefix?: string;
  initials?: string;
  address?: string;
  houseNumber?: string;
  postalCode?: string;
  city?: string;
  phoneNumber?: string;
  email: string;
  studentNumber?: string;
  dateOfBirth?: string;
  createdAt: string;
  memberSince: string;
  discord?: string;
  steamid?: string;
  newsletter: boolean;
  enabled: boolean;
  contributionPaid: boolean;
  consentPrivacy: boolean;
  consentGdpr: boolean;
  gender?: string;
  street?: string;
  country?: string;
  photoConsent: boolean;
  nationality?: string;
  study?: string;
  startStudyYear?: number;
  deletedAt?: string;
  onlineSignup?: boolean;
  ehbo?: boolean;
  contactId?: number;
  bhv?: boolean;
  contribution: ContributionModel;
  fullName: string;
  authorities: AuthorityModel[];
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  committees: number[];
  profilePicture: number;
  roles: string[];
  password?: string;
  token?: string;
  memberType?: MemberType;
  incasso?: boolean;
}

