import { Either } from '../../../shared/util/either';
import EmployeeRepository from '../../domain/port/employeeRepository';
import DeleteEmployeeUseCase from '../../domain/usecase/employee/deleteEmployeeUseCase';

type DeleteEmployeeRequest = {
  cpf: string;
};

export default class DeleteEmployeeService {
  constructor(readonly employeeRepository: EmployeeRepository) {}

  execute(request: DeleteEmployeeRequest): Either<Error, void> {
    const { cpf } = request;

    const deleteEmployeeUseCase = new DeleteEmployeeUseCase(this.employeeRepository);
    return deleteEmployeeUseCase.execute(cpf);
  }
}
