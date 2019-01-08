interface IMenus {
  icon: string;
  content: string;
}

interface IGetMenus {
  (signedInLevel: number): IMenus[];
}

const defaultMenu = [
  { icon: "home", content: "홈으로 가기" },
  { icon: "cab", content: "장기렌트" },
  { icon: "calculator", content: "운용리스" },
  { icon: "television", content: "견적내역보기" },
];

const nomalUserMenu = [...defaultMenu];
const capitalUserMenu = [...nomalUserMenu, { icon: "television", content: "차량정보등록" }];
const superUserMenu = [...capitalUserMenu, { icon: "television", content: "유저정보관리" }];

export const getMenus: IGetMenus = signedInLevel => {
  const isNomalUser = signedInLevel < 2;
  if (isNomalUser) {
    return nomalUserMenu;
  }

  const isCapitalUser = signedInLevel === 5;
  if (isCapitalUser) {
    return capitalUserMenu;
  }

  const isSuperUser = signedInLevel === 10;
  if (isSuperUser) {
    return superUserMenu;
  }

  return [];
};
