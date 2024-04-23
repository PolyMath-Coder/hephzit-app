import { IsNotEmpty, IsNumber, IsString } from 'class-validator'





export class OrderDto {
  @IsString()
  @IsNotEmpty()
  pair: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNumber()
  price: number;
}