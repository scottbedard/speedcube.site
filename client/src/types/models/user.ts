import { PuzzleConfig } from './puzzle-config';

export interface UserModel {
  activatedAt: string,
  createdAt: string,
  createdIpAddress: string,
  deletedAt: string | null,
  email: string,
  id: number,
  isActivated: boolean,
  isGuest: number,
  isSuperuser: number,
  lastIpAddress: string,
  lastLogin: string,
  lastSeen: string | null,
  name: string | null,
  permissions: null,
  puzzleConfigs: PuzzleConfig[],
  surname: string | null,
  updatedAt: string,
  username: string,
}