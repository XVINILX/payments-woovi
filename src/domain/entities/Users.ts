export class Users {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public account?: string,
    public id?: string
  ) {}
}
