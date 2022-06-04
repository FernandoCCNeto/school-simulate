import { Either } from '../../../shared/util/either';
import Warehouse from '../../domain/entity/warehouse';
import WarehouseRepository from '../../domain/port/warehouseRepository';
import GetAllWarehouseUseCase from '../../domain/usecase/warehouse/getAllWarehouseUseCase';

export default class GetAllWarehouseService {
  constructor(readonly warehouseRepository: WarehouseRepository) {}

  execute(): Either<Error, Warehouse[]> {
    const getAllWarehouseUseCase = new GetAllWarehouseUseCase(this.warehouseRepository);

    return getAllWarehouseUseCase.execute();
  }
}
