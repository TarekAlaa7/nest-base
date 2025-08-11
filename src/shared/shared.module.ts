import { Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { RedisModule } from './redis/redis.module';
import { QueueModule } from './queue/queue.module';
import { MessageService } from './messages/message.service';

@Module({
  imports: [MailModule, RedisModule, QueueModule, MessageService],  
  exports: [MailModule, RedisModule, QueueModule, MessageService], 
})
export class SharedModule {}
