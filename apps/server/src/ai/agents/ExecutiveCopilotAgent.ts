import { BaseAgent, MemoryProvider } from '../core/BaseAgent';
import { Task, AgentResponse } from '../core/types';
import { DynamicStructuredTool } from '@langchain/core/tools';
import { ChatOpenAI } from '@langchain/openai';
import { generateKpiSummaryTool } from '../tools';
import { agentSystemPromptTemplate } from '../prompts';

class InMemoryProvider implements MemoryProvider {
  private memory = new Map<string, any>();
  get(key: string) { return this.memory.get(key); }
  set(key: string, value: any) { this.memory.set(key, value); }
  clear() { this.memory.clear(); }
}

export class ExecutiveCopilotAgent extends BaseAgent {
  private memoryProvider = new InMemoryProvider();
  private llm: ChatOpenAI;

  constructor() {
    super('ExecutiveCopilotAgent');
    this.llm = new ChatOpenAI({
      modelName: 'gpt-4o', // Typically uses the most capable model
      temperature: 0.2,
    });
  }

  validate(input: any): boolean {
    return !!input; 
  }

  think(context: any): string {
    return `[${this.agentName}] Synthesizing executive summary based on: ${JSON.stringify(context)}`;
  }

  tools(): any[] {
    return [generateKpiSummaryTool];
  }

  memory(): MemoryProvider {
    return this.memoryProvider;
  }

  async execute(task: Task): Promise<AgentResponse> {
    try {
      this.memoryProvider.set('lastTask', task.id);
      
      const systemMessage = agentSystemPromptTemplate
        .replace('{role}', 'Executive Copilot')
        .replace('{capabilities}', 'Generate executive summaries, daily reports, KPI explanations, and business insights.');

      // Mocking execution logic
      const resultData = {
        summary: 'Network stability remained at 99.98% today despite a brief incident on Node-12.',
        key_insights: ['Customer satisfaction improved slightly.', 'Billing API requires scaling during peak hours.'],
        recommended_strategic_actions: ['Allocate budget for Edge Switch upgrades in Q3.'],
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
