import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class MomoIpnDto {
  @IsString()
  @IsNotEmpty()
  partnerCode: string;

  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  requestId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsOptional()
  orderInfo?: string;

  @IsString()
  @IsOptional()
  orderType?: string;

  @IsNotEmpty()
  transId: number | string;

  @IsNumber()
  @IsNotEmpty()
  resultCode: number;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsOptional()
  payType?: string;

  @IsNumber()
  @IsNotEmpty()
  responseTime: number;

  @IsString()
  @IsOptional()
  extraData?: string;

  @IsString()
  @IsNotEmpty()
  signature: string;
}
