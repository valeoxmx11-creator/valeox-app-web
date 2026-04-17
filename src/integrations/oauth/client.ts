export interface OAuthClient {
  getAuthorizationUrl(state: string): Promise<string>;
  exchangeCode(code: string): Promise<{ accessToken: string; providerUserId: string }>;
}
