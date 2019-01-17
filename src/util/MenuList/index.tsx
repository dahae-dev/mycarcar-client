export interface IMenus {
  icon: string;
  content: string;
  path: string;
}

const guestUserMenu = [
  { icon: "home", content: "홈으로 가기", path: "/" },
  { icon: "cab", content: "장기렌트", path: "/rental" }
];

const nomalUserMenu = [...guestUserMenu, { icon: "calculator", content: "견적내역보기", path: "/estimate/list" }];

const capitalUserMenu = [...nomalUserMenu];

const superAdminMenu = [...capitalUserMenu, { icon: "television", content: "회원정보관리", path: "/admin/edit" }];

export const getMenus = (level: number) => {
  const isGuestUser = level === 0;
  if (isGuestUser) {
    return guestUserMenu;
  }

  const isNomalUser = level < 2;
  if (isNomalUser) {
    return nomalUserMenu;
  }

  const isCapitalUser = level === 5;
  if (isCapitalUser) {
    return capitalUserMenu;
  }

  const isSuperAdmin = level === 10;
  if (isSuperAdmin) {
    return superAdminMenu;
  }

  return [];
};
