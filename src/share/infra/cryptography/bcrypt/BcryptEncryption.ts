import { EncryptedPassword } from "src/domain/cryptography/EncryptedPassword";
import * as bcryptjs from "bcryptjs";

export class BcryptEncryption implements EncryptedPassword {
  private readonly saltRounds = 12;

  public async encrypt(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt(this.saltRounds);
    const hash = await bcryptjs.hash(password, salt);
    return hash;
  }

  public async compare(password: string, encrypted: string): Promise<boolean> {
    const isValid = await bcryptjs.compare(password, encrypted);
    return isValid;
  }
}