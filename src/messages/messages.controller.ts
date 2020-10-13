import { 
    Controller, 
    Post,
    Get,
    Patch,
    Delete, 
    Body, 
    ValidationPipe,
    UseGuards,  
    Param,
    Query,  
    ForbiddenException
     } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesService } from './messages.service';
import { ReturnMessageDto } from './dto/return-message.dto';
import { FindMessagesQueryDto } from './dto/find-messages-query.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from '../users/user-roles.enum';

@ApiBearerAuth()
@ApiTags('messages')
@Controller('messages')
@UseGuards(AuthGuard(), RolesGuard)
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Post()
    @Role(UserRole.ADMIN)
    async createMessage(
        @Body() createMessageDto: CreateMessageDto,
    ): Promise<ReturnMessageDto> {
        const message = await this.messagesService.createMessage(createMessageDto);
        return {
        message,
        response: 'Mensagem cadastrada com sucesso.',
        };
    }
    
    @Get(':id')
    async findMessageById(@Param('id' , ValidationPipe) id: string): Promise<ReturnMessageDto> {
        const message = await this.messagesService.findMessageById(id);
        return {
        message,
        response: 'Mensagem encontrada!',
        };
    }

    @Get()
    // @Role(UserRole.ADMIN)
    async findMessages(@Query() query: FindMessagesQueryDto) {
        const found = await this.messagesService.findMessages(query);
        return {
        found,
        response: 'Mensagens encontradas',
        };
    }

    @Patch(':id')
    async updateMessage(
        @Body(ValidationPipe) updateMessageDto: UpdateMessageDto,
        // @GetMessage() message: Message,
        @Param('id') id: string,
    ) {
        //if (user.role != UserRole.ADMIN && user.id.toString() != id) {
        // throw new ForbiddenException(
        //     'Você não tem autorização para acessar esse recurso',
        //);
        //} else {
        return this.messagesService.updateMessage(updateMessageDto, id);
        //}
    }

    @Delete(':id')
    async deleteMessage(@Param('id') id: string) {
        await this.messagesService.deleteMessage(id);
        return {
        response: 'Mensagem removida com sucesso',
        };
    }

}
