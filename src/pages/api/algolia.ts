import { PrismaClient } from "@prisma/client";
import algoliasearch from "algoliasearch";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const apiSecret = req.headers['x-api-secret'];
  if (apiSecret !== process.env.NEXT_PUBLIC_API_SECRET) {
    res.status(401).json({ message: 'Unauthorized' });
  }
  const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APPID || "", process.env.NEXT_PUBLIC_ALGOLIA_ADMINSECRET || "");
  const index = client.initIndex('anime_gallery');

  const products = await prisma.product.findMany({
    select: {
      id: true,
      product_name: true,
      image_url: true
    }
  })

  // rename key
  products.map((p) => Object.assign(p, { objectID: p.id })['id']);

  const d = new Date();
  d.setDate(d.getDate() - 1)

  const checkProduct = await prisma.product.findMany({
    where: {
      publishedAt: {
        gte: d
      }
    }
  });

  if (checkProduct) {
    await index
      .saveObjects(products)
      .then(({ objectIDs, taskIDs }) => {
        console.log(objectIDs);
        console.log(taskIDs);
      })
      .catch(err => {
        console.log(err);
      });
  }


  res.json(products);
}