import { Route, Switch } from "react-router-dom";
import { RouteComponentProps, RouteProps, withRouter } from "react-router";
import React, { ReactNode } from "react";
import { Paths } from "./paths";
import { Test } from "../test"
import { ContentPage } from "../../pages/content-page"

const RoutesBase: React.FC = () => {

  const routes: {
    [path: string]: React.ComponentType<any>;
  } = {
    [Paths.test]: Test,
    [Paths.accounts]: Test
  };


  return (
    <Switch>
      {Object.keys(routes).map(path => {
        return (
          <UnauthenticatedRoute
            exact={true}
            key={`unauthenticated-route${path.replace("/", "-")}`}
            path={path}
            component={routes[path]}
          />
        );
      })}
      <Route component={ContentPage} />
    </Switch>
  )
}

const UnauthenticatedRoute = (props: RouteProps) => {
  const Component = props.component as React.ComponentType<any>;
  const rest = Object.assign({}, props);
  delete rest.component;

  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) => {
        return <Component {...props} />;
      }}
    />
  );
}

export const Routes = withRouter(RoutesBase);
