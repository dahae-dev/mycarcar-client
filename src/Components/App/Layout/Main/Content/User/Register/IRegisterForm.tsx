/**
 * 1주차 다해 - 회원가입 입력양식 컴포넌트의 props, state 인터페이스 및 http 요청 함수 타입 선언
 */

export interface IRegisterFormProps {
  app: React.Component;
  isOpen: boolean;
}

export interface IRegisterFormState {
  checkedValue: string;
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

export type PostRegister = (endpoint: string, data: object) => void;
