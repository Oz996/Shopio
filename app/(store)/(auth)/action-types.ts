export type AuthenticateReturnType =
  | { error: string; data?: string }
  | undefined;

export type SignUpReturnType =
  | {
      errors: { message: string }[];
      data: { email: string; password: string; cPassword: string };
    }
  | undefined;
