/**
 * 1주차 다해 - 회원정보수정 컴포넌트의 props, state 인터페이스 선언
 */

export interface IEditFormProps {
  app: React.Component;
  isOpen: boolean;
  handleAuth: (result: boolean, id: string, level: number) => void;
}

export interface IEditFormState {
  company: string;
  id: string;
  pw: string;
  pwdcheck: string;
  name: string;
  email: string;
  phone: string;
  fax: string;
  loading: boolean;
  error: string;
  [key: string]: string | boolean;
}

export type PostEdit = (endpoint: string, data: object) => void;
