import { generateId } from '../../../shared/domain/entity';
import Warehouse from '../../domain/entity/warehouse';
import WarehouseRepository from '../../domain/port/warehouseRepository';
import WarehouseModel from './warehouseModel';

export default class WarehouseRepositoryArray implements WarehouseRepository {
  private warehouse: WarehouseModel[] = [];

  save(warehouse: Warehouse): string {
    const { name, stockAmmount, unitCost, description } = warehouse;
    const id = generateId();
    const warehouseModel = new WarehouseModel(id, name, stockAmmount, unitCost, description);
    this.warehouse.push(warehouseModel);
    return warehouseModel.id;
  }

  getAll(): Warehouse[] {
    return this.warehouse.map(
      (warehouse) =>
        new Warehouse(
          warehouse.id,
          warehouse.name,
          warehouse.stockAmmount,
          warehouse.unitCost,
          warehouse.description,
        ),
    );
  }

  getById(id: string): Warehouse | undefined {
    const warehouse = this.getWarehouseById(id);

    if (!warehouse) {
      return undefined;
    }

    return new Warehouse(
      warehouse.id,
      warehouse.name,
      warehouse.stockAmmount,
      warehouse.unitCost,
      warehouse.description,
    );
  }

  update(warehouse: Warehouse, id: string): void {
    const warehouseToBeUpdated = this.getWarehouseById(id);

    if (!warehouseToBeUpdated) {
      throw new Error('Item not found');
    }

    warehouseToBeUpdated.name = warehouse.name;
    warehouseToBeUpdated.stockAmmount = warehouse.stockAmmount;
    warehouseToBeUpdated.unitCost = warehouse.unitCost;
    warehouseToBeUpdated.description = warehouse.description;
  }

  delete(id: string): void {
    this.warehouse = this.warehouse.filter((warehouse) => warehouse.id !== id);
  }

  checkName(name: string): boolean {
    return Boolean(this.warehouse.find((warehouse) => warehouse.name === name));
  }

  private getWarehouseById(id: string): WarehouseModel | undefined {
    return this.warehouse.find((warehouse) => warehouse.id === id);
  }
}
