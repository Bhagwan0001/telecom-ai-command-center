export interface NetworkTopologyNode {
  id: string;
  type: string;
  data: {
    label: string;
    status: 'healthy' | 'warning' | 'error';
  };
  position: { x: number; y: number };
}

export interface NetworkTopologyEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  style?: any;
}

export interface NetworkTopology {
  nodes: NetworkTopologyNode[];
  edges: NetworkTopologyEdge[];
}

export interface NetworkMetric {
  timestamp: string;
  latency: number;
  packetLoss: number;
  throughput: number;
}

export interface NetworkIncident {
  id: string;
  title: string;
  node: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'Investigating' | 'Mitigating' | 'Resolved';
  time: string;
}
