export interface ILoginFormProps {
  app: React.Component;
  mainToggle: string;
  handleAuth: (result: boolean) => void;
}

export interface ILoginFormState {
  id: string;
  pw: string;
  loading: boolean;
  error: string;
  [key: string]: string | boolean;
}
