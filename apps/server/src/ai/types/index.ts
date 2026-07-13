import { z } from 'zod';

export const AgentStateSchema = z.object({
  messages: z.array(z.any()),
  sender: z.string().optional(),
  next: z.string().optional(),
  context: z.record(z.string(), z.any()).optional(),
});

export type AgentState = z.infer<typeof AgentStateSchema>;

export const IncidentTriageOutputSchema = z.object({
  severity: z.enum(['critical', 'high', 'medium', 'low']),
  affected_services: z.array(z.string()),
  recommended_actions: z.array(z.string()),
});

export const NetworkMonitorOutputSchema = z.object({
  status: z.enum(['healthy', 'degraded', 'critical']),
  anomalies_detected: z.array(z.string()),
  predicted_outages: z.array(z.string()),
});
