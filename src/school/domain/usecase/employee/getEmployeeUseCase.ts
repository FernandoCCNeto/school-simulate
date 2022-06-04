import { Either, Left, Right } from '../../../../shared/util/either';
import Employee from '../../entity/employee';
import EmployeeRepository from '../../port/employeeRepository';

export default class GetEmployeeUseCase {
  constructor(readonly employeeRepository: EmployeeRepository) {}

  execute(cpf: string): Either<Error, Employee> {
    const employee = this.employeeRepository.getByCpf(cpf);

    if (!employee) return Left(Error('Employee not found'));

    return Right(employee);
  }
}
