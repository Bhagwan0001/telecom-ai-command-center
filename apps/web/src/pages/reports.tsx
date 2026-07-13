import { motion } from 'framer-motion';
import { FileText, Download, Filter, Calendar, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const mockReports = [
  { id: 'REP-2026-11', title: 'Monthly Network Compliance Audit', type: 'Compliance', date: 'Nov 01, 2026', size: '2.4 MB', status: 'Generated' },
  { id: 'REP-2026-10', title: 'Q3 Executive AI Performance Summary', type: 'Executive', date: 'Oct 15, 2026', size: '5.1 MB', status: 'Generated' },
  { id: 'REP-2026-09', title: 'Automated Billing Discrepancy Log', type: 'Financial', date: 'Oct 05, 2026', size: '1.2 MB', status: 'Generated' },
  { id: 'REP-2026-08', title: 'Incident Resolution Post-Mortem (Node 4)', type: 'Operations', date: 'Sep 28, 2026', size: '840 KB', status: 'Generated' },
];

export function ReportsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Executive Reports</h2>
          <p className="text-sm text-muted-foreground">
            Access automated compliance audits and historical system summaries
          </p>
        </div>
        <Button className="gap-2">
          <FileText className="h-4 w-4" />
          Generate Custom Report
        </Button>
      </div>

      <div className="rounded-xl border bg-card shadow-sm flex flex-col">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b p-4 gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="text" placeholder="Filter reports..." className="pl-9 h-9" />
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="w-full sm:w-auto gap-2 text-xs">
              <Calendar className="h-4 w-4" />
              Date Range
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
              <tr>
                <th className="px-4 py-3 font-medium">Report Name</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Generated Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockReports.map((report) => (
                <tr key={report.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">{report.title}</span>
                      <span className="text-[10px] text-muted-foreground">{report.id} • {report.size}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{report.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{report.date}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                      <CheckCircle2 className="h-3.5 w-3.5" /> {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-primary hover:text-primary/80">
                      <Download className="h-3.5 w-3.5" /> Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
