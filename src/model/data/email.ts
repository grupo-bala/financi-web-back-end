export class Email {
  private readonly email: string;

  constructor(email: string) {
    if (Email.isValid(email)) {
      this.email = email;
    } else {
      throw new Error("Endereço de email inválido");
    }
  }

  get value(): string {
    return this.email;
  }

  private static isValid(email: string): boolean {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  }
}