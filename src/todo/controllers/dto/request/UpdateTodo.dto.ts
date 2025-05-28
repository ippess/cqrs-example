import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({ example: 'Buy milk' })
  content: string;
}
