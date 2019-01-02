export interface ILoginButtonsProps {
  title: string;
  handlePage: (pathname: string) => void;
  handleAuth: (result: boolean) => void;
  app: React.Component;
}
