import prisma from "@/lib/prisma/prisma";
import { productCardSelect } from "@/lib/prisma/selects";
import { NextRequest, NextResponse } from "next/server";

// product search route
export async function POST(req: NextRequest) {
  const { value } = await req.json();

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: value, mode: "insensitive" } },
        { brand: { contains: value, mode: "insensitive" } },
      ],
    },
    select: productCardSelect,
  });

  return NextResponse.json(products, { status: 200 });
}
