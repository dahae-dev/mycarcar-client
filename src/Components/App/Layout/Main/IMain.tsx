export interface IMainProps {
  mainToggle: string;
  isSignedIn: boolean;
  handleAuth: (result: boolean) => void;
  app: React.Component;
}
