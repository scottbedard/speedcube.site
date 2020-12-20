import { Config } from './config';
import { KeyboardConfig } from './keyboard-config';

export interface UserModel {
  activatedAt: string,
  activeConfigs: Config[],
  createdAt: string,
  createdIpAddress: string,
  deletedAt: string | null,
  email: string,
  id: number,
  isActivated: boolean,
  isGuest: number,
  isSuperuser: number,
  keyboardConfigs: KeyboardConfig[],
  lastIpAddress: string,
  lastLogin: string,
  lastSeen: string | null,
  name: string | null,
  permissions: null,
  surname: string | null,
  updatedAt: string,
  username: string,
}