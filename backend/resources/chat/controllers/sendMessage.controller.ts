import { createMessageQuery } from '#backend/resources/chat/queries/createMessage.query';
import { formatMessageContent } from '#backend/resources/chat/services/formatMessage.service';

/**
 * Send a new message in a chat
 * This runs in the WebView process (same as UI)
 */
export async function sendMessage(content: string, chatId: string) {
  // Apply any formatting/processing if needed
  const formatted = await formatMessageContent(content);
  
  // Save to database
  const message = await createMessageQuery({
    content: formatted,
    chatId,
    createdAt: new Date()
  });
  
  return message;
}