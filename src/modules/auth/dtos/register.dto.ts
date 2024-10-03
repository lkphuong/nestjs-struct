import { ApiProperty } from '@nestjs/swagger';
import { generateValidationMessage } from '@utils/index';
import { LengthValidator } from '@validators/length.validator';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Tên đăng nhập',
    example: 'admin',
  })
  @IsNotEmpty({
    message: (args) =>
      generateValidationMessage(args, 'Tên đăng nhập không được để trống'),
  })
  @LengthValidator(1, 255, {
    message: (args) =>
      generateValidationMessage(
        args,
        'Tên đăng nhập phải có độ dài từ 1 đến 255 ký tự',
      ),
  })
  @Transform(({ value }) => value.trim())
  username: string;

  @ApiProperty({
    description: 'Mật khẩu',
    example: 'admin',
  })
  @IsNotEmpty({
    message: (args) =>
      generateValidationMessage(args, 'Mật khẩu không được để trống'),
  })
  @LengthValidator(1, 255, {
    message: (args) =>
      generateValidationMessage(
        args,
        'Mật khẩu phải có độ dài từ 1 đến 255 ký tự',
      ),
  })
  @Transform(({ value }) => value.trim())
  password: string;
}
