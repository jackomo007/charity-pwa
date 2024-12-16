export class Donation {
  constructor(
    public id: string,
    public category: string,
    public amount: number,
    public donorName: string,
    public month: string
  ) {}
}
