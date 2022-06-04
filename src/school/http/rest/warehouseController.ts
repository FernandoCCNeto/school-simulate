import { Request, Response, Router } from 'express';
import { generateId } from '../../../shared/domain/entity';
import { isLeft } from '../../../shared/util/either';
import DeleteWarehouseService from '../../application/warehouse-services/deleteWarehouseService';
import GetAllWarehouseService from '../../application/warehouse-services/getAllWarehouseService';
import GetWarehouseService from '../../application/warehouse-services/getWarehouseService';
import RegisterWarehouseService from '../../application/warehouse-services/registerWarehouseService';
import UpdateWarehouseService from '../../application/warehouse-services/updateWarehouseService';
import WarehouseRepository from '../../domain/port/warehouseRepository';

export default class WarehouseController {
  constructor(readonly warehouseRepository: WarehouseRepository) {}

  buildRouter(): Router {
    const router = Router();
    router.post('/', this.registerWarehouseHandler.bind(this));
    router.get('/:id', this.getWarehouseHandler.bind(this));
    router.get('/', this.getAllWarehouseHandler.bind(this));
    router.delete('/:id', this.deleteWarehouseHandler.bind(this));
    router.put('/', this.updateWarehouseHandler.bind(this));
    return router;
  }

  registerWarehouseHandler(req: Request, res: Response): void {
    const registerWarehouseService = new RegisterWarehouseService(this.warehouseRepository);
    const { name, stockAmmount, unitCost, description } = req.body;
    const id = generateId();

    const result = registerWarehouseService.execute({
      id,
      name,
      stockAmmount,
      unitCost,
      description,
    });

    if (isLeft(result)) {
      res.status(400).json(result.value.message);
    } else {
      res.setHeader('Location', `/warehouse/${result.value}`);
      res.sendStatus(201);
    }
  }

  updateWarehouseHandler(req: Request, res: Response): void {
    const registerWarehouseService = new UpdateWarehouseService(this.warehouseRepository);
    const { name, stockAmmount, unitCost, description, id } = req.body;
    const result = registerWarehouseService.execute({
      name,
      stockAmmount,
      unitCost,
      description,
      id,
    });

    if (isLeft(result)) {
      res.status(400).json(result.value.message);
    } else {
      res.setHeader('Location', `/warehouse/${result.value}`);
      res.sendStatus(200);
    }
  }

  getWarehouseHandler(req: Request, res: Response): void {
    const getWarehouseService = new GetWarehouseService(this.warehouseRepository);
    const { id } = req.params;
    const result = getWarehouseService.execute({ id });

    if (isLeft(result)) {
      res.status(400).json(result.value.message);
    } else {
      res.setHeader('Location', `/warehouse/${result.value}`);
      res.status(200).json(result.value);
    }
  }

  getAllWarehouseHandler(req: Request, res: Response): void {
    const getAllWarehouseService = new GetAllWarehouseService(this.warehouseRepository);
    const result = getAllWarehouseService.execute();

    if (isLeft(result)) {
      res.status(400).json(result.value.message);
    } else {
      res.setHeader('Location', `/warehouse/${result.value}`);
      res.status(200).json(result.value);
    }
  }
  deleteWarehouseHandler(req: Request, res: Response): void {
    const deleteWarehouseService = new DeleteWarehouseService(this.warehouseRepository);
    const { id } = req.params;
    const result = deleteWarehouseService.execute({
      id,
    });

    if (isLeft(result)) {
      res.status(400).json(result.value.message);
    } else {
      res.setHeader('Location', `/warehouse/${result.value}`);
      res.sendStatus(200);
    }
  }
}
