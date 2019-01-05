/**
 * 1주차 다해 - 사이드바 회원가입/정보수정 버튼 컴포넌트의 props 인터페이스 선언
 */

export interface IRegisterButtonsProps {
  app: React.Component;
  title: string;
  handlePage: (pathname: string) => void;
  handleSidebar: () => void;
}
