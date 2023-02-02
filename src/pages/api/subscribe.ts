import { stripe } from "@/services/stripe";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const nextAuthSession = await getSession({ req });

    const stripeCustomer = await stripe.customers.create({
      email: nextAuthSession?.user?.email as string | undefined,
    });

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer?.id,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        {
          price: "price_1KehjNHFN0RR7SYUHse6Feji",
          quantity: 1,
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return res.status(200).json({ session: stripeCheckoutSession });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};
