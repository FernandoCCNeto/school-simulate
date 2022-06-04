import { Either, Left, Right } from '../../../../shared/util/either';
import Employee from '../../entity/employee';
import EmployeeRepository from '../../port/employeeRepository';

export default class UpdateEmployeeUseCase {
  constructor(readonly employeeRepository: EmployeeRepository) {}

  execute(employee: Employee): Either<Error, void> {
    try {
      this.employeeRepository.update(employee);
      return Right(undefined);
    } catch (error: any) {
      return Left(Error(error.message));
    }
  }
}
