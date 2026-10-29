import { StringMapWithRename } from "@angular/compiler/src/compiler_facade_interface";
import { Role } from "./role";
import { UserApplication } from "./app-access";

export class User {
  id?: string;
  userName?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  employeeCode?: string;
  email?: string;
  roles?: Role[];
  isVerified?: boolean;
  jwToken?: string;
  applicant?: any;
  profilePicture?: string;
  branch?: string;
  warehouse?: string;
  mustChangePassword?: boolean;
  applications?: UserApplication[];
}