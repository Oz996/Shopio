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

export type OrderReturnType =
  | {
      error: string;
      success?: undefined;
    }
  | {
      success: boolean;
      error?: undefined;
    }
  | undefined;
