import { BaseQueryParametersDto } from '../shared/dto/base-query-parameters.dto';

export class FindMessagesQueryDto extends BaseQueryParametersDto {
  titulo: string;
  descricao: string;
  imgUrl: string;
  
}