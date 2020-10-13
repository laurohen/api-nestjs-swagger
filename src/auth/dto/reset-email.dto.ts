import { ApiProperty } from '@nestjs/swagger';

export class ResetEmailDto {

  @ApiProperty()
  email: string;

}
