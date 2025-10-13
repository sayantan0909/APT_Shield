export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';

export type Alert = {
  id: string;
  timestamp: string;
  source: string;
  threatType: string;
  severity: Severity;
  iocs: string[];
  affectedSystems: string[];
  description: string;
  mitreAttackId: string;
  anomalyScore: number;
  isEncrypted?: boolean;
};

export type Rule = {
  id: string;
  name: string;
  description: string;
  category: 'PowerShell' | 'Credential Dumping' | 'Lateral Movement' | 'Data Exfiltration';
  query: string;
  mitreAttackId: string;
};

export type Log = {
  id: string;
  timestamp: string;
  source: 'Windows Event Log' | 'Sysmon' | 'Network Log' | 'Firewall';
  host: string;
  message: string;
};

export type IncidentStatus = 'New' | 'In Progress' | 'Resolved' | 'Closed';

export type Incident = {
  id: string;
  alertId: string;
  status: IncidentStatus;
  assignedTo: string;
  severity: Severity;
  createdAt: string;
  description: string;
};

export type ThreatIntel = {
  id: string;
  title: string;
  publishedDate: string;
  source: string;
  content: string;
  iocs: { type: string; value: string }[];
  aptGroups: string[];
};

export type DashboardStats = {
  totalAlerts: number;
  criticalAlerts: number;
  openIncidents: number;
  rulesActive: number;
};

export type ThreatHuntingQuery = {
    id: string;
    name: string;
    description: string;
    query: string;
    tags: string[];
};

export type WhitelistedIp = {
    id: string;
    ipAddress: string;
    description: string;
    expirationDate?: string | null;
}
