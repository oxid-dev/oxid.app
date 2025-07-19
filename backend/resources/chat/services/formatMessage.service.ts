/**
 * Format message content
 * Handles any processing before saving to database
 */
export async function formatMessageContent(content: string): Promise<string> {
  // For now, just trim whitespace
  // In the future, could handle:
  // - Markdown processing
  // - Link parsing
  // - Code block detection
  
  return content.trim();
}