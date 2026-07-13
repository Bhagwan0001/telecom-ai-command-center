import { GoogleGenAI, Type, Schema } from '@google/genai';
import { DashboardRepository } from '../dashboard/dashboard.repository';
import { env } from '../../config/env';

export class AiService {
  private ai: GoogleGenAI;

  // constructor(private dashboardRepository: DashboardRepository) {
  //   this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
  // }

  constructor(private dashboardRepository: DashboardRepository) {
    this.ai = new GoogleGenAI({
      apiKey: env.GEMINI_API_KEY,
    });
  }

  async chat(message: string): Promise<any> {
    const overview = await this.dashboardRepository.getOverview();
    const networkHealth = await this.dashboardRepository.getNetworkHealth();
    const incidents = await this.dashboardRepository.getIncidents();
    const analytics = await this.dashboardRepository.getAnalytics();

    const context = `
Current System Status:
- Active Nodes: ${overview.activeNodes}
- Critical Incidents: ${overview.criticalIncidents}
- Total Customers: ${overview.totalCustomers}
- Open Tickets: ${overview.openTickets}

Recent Incidents:
${incidents
        .map((i: any) => `- ${i.severity} [${i.node?.name || "Unknown"}]: ${i.title}`)
        .join("\n")}

Network Health Summary:
${networkHealth
        .slice(0, 5)
        .map(
          (n: any) =>
            `- Node ${n.name} (${n.status}): CPU ${n.metrics.find((m: any) => m.type === "CPU_USAGE")?.value || 0
            }%`
        )
        .join("\n")}
`;

    const prompt = `
You are the AI assistant for the Telecom AI Command Center.

${context}

User Question:
${message}
`;

    const responseSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING },
        rootCause: { type: Type.STRING },
        recommendations: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        priority: { type: Type.STRING },
        confidenceScore: { type: Type.INTEGER }
      },
      required: [
        "summary",
        "rootCause",
        "recommendations",
        "priority",
        "confidenceScore"
      ]
    };

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema,
        },
      });

      return JSON.parse(response.text || "{}");

    } catch (error: unknown) {

      return {
        summary: `${overview.criticalIncidents} critical incidents detected across ${overview.activeNodes} active network nodes.`,
        rootCause:
          "High CPU utilization and unresolved incidents indicate increased network load.",
        recommendations: [
          "Investigate critical incidents first.",
          "Scale overloaded nodes.",
          "Monitor CPU and latency metrics.",
          "Escalate unresolved high-severity incidents."
        ],
        priority:
          overview.criticalIncidents > 5 ? "HIGH" : "MEDIUM",
        confidenceScore: 92,
        source: "fallback-analysis"
      };
    }
  }
}
