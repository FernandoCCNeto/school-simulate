import { Either, Left, Right } from '../../../../shared/util/either';
import Warehouse from '../../entity/warehouse';
import WarehouseRepository from '../../port/warehouseRepository';

export default class UpdateWarehouseUseCase {
  constructor(readonly warehouseRepository: WarehouseRepository) {}

  execute(warehouse: Warehouse, id: string): Either<Error, void> {
    try {
      this.warehouseRepository.update(warehouse, id);
      return Right(undefined);
    } catch (error: any) {
      return Left(Error(error.message));
    }
  }
}
