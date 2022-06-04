import { Either } from '../../../shared/util/either';
import Warehouse from '../../domain/entity/warehouse';
import WarehouseRepository from '../../domain/port/warehouseRepository';
import GetWarehouseUseCase from '../../domain/usecase/warehouse/getWarehouseUseCase';

type GetWarehouseRequest = {
  id: string;
};

export default class GetWarehouseService {
  constructor(readonly warehouseRepository: WarehouseRepository) {}

  execute(request: GetWarehouseRequest): Either<Error, Warehouse> {
    const { id } = request;

    const getWarehouseUseCase = new GetWarehouseUseCase(this.warehouseRepository);
    return getWarehouseUseCase.execute(id);
  }
}
