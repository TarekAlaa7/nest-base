import { Injectable } from '@nestjs/common';
import { Event } from '../entity/event.entity';
import { Schedule } from '../entity/schedule.entity';
import { Recurrence } from '../entity/recurrence.entity';

@Injectable()
export class ScheduleService {
  private schedules: Schedule[] = [];

  createEvent(scheduleId: string, event: Event): void {
    const schedule = this.getScheduleById(scheduleId);
    if (schedule) {
      schedule.events.push(event);
    }
  }

  getScheduleById(scheduleId: string): Schedule | undefined {
    return this.schedules.find((schedule) => schedule.id === scheduleId);
  }

  createRecurringEvent(
    scheduleId: string,
    event: Event,
    recurrence: Recurrence,
  ): void {
    const schedule = this.getScheduleById(scheduleId);
    if (schedule) {
      let currentDate = new Date(recurrence.startDate);
      while (currentDate <= recurrence.endDate) {
        if (this.shouldCreateEventForDay(currentDate, recurrence)) {
          const newEvent = {
            ...event,
            startTime: currentDate,
            endTime: new Date(
              currentDate.getTime() +
                (event.endTime.getTime() - event.startTime.getTime()),
            ),
          };
          schedule.events.push(newEvent);
        }
        this.incrementDate(currentDate, recurrence);
      }
    }
  }

  shouldCreateEventForDay(date: Date, recurrence: Recurrence): boolean {
    return recurrence.daysOfWeek.includes(date.getDay());
  }

  incrementDate(date: Date, recurrence: Recurrence): void {
    if (recurrence.frequency === 'daily') {
      date.setDate(date.getDate() + recurrence.interval);
    } else if (recurrence.frequency === 'weekly') {
      date.setDate(date.getDate() + 7 * recurrence.interval);
    } else if (recurrence.frequency === 'monthly') {
      date.setMonth(date.getMonth() + recurrence.interval);
    }
  }
}
