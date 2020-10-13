import { Injectable, UnprocessableEntityException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageRepository } from './messages.repository';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './message.entity';
import { FindMessagesQueryDto } from './dto/find-messages-query.dto';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(MessageRepository)
        private messageRepository: MessageRepository,
      ) {}


      async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
        
          return this.messageRepository.createUser(createMessageDto);
        
      }

      async findMessageById(messageId: string): Promise<Message> {
        const message = await this.messageRepository.findOne(messageId, {
          select: ['id', 'titulo', 'descricao'],
        });
    
        if (!message) throw new NotFoundException('Mensagem não encontrada');
    
        return message;
      }

      async findMessages(
        queryDto: FindMessagesQueryDto,
      ): Promise<{ messages: Message[]; total: number }> {
        const messages = await this.messageRepository.findMessages(queryDto);
        return messages;
      }

      async updateMessage(updateMessageDto: UpdateMessageDto, id: string): Promise<Message> {
        const message = await this.findMessageById(id);
        const { titulo, descricao, imgUrl } = updateMessageDto;
        message.titulo = titulo ? titulo : message.titulo;
        message.descricao = descricao ? descricao : message.descricao;
        message.imgUrl = imgUrl ? imgUrl : message.imgUrl;

        try {
          await message.save();
          return message;
        } catch (error) {
          throw new InternalServerErrorException(
            'Erro ao salvar os dados no banco de dados',
          );
        }
      }

      async deleteMessage(messageId: string) {
        const result = await this.messageRepository.delete({ id: messageId });
        if (result.affected === 0) {
          throw new NotFoundException(
            'Não foi encontrado uma mensagem com o ID informado',
          );
        }
      }
}
