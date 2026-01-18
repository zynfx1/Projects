export interface userAcc {
  id: number;
  name: string;
  email: string;
  password: string;

  newEmail?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}
