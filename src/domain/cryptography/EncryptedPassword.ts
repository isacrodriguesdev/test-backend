export abstract class EncryptedPassword {
  public abstract encrypt(password: string): Promise<string>;
  public abstract compare(password: string, encrypted: string): Promise<boolean>;
}