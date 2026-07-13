import { Task, AgentResponse } from './types';
import { DynamicStructuredTool } from '@langchain/core/tools';

export interface MemoryProvider {
  get(key: string): any;
  set(key: string, value: any): void;
  clear(): void;
}

export abstract class BaseAgent {
  public readonly agentName: string;

  constructor(agentName: string) {
    this.agentName = agentName;
  }

  /**
   * Executes the given task.
   */
  abstract execute(task: Task): Promise<AgentResponse>;

  /**
   * Validates if the task input is sufficient for this agent to run.
   */
  abstract validate(input: any): boolean;

  /**
   * Returns a log of the agent's internal reasoning for the task.
   */
  abstract think(context: any): string;

  /**
   * Returns the LangChain tools specific to this agent.
   */
  abstract tools(): any[];

  /**
   * Returns the memory context manager for this agent.
   */
  abstract memory(): MemoryProvider;
}
