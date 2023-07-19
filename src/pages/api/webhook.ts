import Stripe from 'stripe';
import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import { prisma } from '@/server/db';
import Cors from 'micro-cors';

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_APIKEY as string}`, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

const webhookSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      webhookSecret as string
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    if (err instanceof Error) console.log(err);
    console.log(`❌ Error message: ${errorMessage}`);
    res.status(400).send(`Webhook Error: ${errorMessage}`);
    return;
  }

  console.log("✅ Success:", event.id);

  if (event.type === "checkout.session.completed") {
    const sessionResponse = event.data.object as Stripe.Checkout.Session;

    const session = await stripe.checkout.sessions.retrieve(
      sessionResponse.id, {
      expand: ['payment_intent', 'line_items']
    }
    );

    const products = JSON.parse(session.metadata?.productId as string);
    const description = session.metadata?.description;
    const paymentIntent = session.payment_intent as Stripe.PaymentIntent;
    const totalAmount = paymentIntent.amount / 100;
    const status = paymentIntent.status;
    const email = paymentIntent.receipt_email as string;

    console.log(products)

    const order = await prisma.order.create({
      data: {
        user: { connect: { email } },
        description,
        total_amount: totalAmount,
        status
      }
    })

    if (order) {
      products.map(async (product: string) => {
        await prisma.orderItem.createMany({
          data: [
            {
              order_id: order.id,
              product_id: product
            },
          ]
        })
      })
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    console.log(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
    );
  }

  res.send('ok');
}

export default cors(handle as any);