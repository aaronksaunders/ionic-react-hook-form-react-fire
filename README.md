# ionic-react-hook-form-react-fire
### Last Updated 7/31/2020

Sample project motivated by [video by David East](https://www.youtube.com/watch?v=cyQW2leJBnI) on [Reactfire](https://github.com/FirebaseExtended/reactfire)

- **You should know that [Reactfire](https://github.com/FirebaseExtended/reactfire) is not considered "Production"**
- This project has been tested for use on mobile devices using [Capacitor](https://capacitorjs.com/) on IOS and Android
- In this project I use [Reactfire](https://github.com/FirebaseExtended/reactfire), [Ionic Framework ReactJS Components](https://ionicframework.com/react) and [React-Hook-Form](https://react-hook-form.com/).
- We use the `<AuthCheck/>` component for cleaner routing when not logged in, See [App.tsx](https://github.com/aaronksaunders/ionic-react-hook-form-react-fire/blob/master/src/App.tsx)
- Currently there is only [Login](https://github.com/aaronksaunders/ionic-react-hook-form-react-fire/blob/master/src/pages/Login.tsx) and [Listing The Data Collection](https://github.com/aaronksaunders/ionic-react-hook-form-react-fire/blob/master/src/pages/Home.tsx)
- Will be adding create user, add items and delete items

### Required
you must create a file called `src/env.js` and add the following code
```javascript
export const FIREBASE_CONFIG = {
// YOUR FIREBASE CONFIGURATION
};

// NAME OF COLLECTION IN FIREBASE TO LIST
export const FIREBASE_COLLECTION_NAME = "users"

// THIS IS REQUIRED FOR ANDROID
// SEE - https://github.com/FirebaseExtended/reactfire/issues/228
global.globalThis = window;
```

### Whats Next
- Add Items Using Ionic Modal        - Added on 7/31/200
- Create Account                     - Added on 7/31/200
- Delete Items using IonSlidingItem


### See Other Work On My YouTube Channel
- https://www.youtube.com/channel/UCMCcqbJpyL3LAv3PJeYz2bg
