import {
  HeadphoneDetails,
  LaptopDetails,
  MonitorDetails,
  Prisma,
  TabletDetails,
} from "@prisma/client";

export type Specification = "monitor" | "headphone" | "laptop" | "tablet";

export interface QueryType {
  category: string;
  brand?: string;
  price: { gte: number; lte: number };
  description: {
    contains: string;
  };
  OR?: undefined | any[];
  AND?: undefined | any[];
  monitor?: MonitorDetails | {};
  headphone?: HeadphoneDetails | {};
  laptop?: LaptopDetails | {};
  tablet?: TabletDetails | {};
}

export type SortReturnValue =
  | Prisma.ProductOrderByWithRelationInput
  | undefined;
