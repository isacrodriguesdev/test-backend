import { Authenticator } from "src/domain/cryptography/Authenticator";
import { verify, sign } from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;

export class JsonWebTokenService implements Authenticator {
  public async validate(token: string): Promise<boolean> {
    try {
      const decoded = verify(token, JWT_SECRET_KEY);
      return Boolean(decoded);
    } catch (error: any) {
      return false;
    }
  }

  public async sign(payload: any): Promise<string> {
    const token = sign(payload, JWT_SECRET_KEY, {
      expiresIn: "30d",
    });
    return token;
  }

  public async decode<T>(token: string): Promise<T> {
    try {
      const decoded = verify(token, JWT_SECRET_KEY);
      return decoded as T;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}