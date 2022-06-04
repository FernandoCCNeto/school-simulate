import Student from '../entity/student';

export default interface StudentRepository {
  getAll(): Student[];
  getByCpf(cpf: string): Student | undefined;
  save(student: Student): string;
  update(student: Student): void;
  delete(cpf: string): void;
  checkCpf(cpf: string): boolean;
}
