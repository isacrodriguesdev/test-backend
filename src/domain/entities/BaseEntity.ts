import { v7 as uuid } from "uuid";

export interface BaseEntityProps {
  id: string;
  createdAt?: Date;
}

export abstract class BaseEntity {
  private _id: string;
  private _createdAt: Date;

  constructor(id?: string) {
    this._id = id ?? uuid();
  }

  public abstract toJson();

  public get id(): string {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public set createdAt(value: Date) {
    this._createdAt = value;
  }
}