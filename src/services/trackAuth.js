import { magicLogout } from "../services/magic";

export const trackAuth = {
  isAuthenticated: false,
  login(callBack) {
    trackAuth.isAuthenticated = true;
    callBack();
  },
  logout(callBack) {
    magicLogout();
    trackAuth.isAuthenticated = false;
    callBack();
  },
};


