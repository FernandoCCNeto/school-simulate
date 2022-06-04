import Cpf from '../../../shared/domain/cpf';
import { generateId } from '../../../shared/domain/entity';
import Student from '../../domain/entity/student';
import StudentRepository from '../../domain/port/studentRepository';
import StudentModel from './studentModel';

export default class StudentRepositoryArray implements StudentRepository {
  private students: StudentModel[] = [];

  save(student: Student): string {
    const { name, birthday, cpf } = student;
    const id = generateId();
    const studentModel = new StudentModel(id, name, birthday, cpf.value);
    this.students.push(studentModel);
    return studentModel.id;
  }

  getAll(): Student[] {
    return this.students.map(
      (student) => new Student(student.name, student.birthday, new Cpf(student.cpf)),
    );
  }

  getByCpf(cpf: string): Student | undefined {
    const student = this.getStudentByCpf(cpf);

    if (!student) {
      return undefined;
    }

    return new Student(student.name, student.birthday, new Cpf(student.cpf));
  }

  update(student: Student): void {
    const studentToBeUpdated = this.getStudentByCpf(student.cpf.value);

    if (!studentToBeUpdated) {
      throw new Error('Student not found');
    }

    studentToBeUpdated.birthday = student.birthday;
    studentToBeUpdated.cpf = student.cpf.value;
    studentToBeUpdated.name = student.name;
  }

  delete(cpf: string): void {
    this.students = this.students.filter((student) => student.cpf !== cpf);
  }

  private getStudentByCpf(cpf: string): StudentModel | undefined {
    return this.students.find((student) => student.cpf === cpf);
  }

  checkCpf(cpf: string): boolean {
    return Boolean(this.students.find((student) => student.cpf === cpf));
  }
}
