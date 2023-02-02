import { FaGithub } from "react-icons/fa";
import styles from "./styles.module.scss";
import { FiX } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

export function SignInButton() {
  const { status, data } = useSession();

  if (status === "authenticated") {
    return (
      <button
        type="button"
        className={styles.signInButton}
        onClick={() => signOut()}
      >
        <FaGithub color="#04b361" />
        {data?.user?.name}
        <FiX color="#737380" className={styles.closeIcon} />
      </button>
    );
  }

  return (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn("github")}
    >
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}
