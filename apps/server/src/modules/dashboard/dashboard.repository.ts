import { prisma } from '../../prisma/client';

export class DashboardRepository {
  async getOverview() {
    const activeNodes = await prisma.networkNode.count({ where: { status: 'ONLINE' } });
    const criticalIncidents = await prisma.incident.count({ where: { severity: 'CRITICAL', status: { not: 'CLOSED' } } });
    const totalCustomers = await prisma.customer.count();
    const openTickets = await prisma.supportTicket.count({ where: { status: 'OPEN' } });

    return { activeNodes, criticalIncidents, totalCustomers, openTickets };
  }

  async getNetworkHealth() {
    const nodes = await prisma.networkNode.findMany({
      select: {
        id: true, name: true, type: true, status: true, region: true,
        metrics: {
          orderBy: { recordedAt: 'desc' },
          take: 5
        }
      },
      take: 20
    });
    return nodes;
  }

  async getIncidents() {
    return prisma.incident.findMany({
      where: { status: { not: 'CLOSED' } },
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { node: { select: { name: true } } }
    });
  }

  async getAnalytics() {
    return prisma.dashboardMetric.findMany({
      orderBy: { recordedAt: 'desc' },
      take: 20
    });
  }
}
