import {
  IsOptional,
  IsString,
  MaxLength,
  IsNumberString,
  IsAlphanumeric,
  Length,
} from 'class-validator';

export class EmployerDto {
  @IsString()
  @MaxLength(255, { message: 'dummy error' })
  readonly name: string;

  @IsNumberString({ message: 'dummy error' })
  @IsAlphanumeric({ message: 'dummy error' })
  @Length(9, 9, { message: 'dummy error' })
  readonly vat: string;

  @IsOptional()
  @IsNumberString({ message: 'dummy error' })
  @IsAlphanumeric({ message: 'dummy error' })
  @Length(10, 10, { message: 'dummy error' })
  readonly ame?: string;
}
