import { api } from "@/services/api";
import { getStripeJs } from "@/services/stripe-js";
import { useSession, signIn } from "next-auth/react";
import Stripe from "stripe";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

interface StripeResponseData {
  session: Stripe.Response<Stripe.Checkout.Session>;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data } = useSession();

  async function handleSubscribe() {
    if (!data) {
      signIn("github");
      return;
    }

    try {
      const { data } = await api.post<StripeResponseData>("/subscribe");

      const { session } = data;

      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({ sessionId: session?.id });
    } catch (err) {
      alert(err);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}
