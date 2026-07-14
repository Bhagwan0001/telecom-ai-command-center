import { prisma } from '../../prisma/client';

export class DashboardRepository {
  async getOverview() {
    try {
      const [activeNodes, criticalIncidents, totalCustomers, openTickets] = await Promise.all([
        prisma.networkNode.count({ where: { status: 'ONLINE' } }),
        prisma.incident.count({ where: { severity: 'CRITICAL', status: { not: 'CLOSED' } } }),
        prisma.customer.count(),
        prisma.supportTicket.count({ where: { status: 'OPEN' } }),
      ]);
      return { activeNodes, criticalIncidents, totalCustomers, openTickets };
    } catch {
      return { activeNodes: 0, criticalIncidents: 0, totalCustomers: 0, openTickets: 0 };
    }
  }

  async getNetworkHealth() {
    try {
      return await prisma.networkNode.findMany({
        select: {
          id: true, name: true, type: true, status: true, region: true,
          metrics: { orderBy: { recordedAt: 'desc' }, take: 5 }
        },
        take: 20
      });
    } catch {
      return [];
    }
  }

  async getIncidents() {
    try {
      return await prisma.incident.findMany({
        where: { status: { not: 'CLOSED' } },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { node: { select: { name: true } } }
      });
    } catch {
      return [];
    }
  }

  async getAnalytics() {
    try {
      return await prisma.dashboardMetric.findMany({
        orderBy: { recordedAt: 'desc' },
        take: 20
      });
    } catch {
      return [];
    }
  }
}
