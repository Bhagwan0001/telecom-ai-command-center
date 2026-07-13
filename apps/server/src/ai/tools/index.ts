import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { logger } from '@taicc/logger';

// --- Incident Tools ---
export const queryActiveIncidentsTool = new DynamicStructuredTool({
  name: 'query_active_incidents',
  description: 'Fetches currently active network and system incidents.',
  schema: z.object({
    severity: z.enum(['critical', 'high', 'medium', 'low']).optional(),
  }),
  func: async ({ severity }) => {
    logger.info(`AI Tool execution: query_active_incidents (${severity})`);
    // Simulated DB query
    return JSON.stringify([
      { id: 'INC-4819', severity: 'critical', node: 'Tower-North-Node4', status: 'Investigating' },
    ]);
  },
});

export const suggestMitigationTool = new DynamicStructuredTool({
  name: 'suggest_mitigation',
  description: 'Provides AI-generated mitigation steps for a specific node failure.',
  schema: z.object({
    nodeId: z.string(),
    errorType: z.string(),
  }),
  func: async ({ nodeId, errorType }) => {
    logger.info(`AI Tool execution: suggest_mitigation (${nodeId}, ${errorType})`);
    return `Mitigation for ${nodeId} (${errorType}): Reboot core switch, failover to regional backup router.`;
  },
});

// --- Network Tools ---
export const fetchRegionalKpisTool = new DynamicStructuredTool({
  name: 'fetch_regional_kpis',
  description: 'Fetches regional Key Performance Indicators for the telecom network.',
  schema: z.object({
    region: z.string(),
  }),
  func: async ({ region }) => {
    logger.info(`AI Tool execution: fetch_regional_kpis (${region})`);
    return JSON.stringify({ uptime: '99.98%', packetLoss: '0.01%', activeSubscribers: 450000 });
  },
});

// --- Customer Support Tools ---
export const fetchCustomerBillingTool = new DynamicStructuredTool({
  name: 'fetch_customer_billing',
  description: 'Retrieves billing history for a customer.',
  schema: z.object({
    customerId: z.string(),
  }),
  func: async ({ customerId }) => {
    logger.info(`AI Tool execution: fetch_customer_billing (${customerId})`);
    return JSON.stringify({ status: 'Overdue', amount: 145.20, dueDate: '2026-10-15' });
  },
});

export const escalateToHumanTool = new DynamicStructuredTool({
  name: 'escalate_to_human',
  description: 'Escalates the current conversation to a human support agent.',
  schema: z.object({
    reason: z.string(),
  }),
  func: async ({ reason }) => {
    logger.info(`AI Tool execution: escalate_to_human (${reason})`);
    return 'Escalation ticket created successfully. A human agent will respond shortly.';
  },
});

// --- Executive Tools ---
export const generateKpiSummaryTool = new DynamicStructuredTool({
  name: 'generate_kpi_summary',
  description: 'Generates a high-level executive summary of today\'s operations.',
  schema: z.object({
    date: z.string().optional(),
  }),
  func: async () => {
    logger.info(`AI Tool execution: generate_kpi_summary`);
    return 'Summary: All core systems operational. CSAT increased by 1.5%. 1 Critical incident mitigated automatically.';
  },
});
