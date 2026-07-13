import { Task } from '../core/types';
import { ChatOpenAI } from '@langchain/openai';

export class Aggregator {
  private llm: ChatOpenAI;

  constructor() {
    this.llm = new ChatOpenAI({
      modelName: 'gpt-4o',
      temperature: 0,
    });
  }

  /**
   * Synthesizes the results of all completed tasks into a final cohesive string.
   */
  async aggregate(query: string, tasks: Task[]): Promise<string> {
    // to generate a cohesive summary. For this demonstration, we'll format it programmatically.
    
    let summary = `Final Report for Query: "${query}"\n\n`;
    
    tasks.forEach(task => {
      summary += `--- Task: ${task.description} (Agent: ${task.agent}) ---\n`;
      if (task.status === 'completed') {
        summary += `Status: Success\nResult:\n${JSON.stringify(task.result, null, 2)}\n\n`;
      } else {
        summary += `Status: ${task.status.toUpperCase()}\nError:\n${task.result}\n\n`;
      }
    });

    summary += `Aggregation complete. All sub-agents have reported back.`;
    return summary;
  }
}
