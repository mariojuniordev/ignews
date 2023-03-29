import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/router";

interface ActiveLinkProps extends LinkProps {
  children: ReactNode | JSX.Element;
  activeClassName: string;
}

export function ActiveLink({
  children,
  activeClassName,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  return (
    <Link {...rest} className={asPath === rest.href ? activeClassName : ""}>
      {children}
    </Link>
  );
}
