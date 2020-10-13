import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDto {

  @ApiProperty()
  @IsOptional()
  @IsString({
    message: 'Informe um titulo',
  })
  titulo: string;

  @ApiProperty()
  @IsOptional()
  @IsString({
    message: 'Informe uma descricao',
  })
  descricao: string;

  @ApiProperty()
  @IsOptional()
  @IsString({
    message: 'Informe URL da imagem',
  })
  imgUrl: string;
  
}