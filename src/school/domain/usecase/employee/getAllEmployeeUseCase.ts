import { Either, Right } from '../../../../shared/util/either';
import Employee from '../../entity/employee';
import EmployeeRepository from '../../port/employeeRepository';

export default class GetAllEmployeeUseCase {
  constructor(readonly employeeRepository: EmployeeRepository) {}

  execute(): Either<Error, Employee[]> {
    const employee = this.employeeRepository.getAll();

    return Right(employee);
  }
}
