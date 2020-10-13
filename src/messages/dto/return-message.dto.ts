import { Message } from '../message.entity';

export class ReturnMessageDto {
  message: Message;
  response: string;
}