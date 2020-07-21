# ionic-react-hook-form-react-fire

Sample project motivated by video by David East on [Reactfire](https://github.com/FirebaseExtended/reactfire)

- **You should know that [Reactfire](https://github.com/FirebaseExtended/reactfire) is not considered "Production"**
- In this project I use [Reactfire](https://github.com/FirebaseExtended/reactfire), [Ionic Framework ReactJS Components](https://ionicframework.com/react) and [React-Hook-Form](https://react-hook-form.com/).
- Currently there is only Login and List Data Collection, will be adding create user, add items and delete items

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
- Add Items Using Ionic Modal
- Delete Items using IonSlidingItem
- Create Account

### See Other Work On My YouTube Channel
- https://www.youtube.com/channel/UCMCcqbJpyL3LAv3PJeYz2bg
