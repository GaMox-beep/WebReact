import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray } from 'class-validator'
import { NovelStatus } from '@prisma/client'

export class CreateNovelDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên truyện không được để trống' })
  title: string

  @IsString()
  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  description: string

  @IsString()
  @IsNotEmpty({ message: 'Tên tác giả gốc không được để trống' })
  authorName: string

  @IsOptional()
  @IsEnum(NovelStatus)
  status?: NovelStatus

  @IsOptional()
  @IsArray()
  categoryIds?: string[]
}
