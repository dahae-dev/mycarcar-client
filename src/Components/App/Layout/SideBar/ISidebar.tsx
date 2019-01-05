/**
 * 1주차 다해 - Sidebar 컴포넌트의 props 인터페이스 선언
 */

export interface ISidebarProps {
  isOpen: boolean;
  app: React.Component;
  isSignedIn: boolean;
  signedInId: string;
  signedInLevel: number;
  handleAuth: (result: boolean, id: string, level: number) => void;
  handleSidebar: () => void;
}
