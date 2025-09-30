export class CreateUserDto {
  userId: string;
  username: string;
  email: string;
  password: string;
  picture: string;
  googleAccessToken: string | null;
  googleRefreshToken: string | null;
}
