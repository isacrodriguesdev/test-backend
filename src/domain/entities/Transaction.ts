import { BaseEntity, BaseEntityProps } from "src/domain/entities/BaseEntity";
import { TransactionType } from "src/domain/value-objects/TransactionType";

export interface ITransaction extends BaseEntityProps {
  userId: string;
  type: TransactionType;
  category: string;
  amount: number;
  date: Date;
}

export class Transaction extends BaseEntity {
  private readonly _userId: string;
  private readonly _type: TransactionType;
  private readonly _category: string;
  private readonly _amount: number;
  private _date: Date;

  constructor(transaction: Omit<ITransaction, "id">, id?: string) {
    super(id);
    this._userId = transaction.userId;
    this._type = transaction.type;
    this._category = transaction.category;
    this._amount = transaction.amount;
    this._date = transaction.date;
    this.createdAt = transaction.createdAt || new Date();
  }

  get userId(): string {
    return this._userId;
  }

  get type(): string {
    return this._type.getValue().toUpperCase();
  }

  get category(): string {
    return this._category;
  }

  get amount(): number {
    return this._amount;
  }

  get date(): Date {
    return this._date;
  }

  public ISOStringToDate(date: string) {
    this._date = new Date(date)
  }

  public toJson() {
    return {
      id: this.id,
      userId: this._userId,
      type: this.type,
      category: this._category,
      amount: this._amount,
      date: this._date,
      createdAt: this.createdAt
    }
  }
}
