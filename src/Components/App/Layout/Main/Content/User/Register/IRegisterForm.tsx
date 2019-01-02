export interface IRegisterFormProps {
  app: React.Component;
  mainToggle: string;
}

export interface IRegisterFormState {
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
