import { api } from "@/services/api";
import { getStripeJs } from "@/services/stripe-js";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import styles from "./styles.module.scss";

export function SubscribeButton() {
  const { data: sessionData } = useSession();

  const router = useRouter();

  async function handleSubscribe() {
    if (!sessionData) {
      signIn("github");
      return;
    }

    // @ts-ignore
    if (sessionData?.activeSubscription) {
      router.push("/posts");

      return;
    }

    try {
      const { data } = await api.post("/subscribe");

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
