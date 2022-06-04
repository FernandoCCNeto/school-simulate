import { Either, Right } from '../../../../shared/util/either';
import Warehouse from '../../entity/warehouse';
import WarehouseRepository from '../../port/warehouseRepository';

export default class GetAllWarehouseUseCase {
  constructor(readonly warehouseRepository: WarehouseRepository) {}

  execute(): Either<Error, Warehouse[]> {
    const warehouse = this.warehouseRepository.getAll();

    return Right(warehouse);
  }
}
