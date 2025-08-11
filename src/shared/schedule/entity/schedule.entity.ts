import { Event } from './event.entity';

export class Schedule {
  id: string;
  userId: string; 
  events: Event[];
}
