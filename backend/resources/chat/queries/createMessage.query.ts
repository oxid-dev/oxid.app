/**
 * Create a new message in the database
 * Will use Tauri SQL plugin when implemented
 */
export async function createMessageQuery(data: {
  content: string;
  chatId: string;
  createdAt: Date;
}) {
  // TODO: Implement with Tauri SQL
  // const db = await Database.load('sqlite:app.db');
  // return db.execute('INSERT INTO messages...');
  
  // For now, return hardcoded response
  return {
    id: 'msg-' + Date.now(),
    content: data.content,
    chatId: data.chatId,
    createdAt: data.createdAt,
    role: 'user' as const
  };
}