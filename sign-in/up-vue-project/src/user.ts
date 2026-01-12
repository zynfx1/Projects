export interface userAcc {
  id: number;
  name: string;
  email: string;
  password: string;

  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}
