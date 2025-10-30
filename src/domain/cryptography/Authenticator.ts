export abstract class Authenticator {
  public abstract validate(token: string): Promise<boolean>;
  public abstract decode<T>(token: string): Promise<T>;
  public abstract sign(payload: any): Promise<string>;
}