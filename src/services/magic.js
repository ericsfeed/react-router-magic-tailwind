import { Magic } from 'magic-sdk';

const magic = new Magic(process.env.REACT_APP_PK_KEY);

//
// MAGIC CHECK USER 
// - returns JSON state reflecting login status
//
export const magicCheckUser = async (cb) => {
  const isLoggedIn = await magic.user.isLoggedIn();
  if (isLoggedIn) {
    const user = await magic.user.getMetadata();
    return cb({ isLoggedIn: true, email: user.email });
  }
  return cb({ isLoggedIn: false });
};


//
// MAGIC LOGIN CALLBACK 
// - Logs the user into the magic service
// - a side effect is the user popup to verify the address
// - arguments: email address, callback function
// - invokes the callback with updated state as a parameter
//
export const magicLoginCallback = async (email, cb) => {
  await magic.auth.loginWithMagicLink({ email });
  return cb({ isLoggedIn: true });
};

//
// MAGIC LOGOUT  
// - logs them out of the magic service
//
export const magicLogout = async () => {
  await magic.user.logout();
};


