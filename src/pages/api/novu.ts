import { Novu } from '@novu/node';
import type { NextApiRequest, NextApiResponse } from 'next';

const novu = new Novu(process.env.NOVU_API_SECRET as string);

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {email, product_name, ...rest} = req.body;
  const { data } = await novu.trigger('gallery-admin-notification', {
    to: [
      {
        subscriberId: '63b5396c4d8a4960a1f430bf',
        email: email,
      },
    ],
    payload: {
      product_name: product_name,
      organization: {
        logo: 'https://happycorp.com/logo.png',
      },
      products: {
        ...rest
      }
    },
  });
  res.json(data);
}