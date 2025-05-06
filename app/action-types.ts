export type ReviewReturnType =
  | {
      errors: {
        message: string;
      }[];
      data: string;
      success?: undefined;
    }
  | {
      success: boolean;
      errors?: undefined;
      data?: undefined;
    }
  | undefined;
