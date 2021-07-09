import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Displays component to all users if restricted = false
 * Displays component to unauthenticated users if restricted = true
 * @param {var} component React component to display
 * @param {bool} restricted
 */
export default function PublicRoute({
  component: Component,
  restricted,
  ...rest
}) {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        user && restricted ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}
