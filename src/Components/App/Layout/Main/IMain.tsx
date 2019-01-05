/**
 * Main 컴포넌트의 props 인터페이스 선언
 */

export interface IMainProps {
  app: React.Component;
  isOpen: boolean;
  isSignedIn: boolean;
  handleAuth: (result: boolean, id: string, level: number) => void;
}
