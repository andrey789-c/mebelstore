import { IsPhoneNumber, IsString,  } from "class-validator"


export class CreateOrderDto {

  @IsString()
  name: string

  @IsString()
  @IsPhoneNumber('RU', {message: 'Введите корректный номер телефона'})
  phone: string

  @IsString()
  city: string

  @IsString()
  street: string

  @IsString()
  home: string

  @IsString()
  flat: string
}