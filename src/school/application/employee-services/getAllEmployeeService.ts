import { Either } from '../../../shared/util/either';
import Employee from '../../domain/entity/employee';
import EmployeeRepository from '../../domain/port/employeeRepository';
import GetAllEmployeeUseCase from '../../domain/usecase/employee/getAllEmployeeUseCase';

export default class GetAllEmployeeService {
  constructor(readonly employeeRepository: EmployeeRepository) {}

  execute(): Either<Error, Employee[]> {
    const getAllEmployeeUseCase = new GetAllEmployeeUseCase(this.employeeRepository);

    return getAllEmployeeUseCase.execute();
  }
}
