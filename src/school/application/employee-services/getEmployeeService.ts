import { Either } from '../../../shared/util/either';
import Employee from '../../domain/entity/employee';
import EmployeeRepository from '../../domain/port/employeeRepository';
import GetEmployeeUseCase from '../../domain/usecase/employee/getEmployeeUseCase';

type GetEmployeeRequest = {
  cpf: string;
};

export default class GetEmployeeService {
  constructor(readonly employeeRepository: EmployeeRepository) {}

  execute(request: GetEmployeeRequest): Either<Error, Employee> {
    const { cpf } = request;

    const getEmployeeUseCase = new GetEmployeeUseCase(this.employeeRepository);
    return getEmployeeUseCase.execute(cpf);
  }
}
