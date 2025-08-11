import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  // Function to send email
  async sendMail(to: string, subject: string, text: string, html: string): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject,
      text,
      html,
    });
  }
}
