export type Type = 'INCOME' | 'EXPENSE';

export class TransactionType {
  private readonly _type: Type;

  constructor(type: string) {
    this.validateType(type);
    this._type = type as Type;
  }

  private validateType(type: string) {
    const validTypes: Type[] = ['INCOME', 'EXPENSE'];
    if (!validTypes.includes(type.toUpperCase() as Type)) {
      throw new Error('Invalid transaction type. Must be INCOME or EXPENSE.');
    }
  }

  getValue(): Type {
    return this._type.toUpperCase() as Type;
  }
}
