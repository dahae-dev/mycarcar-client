/**
 * 1주차 다해 - Status 컴포넌트의 props 인터페이스 선언
 */

export interface IStatusProps {
  app: React.Component;
  isSignedIn: boolean;
  handleAuth: (result: boolean, id: string, level: number) => void;
  handleSidebar: () => void;
}
