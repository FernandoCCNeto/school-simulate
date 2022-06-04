import { Either } from '../../../shared/util/either';
import Warehouse from '../../domain/entity/warehouse';
import WarehouseRepository from '../../domain/port/warehouseRepository';
import RegisterWarehouseUseCase from '../../domain/usecase/warehouse/registerWarehouseUseCase';

type RegisterWarehouseRequest = {
  id: string;
  name: string;
  stockAmmount: number;
  unitCost: number;
  description?: string;
};

export default class RegisterWarehouseService {
  constructor(readonly warehouseRepository: WarehouseRepository) {}

  execute(request: RegisterWarehouseRequest): Either<Error, string> {
    const { id, name, stockAmmount, unitCost, description } = request;

    const warehouse = new Warehouse(id, name, stockAmmount, unitCost, description);

    const registerWarehouseUseCase = new RegisterWarehouseUseCase(this.warehouseRepository);
    return registerWarehouseUseCase.execute(warehouse);
  }
}
