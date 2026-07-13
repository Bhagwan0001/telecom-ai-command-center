import { AgentsRepository } from './agents.repository';
import { AgentInfo } from './agents.types';

export class AgentsService {
  constructor(private agentsRepository: AgentsRepository) {}

  async listAgents(): Promise<AgentInfo[]> {
    return this.agentsRepository.getAgents();
  }
}
