import { Either, Left, Right } from '../../../../shared/util/either';
import Warehouse from '../../entity/warehouse';
import WarehouseRepository from '../../port/warehouseRepository';

export default class RegisterWarehouseUseCase {
  constructor(readonly warehouseRepository: WarehouseRepository) {}

  execute(warehouse: Warehouse): Either<Error, string> {
    const nameAlreadyUsed = this.warehouseRepository.checkName(warehouse.name);

    if (nameAlreadyUsed) return Left(Error('Name already exits'));
    const id = this.warehouseRepository.save(warehouse);
    return Right(id);
  }
}
