import { IsNotEmpty, IsInt, IsString, IsOptional } from "class-validator";

export class CreateAccountDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  balance: number;

  @IsNotEmpty()
  @IsString()
  userId: string;
}

export class UpdateAccountDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  balance?: number;
}
