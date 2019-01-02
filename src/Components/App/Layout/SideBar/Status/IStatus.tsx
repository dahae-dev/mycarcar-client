export interface IStatusProps {
  isSignedIn: boolean;
  handleAuth: (result: boolean) => void;
  app: React.Component;
}
