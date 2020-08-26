import { createStore, applyMiddleware } from "redux";
import { User } from "./User";

export const configureStore = () => {
  const store = createStore(
      User,applyMiddleware()
  ); //Note User above is a reducer function
  return store;
};
