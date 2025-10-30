import { BaseEntity, BaseEntityProps } from "src/domain/entities/BaseEntity";

export interface IUser extends BaseEntityProps {
  name: string;
  email: string;
  password: string;
}

export class User extends BaseEntity {
  private _name: string;
  private _email: string;
  private _password: string;

  constructor(user: Omit<IUser, "id">, id?: string) {
    super(id);
    this._name = user.name;
    this._email = user.email;
    this._password = user.password;
    this.createdAt = user.createdAt || new Date();
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  setPassword(password: string) {
    this._password = password;
  }

  public toJson() {
    return {
      id: this.id,
      name: this._name,
      email: this._email,
      createdAt: this.createdAt,
    }
  }
}