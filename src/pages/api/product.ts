import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient()

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const apiSecret = req.headers['x-api-secret'];
  if (apiSecret !== process.env.NEXT_PUBLIC_API_SECRET) {
    res.status(401).json({ message: 'Unauthorized' });
  }
  const d = new Date();
  d.setDate(d.getDate() - 1)

  const products = await prisma.product.updateMany({
    where: {
      publishedAt: {
        lte: d
      }
    },
    data: {
      is_new: false
    }
  })
  res.json(products);
}