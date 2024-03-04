import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Logout } from './_index';

const AuthSwitchLink = ({ loggingTo = "/home", loggingLabel = "Login" }) => {
  const [isLogging, setIsLogging] = useState(false);
  useEffect(() => {
    const myAuthority = sessionStorage.getItem('AUTHORITY');
    setIsLogging(myAuthority != null)
  }, [])

  return (
    !isLogging ? 
    <Link to={loggingTo}>{loggingLabel}</Link> :
    <Logout />
  )
};

export default AuthSwitchLink;
