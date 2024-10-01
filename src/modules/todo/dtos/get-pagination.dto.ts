import { ApiProperty } from '@nestjs/swagger';
import { generateValidationMessage } from '@utils/index';
import { MinValidator } from 'src/common/validators/min.validator';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class GetPaginationDto {
  @ApiProperty({
    description: 'Trang hiện tại',
    required: false,
    default: 1,
  })
  @IsNotEmpty({
    message: (args) =>
      generateValidationMessage(args, 'Trang hiện tại không được để trống'),
  })
  @Transform(({ value }) => parseInt(value))
  @MinValidator(1, {
    message: (args) =>
      generateValidationMessage(
        args,
        'Trang hiện tại phải lớn hơn hoặc bằng 1',
      ),
  })
  page: number;

  @ApiProperty({
    description: 'Số lượng bản ghi trên mỗi trang',
    required: false,
    default: 10,
  })
  @IsNotEmpty({
    message: (args) =>
      generateValidationMessage(
        args,
        'Số lượng bản ghi trên mỗi trang không được để trống',
      ),
  })
  @Transform(({ value }) => parseInt(value))
  @MinValidator(1, {
    message: (args) =>
      generateValidationMessage(
        args,
        'Số lượng bản ghi trên mỗi trang phải lớn hơn hoặc bằng 1',
      ),
  })
  limit: number;
}
