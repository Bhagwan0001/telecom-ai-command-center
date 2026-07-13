import { MemorySaver } from '@langchain/langgraph';

// In a production environment, this would be replaced with PostgresSaver or RedisSaver
// to ensure persistence across server restarts.
export const checkpointer = new MemorySaver();
