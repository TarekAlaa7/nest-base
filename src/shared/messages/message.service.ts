import { Injectable } from '@nestjs/common';
import * as messages from './messages.json';

@Injectable()
export class MessageService {
  private readonly messages = messages;

  get(path: string, variables: Record<string, string | number> = {}): string {
    const keys = path.split('.');
    let message: any = this.messages;

    for (const key of keys) {
      message = message?.[key];
      if (message === undefined) return path;
    }

    return Object.entries(variables).reduce((msg, [key, val]) => {
      return msg.replace(new RegExp(`{{${key}}}`, 'g'), String(val));
    }, message);
  }
}
