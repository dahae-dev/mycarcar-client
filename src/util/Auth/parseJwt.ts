interface IDataJWT {
  exp: number;
  iat: number;
  id: string;
  iss: string;
  level: number;
}

export const INVALID_JWT = {
  exp: 0,
  iat: 0,
  id: "",
  iss: "",
  level: 0
};

export default function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const dataJWT: IDataJWT = JSON.parse(window.atob(base64));
    return dataJWT;
  } catch (err) {
    return INVALID_JWT;
  }
}
