export interface ISidebarProps {
  sidebarToggle: string;
  isSignedIn: boolean;
  handleAuth: (result: boolean) => void;
  app: React.Component;
}
