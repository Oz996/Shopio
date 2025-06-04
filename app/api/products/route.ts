import prisma from "@/lib/prisma/prisma";
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
  });

  return NextResponse.json(products, { status: 200 });
}
