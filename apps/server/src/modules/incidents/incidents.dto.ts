export class CreateIncidentDto {
  title!: string;
  node!: string;
  severity!: 'critical' | 'high' | 'medium' | 'low';
}
