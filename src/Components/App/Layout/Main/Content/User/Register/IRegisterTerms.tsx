/**
 * 1주차 다해 - 회원가입 이용약관 컴포넌트의 props, state 인터페이스 선언
 */

export interface IRegisterTermsProps {
  app: React.Component;
  isOpen: boolean;
}

export interface IRegisterTermsState {
  isCheckedFst: boolean;
  isCheckedSnd: boolean;
}
