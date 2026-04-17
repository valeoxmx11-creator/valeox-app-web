export interface WhatsAppClient {
  sendMessage(params: { to: string; body: string }): Promise<void>;
}
