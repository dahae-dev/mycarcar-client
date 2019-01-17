export interface IUserData {
  company: string;
  id: string;
  pw: string;
  pwdcheck: string;
  name: string;
  email: string;
  phone: string;
  fax: string;
}

export const INITIAL_USER_DATA = {
  company: "",
  id: "",
  pw: "",
  pwdcheck: "",
  name: "",
  email: "",
  phone: "",
  fax: ""
};
