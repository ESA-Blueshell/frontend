import type SimpleUser from "@/models/user/SimpleUser";
import type {Role} from "@/models/enums/Role";
import type Membership from "@/models/Membership";
import { MemberType } from "@/models/enums/MemberType.ts"

export default interface AdvancedUser extends SimpleUser {
  initials?: string;
  roles?: Role[];
  dateOfBirth?: string;
  phoneNumber?: string;
  postalCode?: string;
  address?: string;
  city?: string;
  country?: string;
  nationality?: string;
  signature?: File;
  membership?: Membership;
  newsletter?: boolean;
  photoConsent?: boolean;
  ehbo?: boolean;
  bhv?: boolean;
  enabled?: boolean;
  incasso?: boolean;
  memberType?: MemberType;
  createdAt?: string;
  gender?: string;
  study?: string;
  studentNumber?: string;
  password?: string;
}
