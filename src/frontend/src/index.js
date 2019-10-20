import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Redux
import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { Provider } from "react-redux";
import rootReducer from "./reducers/index";
import { rootEpic } from "./epics/index";

// https://redux-observable.js.org/MIGRATION.html#setting-up-the-middleware
const epicMiddleware = createEpicMiddleware();
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
