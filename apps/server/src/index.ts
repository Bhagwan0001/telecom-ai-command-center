import http from 'http';
import { app } from './app';
import { env } from './config/env';
import { logger } from '@taicc/logger';
import { SocketService } from './socket/socket';

const PORT = env.PORT;

const server = http.createServer(app);

// Initialize Socket.io server with authentication
SocketService.init(server);

server.listen(PORT, () => {
  logger.info(`🚀 TAICC Server running on http://localhost:${PORT}`);
  logger.info(`📦 Environment: ${env.NODE_ENV}`);
});
