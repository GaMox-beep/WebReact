import { IsString, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên thể loại không được để trống' })
  @MinLength(2, { message: 'Tên thể loại phải có ít nhất 2 ký tự' })
  name: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
