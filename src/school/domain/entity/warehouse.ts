export default class Warehouse {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly stockAmmount: number,
    readonly unitCost: number,
    readonly description?: string,
  ) {}

  public getTotalCost(): number {
    return this.stockAmmount * this.unitCost;
  }
}
