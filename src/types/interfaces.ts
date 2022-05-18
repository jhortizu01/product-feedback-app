import { STATUSES } from './enums';
import { ProductRequest, Comment, User, Reply } from './types';

export interface Status {
  status: STATUSES;
  count: number;
}

export interface AllProductRequestProps {
  productRequests: ProductRequest[];
}
