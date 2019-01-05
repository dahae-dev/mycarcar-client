/**
 * 1주차 다해 - App 컴포넌트의 state 인터페이스 선언
 */
export interface IAppState {
  isOpen: boolean;
  isSignedIn: boolean;
  signedInId: string;
  signedInLevel: number;
}
