import React from "react";
import { Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {

  return (
    props.isLoggedIn !== null ?
      (props.isLoggedIn ? <Component {...props} /> : <Redirect to="/signin" />)
      :
      <></>
  )
}

export default ProtectedRoute;