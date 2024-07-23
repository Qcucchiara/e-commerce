import { IsInt, Max, Min } from 'class-validator';

export class Pagination {
  @IsInt()
  @Min(0)
  skip: string;

  @IsInt()
  @Min(1)
  take: string;
}
