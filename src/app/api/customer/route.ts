import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, email, phone, address, userId } = await request.json();

  try {
    await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        address,
        userId,
      },
    });
    return NextResponse.json({ message: "Customer created successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: 500 }
    );
  }
}

// export async function DELETE(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const userId = searchParams.get("id");

//   try {
//     await prisma.customer.delete({
//       where: {
//         id: userId as string,
//       },
//     });
//     return NextResponse.json({ message: "Customer deleted successfully" });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to Delete customer" },
//       { status: 500 }
//     );
//   }
// }
