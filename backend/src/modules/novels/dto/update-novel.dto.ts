import { IsString, IsOptional, IsEnum, IsArray } from 'class-validator'
import { NovelStatus } from '@prisma/client'

export class UpdateNovelDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  authorName?: string

  @IsOptional()
  @IsEnum(NovelStatus)
  status?: NovelStatus

  @IsOptional()
  @IsArray()
  categoryIds?: string[]
}
