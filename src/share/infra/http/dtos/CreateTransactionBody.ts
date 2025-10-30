import { IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionBody {
  @ApiProperty({ description: "Transaction type: 'income' or 'expense'", example: 'income' })
  @IsNotEmpty()
  @IsIn(['income', 'expense'])
  type: string;

  @ApiProperty({ description: 'Category of the transaction', example: 'groceries' })
  @IsNotEmpty()
  category: string;

  @ApiProperty({ description: 'Amount of the transaction', example: 100.50 })
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ description: 'Transaction date in ISO format', example: '2025-10-30T14:30:00Z' })
  @IsNotEmpty()
  date: string;
}