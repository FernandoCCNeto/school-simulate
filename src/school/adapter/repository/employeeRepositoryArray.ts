import Cpf from '../../../shared/domain/cpf';
import Email from '../../../shared/domain/email';
import { generateId } from '../../../shared/domain/entity';
import Employee from '../../domain/entity/employee';
import EmployeeRepository from '../../domain/port/employeeRepository';
import EmployeeModel from './employeeModel';

export default class EmployeeRepositoryArray implements EmployeeRepository {
  private employees: EmployeeModel[] = [];

  countByEmail(email: string): number {
    return this.employees.filter((employee) => employee.email === email.toLowerCase()).length;
  }

  save(employee: Employee): string {
    const { name, email, birthday, cpf } = employee;
    const id = generateId();
    const employeeModel = new EmployeeModel(id, name, email.value, birthday, cpf.value);
    this.employees.push(employeeModel);
    return employeeModel.id;
  }

  getAll(): Employee[] {
    return this.employees.map(
      (employee) =>
        new Employee(
          employee.name,
          new Email(employee.email),
          employee.birthday,
          new Cpf(employee.cpf),
        ),
    );
  }

  getByCpf(cpf: string): Employee | undefined {
    const employee = this.getEmployeeByCpf(cpf);

    if (!employee) {
      return undefined;
    }

    return new Employee(
      employee.name,
      new Email(employee.email),
      employee.birthday,
      new Cpf(employee.cpf),
    );
  }

  update(employee: Employee): void {
    const employeeToBeUpdated = this.getEmployeeByCpf(employee.cpf.value);

    if (!employeeToBeUpdated) {
      throw new Error('Employee not found');
    }

    employeeToBeUpdated.birthday = employee.birthday;
    employeeToBeUpdated.cpf = employee.cpf.value;
    employeeToBeUpdated.email = employee.email.value;
    employeeToBeUpdated.name = employee.name;
  }

  delete(cpf: string): void {
    this.employees = this.employees.filter((employee) => employee.cpf !== cpf);
  }
  checkCpf(cpf: string): boolean {
    return Boolean(this.employees.find((employee) => employee.cpf === cpf));
  }

  private getEmployeeByCpf(cpf: string): EmployeeModel | undefined {
    return this.employees.find((employee) => employee.cpf === cpf);
  }
}
