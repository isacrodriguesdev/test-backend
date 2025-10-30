import { IsNotEmpty, IsOptional, IsIn, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export class FetchTransactionQueryParams {
  @ApiPropertyOptional({ description: "Chart type: 'pie' | 'line' | 'map'", example: 'pie' })
  @IsOptional()
  @IsIn(['pie', 'line', 'map'])
  chartType?: 'pie' | 'line' | 'map';

  @ApiProperty({ description: 'Start date in YYYY-MM-DD format', example: '2025-01-01' })
  @IsNotEmpty()
  @Matches(DATE_REGEX, { message: 'startDate must be in YYYY-MM-DD format' })
  startDate: string;

  @ApiProperty({ description: 'End date in YYYY-MM-DD format', example: '2025-12-31' })
  @IsNotEmpty()
  @Matches(DATE_REGEX, { message: 'endDate must be in YYYY-MM-DD format' })
  endDate: string;
}