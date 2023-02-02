declare namespace NodeJS {
  export interface ProcessEnv {
    STRIPE_API_KEY?: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    FAUNADB_KEY: string;
    STRIPE_SUCCESS_URL: string;
    STRIPE_CANCEL_URL: string;
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: string;
  }
}
