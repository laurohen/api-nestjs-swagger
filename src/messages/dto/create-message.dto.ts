import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {

    @ApiProperty()
    titulo: string;

    @ApiProperty()
    descricao: string;

    @ApiProperty()
    imgUrl: string;

}