export type AuthProvider = "email" | "github" | "google";

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  data?: {
    token: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
}

/**
 * Sign in with email and password
 * @param credentials Email and password
 * @returns Auth response
 */
export async function signInWithEmail(
  credentials: AuthCredentials
): Promise<AuthResponse> {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          token: "mock-token",
          user: {
            id: "1",
            email: credentials.email,
            name: "User",
          },
        },
      });
    }, 1000);
  });
}

/**
 * Sign in with OAuth provider
 * @param provider OAuth provider (github, google)
 * @returns Auth response
 */
export async function signInWithOAuth(
  provider: "github" | "google"
): Promise<AuthResponse> {
  // TODO: Replace with actual OAuth implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          token: "mock-oauth-token",
          user: {
            id: "1",
            email: `user@${provider}.com`,
            name: "OAuth User",
          },
        },
      });
    }, 1500);
  });
}
