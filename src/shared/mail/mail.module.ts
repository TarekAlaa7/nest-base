// src/mail/mail.module.ts
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import * as path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailtrap.io',  // Host for your mail service (e.g., MailTrap, Gmail, SendGrid, etc.)
        port: 587,                 // Port number
        secure: false,             // Set to true if you are using SSL
        auth: {
          user: 'your_username',  // Your SMTP username
          pass: 'your_password',  // Your SMTP password
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',  // Default sender
      },
      template: {
        dir: path.resolve(__dirname, './templates'),  // Path to email templates
        adapter: new HandlebarsAdapter(),  // Optional, use Handlebars for templates
        options: {
          strict: true,  // Enable strict mode for templates
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
