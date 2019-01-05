/**
 * 1주차 다해 - 로그인 컴포넌트의 props, state 인터페이스 선언
 */

export interface ILoginFormProps {
  app: React.Component;
  isOpen: boolean;
  handleAuth: (result: boolean, id: string, level: number) => void;
}

export interface ILoginFormState {
  id: string;
  pw: string;
  loading: boolean;
  error: string;
  [key: string]: string | boolean;
}
