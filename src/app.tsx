import { AuthProvider, Storage } from "@asgardeo/auth-react";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TokenExchangePlugin } from "@asgardeo/token-exchange-plugin";
import { SWRConfig } from "swr";
import PageLayout from "./components/Layout";
import { default as authConfig } from "./config.json";
import { HomePage, NotFoundPage } from "./pages";

export const App = () => (
  <SWRConfig>
    <AuthProvider
      config={{ ...authConfig, storage: "webWorker" as Storage.WebWorker }}
      plugin={TokenExchangePlugin.getInstance()}
    >
      <PageLayout>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </PageLayout>
    </AuthProvider>
  </SWRConfig>
);
