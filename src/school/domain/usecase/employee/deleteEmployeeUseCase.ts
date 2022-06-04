import { Either, Right } from '../../../../shared/util/either';
import EmployeeRepository from '../../port/employeeRepository';

export default class DeleteEmployeeUseCase {
  constructor(readonly employeeRepository: EmployeeRepository) {}

  execute(cpf: string): Either<Error, void> {
    this.employeeRepository.delete(cpf);
    return Right(undefined);
  }
}
