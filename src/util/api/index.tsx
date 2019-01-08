interface IApiObj {
  pathname: string;
  label: string;
}

const apiList: IApiObj[] = [
  { pathname: "/", label: "홈으로 가기" },
  { pathname: "/api/login", label: "로그인" },
  { pathname: "/api/logout", label: "로그아웃" },
  { pathname: "/api/register", label: "회원가입" },
  { pathname: "/api/edit_account", label: "정보수정" },
  { pathname: "/api/rental", label: "장기렌트" },
  { pathname: "/api/admin/car_list", label: "차량정보등록" },
  { pathname: "/api/admin/car_list/catalog", label: "카탈로그" },
  { pathname: "/api/admin/member_list", label: "유저정보관리" },
];

export const getApiPathName = (title: string) => {
  const findApiObjCb = (accu: IApiObj, curr: IApiObj): IApiObj => (curr.label === title ? curr : accu);
  const apiObj = apiList.reduce(findApiObjCb, { pathname: "/", label: "" });
  const pathname = apiObj.pathname;

  return pathname;
};
