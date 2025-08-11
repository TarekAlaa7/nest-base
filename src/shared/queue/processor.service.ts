import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { QUEUE_NAME, GENERIC_TASK } from '../constants/queue.constants';

@Processor(QUEUE_NAME)
export class ProcessorService {
  @Process(GENERIC_TASK)
  async handleGenericTask(job: Job) {
    console.log('Processing background task with data:', job.data);
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log('Background task completed');
  }
}
