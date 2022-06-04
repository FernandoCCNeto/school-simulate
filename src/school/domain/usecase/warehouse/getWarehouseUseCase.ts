import { Either, Left, Right } from '../../../../shared/util/either';
import Warehouse from '../../entity/warehouse';
import WarehouseRepository from '../../port/warehouseRepository';

export default class GetWarehouseUseCase {
  constructor(readonly warehouseRepository: WarehouseRepository) {}

  execute(id: string): Either<Error, Warehouse> {
    const warehouse = this.warehouseRepository.getById(id);

    if (!warehouse) return Left(Error('Warehouse not found'));

    return Right(warehouse);
  }
}
