import { BaseAgent, MemoryProvider } from '../core/BaseAgent';
import { Task, AgentResponse } from '../core/types';
import { DynamicStructuredTool } from '@langchain/core/tools';
import { ChatOpenAI } from '@langchain/openai';
import { z } from 'zod';
import { queryActiveIncidentsTool, suggestMitigationTool } from '../tools';
import { agentSystemPromptTemplate } from '../prompts';

class InMemoryProvider implements MemoryProvider {
  private memory = new Map<string, any>();
  get(key: string) { return this.memory.get(key); }
  set(key: string, value: any) { this.memory.set(key, value); }
  clear() { this.memory.clear(); }
}

export class IncidentTriageAgent extends BaseAgent {
  private memoryProvider = new InMemoryProvider();
  private llm: ChatOpenAI;

  constructor() {
    super('IncidentTriageAgent');
    this.llm = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      temperature: 0,
    });
  }

  validate(input: any): boolean {
    return !!input; // Basic validation
  }

  think(context: any): string {
    return `[${this.agentName}] Analyzing incident context: ${JSON.stringify(context)}`;
  }

  tools(): any[] {
    return [queryActiveIncidentsTool, suggestMitigationTool];
  }

  memory(): MemoryProvider {
    return this.memoryProvider;
  }

  async execute(task: Task): Promise<AgentResponse> {
    try {
      this.memoryProvider.set('lastTask', task.id);
      
      const systemMessage = agentSystemPromptTemplate
        .replace('{role}', 'Incident Triage Specialist')
        .replace('{capabilities}', 'Analyze incoming incidents, detect severity, and suggest root cause mitigations.');

      // Mocking execution logic that would normally use createReactAgent or invoke LLM
      const resultData = {
        severity: 'high',
        affected_services: ['Network-Node-4', 'Billing-API'],
        recommended_actions: ['Isolate Node-4', 'Scale Billing API instances'],
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
