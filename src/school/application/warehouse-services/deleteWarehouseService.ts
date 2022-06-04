import { Either } from '../../../shared/util/either';
import WarehouseRepository from '../../domain/port/warehouseRepository';
import DeleteWarehouseUseCase from '../../domain/usecase/warehouse/deleteWarehouseUseCase';

type DeleteWarehouseRequest = {
  id: string;
};

export default class DeleteWarehouseService {
  constructor(readonly warehouseRepository: WarehouseRepository) {}

  execute(request: DeleteWarehouseRequest): Either<Error, void> {
    const { id } = request;

    const deleteWarehouseUseCase = new DeleteWarehouseUseCase(this.warehouseRepository);
    return deleteWarehouseUseCase.execute(id);
  }
}
