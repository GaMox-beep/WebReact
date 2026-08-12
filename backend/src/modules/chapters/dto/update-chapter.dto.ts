import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator'
import { Type } from 'class-transformer'

export class UpdateChapterDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  chapterNumber?: number

  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  content?: string

  @IsOptional()
  @IsBoolean()
  isVip?: boolean
}
