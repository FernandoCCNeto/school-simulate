export default class Warehouse {
  constructor(
    public id: string,
    public name: string,
    public stockAmmount: number,
    public unitCost: number,
    public description?: string,
  ) {}
}
