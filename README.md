### Overview - Why this repo exists


I could not find an example online that combined create-react-app, and react router v6 with magic links (magic-sdk) for authentication, so here is one. 

This code is adapted from another post here: https://www.codingdeft.com/posts/react-router-tutorial/

The original post contains a helpful demonstration of react router V6.  Using that as an inspiration, I excluded all the bits that are unrelated to authentication and I added code that takes advantage of magic-sdk. 

Some of the magic examples include styling libraries such as Bootstrap. This one intentionally uses vanilla html and css. The CSS that is included can easily be removed or modified etc. 

---
### How to demo

https://react-router-magic.vercel.app/

---

### How to recreate this from scratch

This assumes you have a magic link account. See https://magic.link/ for that. 

#### Grab the latest CRA, react router, and magic links

```
npx create-react-app react-magic
cd react-magic
npm install react-router-dom@6
npm install --save magic-sdk

```

#### Create a .env file for the magic link 

```
cat > .env
REACT_APP_PK_KEY=YOUR_MAGIC_LINK_KEY_GOES_HERE
control-D
```

Be sure to replace YOUR_MAGIC_LINK_KEY_GOES_HERE with your own key!  


#### Update index.js for react router

```
import { BrowserRouter } from "react-router-dom";
```

Replace 

```
<App/> 
```

with the following: 
```
<BrowserRouter>
      <App />
</BrowserRouter>
```

#### Add the services files

```
cd src
mkdir services
touch services/magic.js
touch services/trackAuth.js
```
After setting up the file structure, paste in the file contents from this project. 

#### Add the components

```
cd src
mkdir components
touch components/Navigation.js
touch components/LoginPage.js
touch components/PrivateElement.js
touch components/ProtectedPage.js
```
After setting up the file structure, paste in the file contents from this project. 

#### App.js explained

Replace the contents of App.js with the version from this project. 

This file implements the router and some very simple pages. 

#### magic.js explained

The function magicLoginCallback integrates the magic link login. 

The function magicCheckUser invokes the magic service to check login status. 

#### trackAuth.js explained

'trackAuth' is used to keep track of whether the user is logged in or not. This  mirrors the underlying login state implemented by the magic link system.  

#### ProtectedPage explained

Illustrates a page that is behind the login barrier.  

The page uses trackAuth to maintain ui consistency as follows: when the user logs out, navigate to the LoginPage. 

```
        onClick={() => {
          trackAuth.logout(() =>
            navigate("/login", { state: { from: { pathname: "/protected" } } })
          );
        }}
```

#### PrivateElement explained

This bit enforces authentication; if the user is authenticated, then navigate to the page; otherwise redirect them to the login page.  

```
const PrivateElement = ({ children }) => {
  let location = useLocation();  
  return trackAuth.isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
```

#### Navigation.js explained

This components implements the navigation link structure for this example. 

This example demonstrates how these three resources (create react app, react router v6, and magic link) can co-exist.  Depending on details TBD, further changes may be required to properly secure your own application. 


That's all folks! 

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
