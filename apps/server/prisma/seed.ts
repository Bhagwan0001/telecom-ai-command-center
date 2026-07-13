import { PrismaClient, UserStatus, NodeType, NodeStatus, MetricType, IncidentSeverity, IncidentStatus, IncidentSource, TicketCategory, TicketPriority, TicketStatus, CustomerStatus, CustomerTier, DashboardMetricCategory, NotificationType, NotificationPriority, NotificationChannel } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {

  // Clean up existing data to avoid conflicts
  await prisma.dashboardMetric.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.incidentComment.deleteMany();
  await prisma.incident.deleteMany();
  await prisma.networkMetric.deleteMany();
  await prisma.networkNode.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.user.deleteMany();
  await prisma.rolePermission.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.role.deleteMany();

  // Create Roles
  const rolesData = [
    { name: 'super_admin', displayName: 'Super Admin', isSystem: true },
    { name: 'admin', displayName: 'Admin', isSystem: true },
    { name: 'network_engineer', displayName: 'Network Engineer', isSystem: true },
    { name: 'support_agent', displayName: 'Support Agent', isSystem: true }
  ];

  const roles = await Promise.all(
    rolesData.map((role) => prisma.role.create({ data: role }))
  );

  const getRoleId = (name: string) => roles.find((r) => r.name === name)!.id;

  // Create Users
  const passwordHash = await bcrypt.hash('password123', 10);

  // 1 Super Admin
  const superAdmin = await prisma.user.create({
    data: {
      email: 'superadmin@taicc.com',
      passwordHash,
      firstName: 'Super',
      lastName: 'Admin',
      displayName: 'Super Admin',
      status: UserStatus.ACTIVE,
      userRoles: {
        create: { roleId: getRoleId('super_admin') }
      }
    }
  });

  // 5 Admins
  const admins = await Promise.all(
    Array.from({ length: 5 }).map(() => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      return prisma.user.create({
        data: {
          email: faker.internet.email({ firstName, lastName, provider: 'taicc.com' }),
          passwordHash,
          firstName,
          lastName,
          displayName: `${firstName} ${lastName}`,
          status: UserStatus.ACTIVE,
          userRoles: {
            create: { roleId: getRoleId('admin') }
          }
        }
      });
    })
  );

  // 20 Network Engineers
  const networkEngineers = await Promise.all(
    Array.from({ length: 20 }).map(() => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      return prisma.user.create({
        data: {
          email: faker.internet.email({ firstName, lastName, provider: 'taicc.com' }),
          passwordHash,
          firstName,
          lastName,
          displayName: `${firstName} ${lastName}`,
          status: UserStatus.ACTIVE,
          userRoles: {
            create: { roleId: getRoleId('network_engineer') }
          }
        }
      });
    })
  );

  const allUsers = [superAdmin, ...admins, ...networkEngineers];

  // 100 Customers
  const customersData = Array.from({ length: 100 }).map(() => ({
    accountNumber: faker.string.alphanumeric(10).toUpperCase(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    city: faker.location.city(),
    state: faker.location.state(),
    tier: faker.helpers.arrayElement(Object.values(CustomerTier)),
    status: CustomerStatus.ACTIVE,
    monthlyRevenue: faker.number.float({ min: 50, max: 1000, fractionDigits: 2 }),
  }));

  await prisma.customer.createMany({ data: customersData });
  const customers = await prisma.customer.findMany();

  // 100 Network Nodes
  const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America'];
  const nodeTypes = Object.values(NodeType);
  const nodeStatuses = [NodeStatus.ONLINE, NodeStatus.ONLINE, NodeStatus.ONLINE, NodeStatus.DEGRADED, NodeStatus.OFFLINE];

  const nodesData = Array.from({ length: 100 }).map(() => ({
    name: `Node-${faker.string.alphanumeric(6).toUpperCase()}`,
    type: faker.helpers.arrayElement(nodeTypes),
    status: faker.helpers.arrayElement(nodeStatuses),
    ipAddress: faker.internet.ipv4(),
    macAddress: faker.internet.mac(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    region: faker.helpers.arrayElement(regions),
    location: faker.location.city(),
    vendor: faker.helpers.arrayElement(['Cisco', 'Juniper', 'Ericsson', 'Nokia', 'Huawei']),
    capacity: faker.number.int({ min: 1000, max: 100000 }),
  }));

  await prisma.networkNode.createMany({ data: nodesData });
  const nodes = await prisma.networkNode.findMany();

  // 1000 Network Metrics
  const metricTypes = Object.values(MetricType);
  const metricsData = [];

  for (let i = 0; i < 1000; i++) {
    const type = faker.helpers.arrayElement(metricTypes);
    let unit = '';
    let value = 0;

    switch (type) {
      case MetricType.CPU_USAGE:
      case MetricType.MEMORY_USAGE:
      case MetricType.PACKET_LOSS:
        unit = '%';
        value = faker.number.float({ min: 0, max: 100, fractionDigits: 2 });
        break;
      case MetricType.BANDWIDTH:
      case MetricType.THROUGHPUT:
        unit = 'Mbps';
        value = faker.number.float({ min: 10, max: 10000, fractionDigits: 2 });
        break;
      case MetricType.LATENCY:
        unit = 'ms';
        value = faker.number.float({ min: 1, max: 500, fractionDigits: 2 });
        break;
      case MetricType.TEMPERATURE:
        unit = '°C';
        value = faker.number.float({ min: 20, max: 90, fractionDigits: 2 });
        break;
      default:
        unit = 'count';
        value = faker.number.float({ min: 0, max: 1000, fractionDigits: 2 });
    }

    metricsData.push({
      nodeId: faker.helpers.arrayElement(nodes).id,
      type,
      value,
      unit,
      recordedAt: faker.date.recent({ days: 7 }),
      isAnomaly: faker.datatype.boolean({ probability: 0.05 }),
    });
  }

  // Chunk array to avoid large insert failures
  const chunkSize = 200;
  for (let i = 0; i < metricsData.length; i += chunkSize) {
    const chunk = metricsData.slice(i, i + chunkSize);
    await prisma.networkMetric.createMany({ data: chunk });
  }

  // 50 Incidents
  const incidentsData = Array.from({ length: 50 }).map(() => {
    const severity = faker.helpers.arrayElement(Object.values(IncidentSeverity));
    const status = faker.helpers.arrayElement(Object.values(IncidentStatus));
    return {
      title: `${faker.hacker.adjective()} ${faker.hacker.noun()} failure`,
      description: faker.lorem.paragraph(),
      severity,
      status,
      source: faker.helpers.arrayElement(Object.values(IncidentSource)),
      nodeId: faker.helpers.arrayElement(nodes).id,
      assigneeId: faker.helpers.arrayElement(networkEngineers).id,
      reporterId: faker.helpers.arrayElement(admins).id,
      createdAt: faker.date.recent({ days: 30 }),
    };
  });

  await prisma.incident.createMany({ data: incidentsData });

  // 100 Support Tickets
  const ticketsData = Array.from({ length: 100 }).map(() => ({
    ticketNumber: `TKT-${faker.string.numeric(6)}`,
    customerId: faker.helpers.arrayElement(customers).id,
    assigneeId: faker.helpers.arrayElement(admins).id,
    subject: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    category: faker.helpers.arrayElement(Object.values(TicketCategory)),
    priority: faker.helpers.arrayElement(Object.values(TicketPriority)),
    status: faker.helpers.arrayElement(Object.values(TicketStatus)),
    createdAt: faker.date.recent({ days: 30 }),
  }));

  await prisma.supportTicket.createMany({ data: ticketsData });

  // 100 Notifications
  const notificationsData = Array.from({ length: 100 }).map(() => ({
    userId: faker.helpers.arrayElement(allUsers).id,
    type: faker.helpers.arrayElement(Object.values(NotificationType)),
    priority: faker.helpers.arrayElement(Object.values(NotificationPriority)),
    channel: faker.helpers.arrayElement(Object.values(NotificationChannel)),
    title: faker.lorem.sentence(),
    message: faker.lorem.paragraph(),
    isRead: faker.datatype.boolean(),
    createdAt: faker.date.recent({ days: 5 }),
  }));

  await prisma.notification.createMany({ data: notificationsData });

  // Dashboard metrics
  const dashboardMetricsData = [
    {
      name: 'Total Active Nodes',
      key: 'total_active_nodes',
      value: nodes.filter(n => n.status === NodeStatus.ONLINE).length,
      category: DashboardMetricCategory.NETWORK,
      period: 'daily',
    },
    {
      name: 'Critical Incidents',
      key: 'critical_incidents',
      value: incidentsData.filter(i => i.severity === IncidentSeverity.CRITICAL && i.status !== IncidentStatus.CLOSED).length,
      category: DashboardMetricCategory.OPERATIONAL,
      period: 'daily',
    },
    {
      name: 'Total Customers',
      key: 'total_customers',
      value: customers.length,
      category: DashboardMetricCategory.CUSTOMER,
      period: 'daily',
    },
    {
      name: 'Open Support Tickets',
      key: 'open_support_tickets',
      value: ticketsData.filter(t => t.status === TicketStatus.OPEN).length,
      category: DashboardMetricCategory.CUSTOMER,
      period: 'daily',
    }
  ];

  await prisma.dashboardMetric.createMany({ data: dashboardMetricsData });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
