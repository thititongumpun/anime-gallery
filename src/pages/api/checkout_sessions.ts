import { authOptions } from "@/server/auth";
import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import Stripe from "stripe";

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_APIKEY as string}`, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2023-08-16",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  const { line_items, productId, description } = req.body;
  if (req.method === 'POST') {
    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ["card"],
        metadata: {
          products: JSON.stringify(line_items.map((item: any) => item.price_data.product_data)),
          description: description,
          productId: JSON.stringify(productId)
        },
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
        line_items: line_items,
        mode: "payment",
        customer_email: session?.user.email as string,
        success_url: `${req.headers.origin as string}/order`,
        cancel_url: `${req.headers.origin as string}`,
        locale: "th",
      };

      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params);

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