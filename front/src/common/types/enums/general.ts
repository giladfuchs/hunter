export enum FilterFetchType {
  teacher = 'teacher',
  student = 'student',
  assignment = 'assignment'
}

export type Assignment = {
  id: number;
  title: string;
  detail: string;
};

export type Student = {
  id: number;
  name: string;
  grade: string;
  phone: number;
};
