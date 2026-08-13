import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateChapterDto {
  @IsString()
  @IsNotEmpty({ message: 'novelId không được để trống' })
  novelId: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'chapterNumber phải là chữ số' })
  chapterNumber: number;

  @IsString()
  @IsNotEmpty({ message: 'Tiêu đề chương không được để trống' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Nội dung chương không được để trống' })
  content: string;

  @IsOptional()
  @IsBoolean()
  isVip?: boolean;
}
