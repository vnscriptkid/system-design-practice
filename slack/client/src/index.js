import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import "semantic-ui-css/semantic.min.css";

import Routes from "./routes";
import registerServiceWorker from "./registerServiceWorker";
import client from "./apollo";
import { SocketContextProvider } from "./context/socket";
import AuthContextProvider from "./context/auth";

const App = (
  <AuthContextProvider>
    <SocketContextProvider>
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </SocketContextProvider>
  </AuthContextProvider>
);

ReactDOM.render(App, document.getElementById("root"));
registerServiceWorker();
