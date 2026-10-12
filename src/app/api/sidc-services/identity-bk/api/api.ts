export * from './identity.service';
import { IdentityService } from './identity.service';
export * from './role.service';
import { RoleService } from './role.service';
export const APIS = [IdentityService, RoleService];
