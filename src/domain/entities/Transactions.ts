export class Transactions {
  constructor(
    public id: string,
    public payeer: string,
    public value: number,
    public payee: string,
    public account: string
  ) {}
}
