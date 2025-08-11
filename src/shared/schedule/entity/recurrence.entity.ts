export class Recurrence {
  frequency: 'daily' | 'weekly' | 'monthly';
  interval: number; 
  daysOfWeek: number[];
  startDate: Date;
  endDate: Date;
}
