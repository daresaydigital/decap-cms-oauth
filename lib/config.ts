export type Provider = "github" | "gitlab" | "azure";
export const providers: Provider[] = ["github", "gitlab", "azure"];
import dotenv from "dotenv"

dotenv.config();

export const config = (provider: Provider) => {
  if (!providers.includes(provider)) {
    throw new Error(`Unsupported provider ${provider}`);
  }
  return {
    client: client[provider],
    auth: auth[provider],
  };
};

const auth: Record<
  Provider,
  { tokenHost: string; tokenPath: string; authorizePath: string }
> = {
  github: {
    tokenHost: "https://github.com",
    tokenPath: "/login/oauth/access_token",
    authorizePath: "/login/oauth/authorize",
  },
  gitlab: {
    tokenHost: "https://gitlab.com",
    tokenPath: "/oauth/token",
    authorizePath: "/oauth/authorize",
  },
  azure: { 
    tokenHost: "https://login.microsoftonline.com",
    tokenPath: `/${process.env.OAUTH_AZURE_TENANT_ID}/oauth2/v2.0/token`,
    authorizePath: `/${process.env.OAUTH_AZURE_TENANT_ID}/oauth2/v2.0/authorize`,
  },
};

const client: Record<Provider, { id: string; secret: string }> = {
  github: {
    id: process.env.OAUTH_GITHUB_CLIENT_ID as string,
    secret: process.env.OAUTH_GITHUB_CLIENT_SECRET as string,
  },
  gitlab: {
    id: process.env.OAUTH_GITLAB_CLIENT_ID as string,
    secret: process.env.OAUTH_GITLAB_CLIENT_SECRET as string,
  },
  azure: { // Add Azure Entra client ID and secret
    id: process.env.OAUTH_AZURE_CLIENT_ID as string,
    secret: process.env.OAUTH_AZURE_CLIENT_SECRET as string,
  }
};