import { Task, OrchestratorInput } from '../core/types';
import { v4 as uuidv4 } from 'uuid';
import { ChatOpenAI } from '@langchain/openai';

export class Planner {
  private llm: ChatOpenAI;

  constructor() {
    this.llm = new ChatOpenAI({
      modelName: 'gpt-4o',
      temperature: 0,
    });
  }

  /**
   * Translates the orchestrator input into a list of actionable tasks assigned to agents.
   */
  async plan(input: OrchestratorInput): Promise<Task[]> {
    const query = input.query.toLowerCase();
    const tasks: Task[] = [];

    if (query.includes('incident') || query.includes('outage') || query.includes('down')) {
      tasks.push({
        id: uuidv4(),
        description: `Triage reported incident: ${input.query}`,
        agent: 'incident_triage',
        status: 'pending',
        inputData: input,
      });
    }

    if (query.includes('network') || query.includes('latency') || query.includes('speed')) {
      tasks.push({
        id: uuidv4(),
        description: `Analyze network performance for: ${input.query}`,
        agent: 'network_monitoring',
        status: 'pending',
        inputData: input,
      });
    }

    if (query.includes('bill') || query.includes('invoice') || query.includes('charge')) {
      tasks.push({
        id: uuidv4(),
        description: `Audit billing records related to: ${input.query}`,
        agent: 'billing_intelligence',
        status: 'pending',
        inputData: input,
      });
    }

    if (query.includes('customer') || query.includes('user') || query.includes('support')) {
      tasks.push({
        id: uuidv4(),
        description: `Review customer support history for: ${input.query}`,
        agent: 'customer_support',
        status: 'pending',
        inputData: input,
      });
    }

    // Default to executive copilot if no specific domain is detected
    if (tasks.length === 0 || query.includes('summary') || query.includes('report')) {
      tasks.push({
        id: uuidv4(),
        description: `Generate strategic summary for: ${input.query}`,
        agent: 'executive_copilot',
        status: 'pending',
        inputData: input,
      });
    }

    return tasks;
  }
}
