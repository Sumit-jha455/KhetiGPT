/**
 * assistantService.js
 * Mock service layer for the AI Assistant page. It simulates an API round
 * trip (short delay) and returns a reply produced by the local rule engine.
 * The real Gemini integration will replace the body of sendMessage() later.
 */

// Import the local keyword based reply builder
import { buildAssistantReply, ASSISTANT_GREETING } from "../data/mockAssistant";
// Import the shared delay helper so the UI can show a typing indicator
import { simulateNetworkDelay } from "./api";

/**
 * sendAssistantMessage - accepts a user message and resolves with an
 * assistant message object after a simulated delay.
 */
export async function sendAssistantMessage(message) {
  // Wait briefly to imitate network + model latency
  await simulateNetworkDelay(700);
  // Return the locally generated reply (no external API call)
  return buildAssistantReply(message);
}

// Export the greeting so the page can seed the conversation
export { ASSISTANT_GREETING };
