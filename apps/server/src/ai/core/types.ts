import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.string(),
  description: z.string(),
  agent: z.enum([
    'incident_triage',
    'network_monitoring',
    'billing_intelligence',
    'customer_support',
    'executive_copilot',
  ]),
  status: z.enum(['pending', 'in_progress', 'completed', 'failed']),
  dependencies: z.array(z.string()).optional(),
  inputData: z.any().optional(),
  result: z.any().optional(),
});

export type Task = z.infer<typeof TaskSchema>;

export const AgentResponseSchema = z.object({
  success: z.boolean(),
  data: z.any(),
  error: z.string().optional(),
  reasoning: z.string().optional(),
});

export type AgentResponse = z.infer<typeof AgentResponseSchema>;

export const OrchestratorInputSchema = z.object({
  query: z.string(),
  context: z.record(z.string(), z.any()).optional(),
});

export type OrchestratorInput = z.infer<typeof OrchestratorInputSchema>;

export const OrchestratorOutputSchema = z.object({
  success: z.boolean(),
  finalAnswer: z.string(),
  tasks: z.array(TaskSchema),
  executionTimeMs: z.number(),
});

export type OrchestratorOutput = z.infer<typeof OrchestratorOutputSchema>;
