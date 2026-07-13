import { OrchestratorInput, OrchestratorOutput } from '../core/types';
import { aiPipeline } from './Pipeline';

export class Supervisor {
  /**
   * The public entry point for external services (Express controllers, WebSocket handlers).
   * It receives the raw user request and delegates it to the orchestration pipeline.
   */
  async handleRequest(query: string, context?: Record<string, any>): Promise<OrchestratorOutput> {
    const input: OrchestratorInput = {
      query,
      context,
    };

    return await aiPipeline.run(input);
  }
}

export const supervisorService = new Supervisor();
