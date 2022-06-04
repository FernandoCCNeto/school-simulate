import Employee from '../entity/employee';

export default interface EmployeeRepository {
  getAll(): Employee[];
  getByCpf(cpf: string): Employee | undefined;
  save(employee: Employee): string;
  update(employee: Employee): void;
  delete(cpf: string): void;
  countByEmail(email: string): number;
  checkCpf(cpf: string): boolean;
}
