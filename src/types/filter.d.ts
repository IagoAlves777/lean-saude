export interface IFilters {
  id: number;
  column: string;
  operator: string;
  value: string;
  logicalOperator: 'AND' | 'OR';
}
