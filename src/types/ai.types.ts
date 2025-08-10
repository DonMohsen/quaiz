export interface ChatMessage {
  role: Role;
  content: string;
}

export interface AnsweringAIRequest {
  stream:boolean
  prompt: string;
  doc: string;
  history: ChatMessage[];
}
export type Role = "user" | "system" | "assistant";
