import React, { useState } from "react";
//Redux
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
//Reducer
import Reducers from "./store/reducers";
//Navigator
import AppNavigator from "./navigation/AppNavigator";
//redux form
import { reducer as formReducer } from "redux-form";
//Fonts
import * as Font from "expo-font";
import { AppLoading } from "expo";

//Notification
import LocalNotication from "./components/Notification/LocalNotification";

const rootReducer = combineReducers({
  store: Reducers.ProductReducer,
  cart: Reducers.CartReducer,
  order: Reducers.OrderReducer,
  auth: Reducers.AuthReducer,
  fav: Reducers.FavoriteReducer,
  form: formReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

const fetchFonts = () => {
  return Font.loadAsync({});
};

export default function App(props) {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
  return (
    <Provider store={store}>
      <LocalNotication />
      <AppNavigator />
    </Provider>
  );
}
