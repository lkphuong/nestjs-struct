import { ApiProperty } from '@nestjs/swagger';
import { generateValidationMessage } from '@utils/index';
import { LengthValidator } from '@validators/length.validator';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Tiêu đề',
    example: 'Mua sữa',
  })
  @IsNotEmpty({
    message: (args) =>
      generateValidationMessage(args, 'Tiêu đề không được để trống'),
  })
  @LengthValidator(1, 255, {
    message: (args) =>
      generateValidationMessage(
        args,
        'Tiêu đề phải có độ dài từ 1 đến 255 ký tự',
      ),
  })
  @Transform(({ value }) => value.trim())
  title: string;

  @ApiProperty({
    description: 'Mô tả',
    example: 'Mua sữa tại cửa hàng ABC',
  })
  @IsNotEmpty({
    message: (args) =>
      generateValidationMessage(args, 'Mô tả không được để trống'),
  })
  @LengthValidator(1, 500, {
    message: (args) =>
      generateValidationMessage(
        args,
        'Mô tả phải có độ dài từ 1 đến 500 ký tự',
      ),
  })
  @Transform(({ value }) => value.trim())
  description: string;

  @ApiProperty({
    description: 'Trạng thái hoàn thành',
    example: false,
  })
  @IsNotEmpty({
    message: (args) =>
      generateValidationMessage(
        args,
        'Trạng thái hoàn thành không được để trống',
      ),
  })
  is_completed: boolean;
}
