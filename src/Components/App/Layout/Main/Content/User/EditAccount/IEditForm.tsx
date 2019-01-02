export interface IEditFormProps {
  app: React.Component;
  mainToggle: string;
  handleAuth: (result: boolean) => void;
}

export interface IEditFormState {
  id: string;
  pw: string;
  pwdcheck: string;
  name: string;
  email: string;
  phone: string;
  loading: boolean;
  error: string;
  [key: string]: string | boolean;
}
