import Warehouse from '../entity/warehouse';

export default interface WarehouseRepository {
  getAll(): Warehouse[];
  getById(name: string): Warehouse | undefined;
  save(warehouse: Warehouse): string;
  update(warehouse: Warehouse, id: string): void;
  delete(id: string): void;
  checkName(name: string): boolean;
}
