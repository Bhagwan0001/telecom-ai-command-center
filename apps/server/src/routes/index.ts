import { Router } from 'express';
import healthRouter from './health.routes';

// Import modular routes
import aiRouter from '../modules/ai/ai.routes';
import authRouter from '../modules/auth/auth.routes';
import usersRouter from '../modules/users/users.routes';
import dashboardRouter from '../modules/dashboard/dashboard.routes';
import networkRouter from '../modules/network/network.routes';
import incidentsRouter from '../modules/incidents/incidents.routes';
import analyticsRouter from '../modules/analytics/analytics.routes';
import agentsRouter from '../modules/agents/agents.routes';
import customersRouter from '../modules/customers/customers.routes';
import knowledgeRouter from '../modules/knowledge/knowledge.routes';
import notificationsRouter from '../modules/notifications/notifications.routes';
import auditRouter from '../modules/audit/audit.routes';

const router = Router();

// Infrastructure / Shared Routes
router.use('/health', healthRouter);
router.use('/ai', aiRouter);

// Domain Module Routes
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/dashboard', dashboardRouter);
router.use('/network', networkRouter);
router.use('/incidents', incidentsRouter);
router.use('/analytics', analyticsRouter);
router.use('/agents', agentsRouter);
router.use('/customers', customersRouter);
router.use('/knowledge', knowledgeRouter);
router.use('/notifications', notificationsRouter);
router.use('/audit-logs', auditRouter); // map audit module to /audit-logs for API consistency

export default router;
