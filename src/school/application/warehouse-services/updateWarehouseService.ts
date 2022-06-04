import { Either } from '../../../shared/util/either';
import Warehouse from '../../domain/entity/warehouse';
import WarehouseRepository from '../../domain/port/warehouseRepository';
import UpdateWarehouseUseCase from '../../domain/usecase/warehouse/updateWarehouseUseCase';

type UpdateWarehouseRequest = {
  name: string;
  stockAmmount: number;
  unitCost: number;
  description?: string;
  id: string;
};

export default class UpdateWarehouseService {
  constructor(readonly warehouseRepository: WarehouseRepository) {}

  execute(request: UpdateWarehouseRequest): Either<Error, void> {
    const { name, stockAmmount, unitCost, description, id } = request;

    const warehouse = new Warehouse(id, name, stockAmmount, unitCost, description);

    const updateWarehouseUseCase = new UpdateWarehouseUseCase(this.warehouseRepository);
    return updateWarehouseUseCase.execute(warehouse, id);
  }
}
