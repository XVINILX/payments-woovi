export class Account {
  constructor(
    public id: string,
    public name: string,
    public balance: number,
    public user: string,
    public transactions: string[]
  ) {}
}
