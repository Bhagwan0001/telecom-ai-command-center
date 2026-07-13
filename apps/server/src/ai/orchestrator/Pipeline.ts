import { OrchestratorInput, OrchestratorOutput, Task } from '../core/types';
import { BaseAgent } from '../core/BaseAgent';
import { Planner } from './Planner';
import { TaskQueue } from './TaskQueue';
import { Aggregator } from './Aggregator';
import { IncidentTriageAgent } from '../agents/IncidentTriageAgent';
import { NetworkMonitoringAgent } from '../agents/NetworkMonitoringAgent';
import { BillingIntelligenceAgent } from '../agents/BillingIntelligenceAgent';
import { CustomerSupportAgent } from '../agents/CustomerSupportAgent';
import { ExecutiveCopilotAgent } from '../agents/ExecutiveCopilotAgent';

export class Pipeline {
  private planner: Planner;
  private taskQueue: TaskQueue;
  private aggregator: Aggregator;
  private agents: Map<string, BaseAgent>;

  constructor() {
    // Manual Dependency Injection / Composition Root
    this.planner = new Planner();
    this.taskQueue = new TaskQueue();
    this.aggregator = new Aggregator();
    
    this.agents = new Map();
    this.agents.set('incident_triage', new IncidentTriageAgent());
    this.agents.set('network_monitoring', new NetworkMonitoringAgent());
    this.agents.set('billing_intelligence', new BillingIntelligenceAgent());
    this.agents.set('customer_support', new CustomerSupportAgent());
    this.agents.set('executive_copilot', new ExecutiveCopilotAgent());
  }

  /**
   * The main execution entry point (Supervisor -> Pipeline)
   */
  async run(input: OrchestratorInput): Promise<OrchestratorOutput> {
    const startTime = Date.now();

    try {
      // 1. Plan
      const tasks = await this.planner.plan(input);
      this.taskQueue.initialize(tasks);

      // 2. Execute Queue
      while (!this.taskQueue.isComplete()) {
        const nextTask = this.taskQueue.getNextTask();
        
        if (nextTask) {
          const agent = this.agents.get(nextTask.agent);
          
          if (!agent) {
            this.taskQueue.markFailed(nextTask.id, 'Agent not found');
            continue;
          }

          if (agent.validate(nextTask.inputData)) {
            const response = await agent.execute(nextTask);
            if (response.success) {
              this.taskQueue.markCompleted(nextTask.id, response.data);
            } else {
              this.taskQueue.markFailed(nextTask.id, response.error);
            }
          } else {
            this.taskQueue.markFailed(nextTask.id, 'Validation failed');
          }
        } else {
          // If no tasks are ready but queue is not complete, we might be waiting for async deps.
          // For this synchronous loop implementation, this shouldn't happen unless there's a circular dep.
          // In a real async system, we'd wait/yield here.
          break; 
        }
      }

      // 3. Aggregate
      const allTasks = this.taskQueue.getAllTasks();
      const finalAnswer = await this.aggregator.aggregate(input.query, allTasks);

      const executionTimeMs = Date.now() - startTime;
      
      return {
        success: true,
        finalAnswer,
        tasks: allTasks,
        executionTimeMs,
      };

    } catch (error: any) {
      return {
        success: false,
        finalAnswer: `Orchestration failed: ${error.message}`,
        tasks: this.taskQueue.getAllTasks(),
        executionTimeMs: Date.now() - startTime,
      };
    }
  }
}

// Export a singleton instance for use in controllers
export const aiPipeline = new Pipeline();
