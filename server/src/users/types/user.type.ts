export type User = {
  id: string;
  username: string;
  email: string;
  name: string | null;
  password: string;
  picture: string;
  googleAccessToken: string | null;
  googleRefreshToken: string | null;
  createdAt: string;
};
