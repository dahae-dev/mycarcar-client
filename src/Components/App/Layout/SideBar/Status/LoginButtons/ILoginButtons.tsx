/**
 * 1주차 다해 - 사이드바 로그인/로그아웃 버튼 컴포넌트의 props 인터페이스 선언
 */

export interface ILoginButtonsProps {
  app: React.Component;
  title: string;
  handlePage: (pathname: string) => void;
  handleAuth: (result: boolean, id: string, level: number) => void;
  handleSidebar: () => void;
}
