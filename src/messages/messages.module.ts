import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRepository } from './messages.repository';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PassportModule } from '@nestjs/passport';

// @Global()
@Module({
    imports: [TypeOrmModule.forFeature([MessageRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    providers: [MessagesService],
    controllers: [MessagesController],
})
export class MessagesModule {}
