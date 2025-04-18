export enum ModelType {
  teacher = 'teacher',
  student = 'student',
  assignment = 'assignment'
}

export enum Grade {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  H = 'H',
  I = 'I',
  J = 'J',
  K = 'K',
  L = 'L'
}

export enum InputType {
  Text = 'text',
  Number = 'number',
  TextArea = 'textarea'
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
  assignments: Assignment[];
};
