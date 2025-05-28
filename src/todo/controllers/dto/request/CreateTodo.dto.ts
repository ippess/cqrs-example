import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({ example: 'Buy milk' })
  content: string;
}
