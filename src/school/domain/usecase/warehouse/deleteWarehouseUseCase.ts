import { Either, Right } from '../../../../shared/util/either';
import WarehouseRepository from '../../port/warehouseRepository';

export default class DeleteWarehouseUseCase {
  constructor(readonly warehouseRepository: WarehouseRepository) {}

  execute(id: string): Either<Error, void> {
    this.warehouseRepository.delete(id);
    return Right(undefined);
  }
}
