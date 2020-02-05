import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { checkTokenIsValid } from '../helpers/auth'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkTokenIsValid() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/sign-in" />
      )
    }
  />
)

export default ProtectedRoute

//https://tylermcginnis.com/react-router-protected-routes-authentication/
