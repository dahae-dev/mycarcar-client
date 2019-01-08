interface IMenus {
  icon: string;
  content: string;
}

const menuLists = {
  nomal: [
    { icon: "home", content: "홈으로 가기" },
    { icon: "cab", content: "장기렌트" },
    { icon: "calculator", content: "운용리스" },
    { icon: "television", content: "견적내역보기" },
  ],

  capital: [
    { icon: "home", content: "홈으로 가기" },
    { icon: "cab", content: "장기렌트" },
    { icon: "calculator", content: "운용리스" },
    { icon: "television", content: "견적내역보기" },
    { icon: "television", content: "차량정보등록" },
  ],

  super: [
    { icon: "home", content: "홈으로 가기" },
    { icon: "cab", content: "장기렌트" },
    { icon: "calculator", content: "운용리스" },
    { icon: "television", content: "견적내역보기" },
    { icon: "television", content: "차량정보등록" },
    { icon: "television", content: "유저정보관리" },
  ],
};

export const getMenus = (signedInLevel: number): IMenus[] => {
  const isNomalUser = signedInLevel < 2;
  if (isNomalUser) {
    return menuLists.nomal;
  }

  const isCapitalUser = signedInLevel === 5;
  if (isCapitalUser) {
    return menuLists.capital;
  }

  const isSuperUser = signedInLevel === 10;
  if (isSuperUser) {
    return menuLists.super;
  }

  return [];
};
