import { type NextApiRequest, type NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_APIKEY as string}`, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const items = req.body;
  console.log(JSON.stringify(items))
  console.log(req.headers.origin);
  if (req.method === 'POST') {
    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ["card"],
        // shipping_options: [
        //   {
        //     shipping_rate_data: {
        //       type: "fixed_amount",
        //       fixed_amount: { amount: 2000, currency: "usd" },
        //       display_name: "Free shipping",
        //       delivery_estimate: {
        //         minimum: { unit: "business_day", value: 5 },
        //         maximum: { unit: "business_day", value: 7 },
        //       },
        //     },
        //   },
        // ],
        line_items: items,
        mode: "payment",
        success_url: `${req.headers.origin as string}/success`,
        cancel_url: `${req.headers.origin as string}`,
      };

      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}