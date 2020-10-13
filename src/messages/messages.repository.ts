import { EntityRepository, Repository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import {
    ConflictException,
    InternalServerErrorException,
  } from '@nestjs/common';
import { FindMessagesQueryDto } from './dto/find-messages-query.dto';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {

    async createUser(
        createUserDto: CreateMessageDto,
      ): Promise<Message> {
        const { titulo, descricao, imgUrl } = createUserDto;
    
        const message = this.create();
            message.titulo = titulo;
            message.descricao = descricao;
            message.imgUrl = imgUrl;
            
        try {
          await message.save()
          return message;
        } catch (error) {
          if (error.code.toString() === '23505') {
            throw new ConflictException('Mensagem ja cadastrada na base');
          } else {
            throw new InternalServerErrorException(
              'Erro ao salvar os dados da mensagem no banco de dados',
            );
          }
        }
      }
    
      async findMessages(
        queryDto: FindMessagesQueryDto,
      ): Promise<{ messages: Message[]; total: number }> {
        queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
        queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;
    
        const { titulo, descricao, imgUrl} = queryDto;
        const query = this.createQueryBuilder('message');
    
        if (descricao) {
          query.andWhere('message.descricao ILIKE :descricao', { descricao: `%${descricao}%` });
        }
    
        if (titulo) {
          query.andWhere('message.titulo ILIKE :titulo', { titulo: `%${titulo}%` });
        }
    
        query.skip((queryDto.page - 1) * queryDto.limit);
        query.take(+queryDto.limit);
        query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
        query.select(['message.titulo', 'message.descricao']);
    
        const [messages, total] = await query.getManyAndCount();
    
        return { messages, total };
      }



}
