import { BaseAgent, MemoryProvider } from '../core/BaseAgent';
import { Task, AgentResponse } from '../core/types';
import { DynamicStructuredTool } from '@langchain/core/tools';
import { ChatOpenAI } from '@langchain/openai';
import { fetchCustomerBillingTool, escalateToHumanTool } from '../tools';
import { agentSystemPromptTemplate } from '../prompts';

class InMemoryProvider implements MemoryProvider {
  private memory = new Map<string, any>();
  get(key: string) { return this.memory.get(key); }
  set(key: string, value: any) { this.memory.set(key, value); }
  clear() { this.memory.clear(); }
}

export class CustomerSupportAgent extends BaseAgent {
  private memoryProvider = new InMemoryProvider();
  private llm: ChatOpenAI;

  constructor() {
    super('CustomerSupportAgent');
    this.llm = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      temperature: 0.7, // Higher temp for more natural language generation
    });
  }

  validate(input: any): boolean {
    return !!input; 
  }

  think(context: any): string {
    return `[${this.agentName}] Evaluating customer intent and history: ${JSON.stringify(context)}`;
  }

  tools(): any[] {
    return [fetchCustomerBillingTool, escalateToHumanTool];
  }

  memory(): MemoryProvider {
    return this.memoryProvider;
  }

  async execute(task: Task): Promise<AgentResponse> {
    try {
      this.memoryProvider.set('lastTask', task.id);
      
      const systemMessage = agentSystemPromptTemplate
        .replace('{role}', 'Customer Support Representative')
        .replace('{capabilities}', 'Answer telecom questions, review history, and generate customer-friendly responses.');

      // Mocking execution logic
      const resultData = {
        intent: 'billing_inquiry',
        generated_response: 'Hello! I see you have a question about your recent invoice. Let me break down the international roaming charges for you.',
        escalation_required: false,
      };

      return {
        success: true,
        data: resultData,
        reasoning: this.think(task.inputData),
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  }
}
