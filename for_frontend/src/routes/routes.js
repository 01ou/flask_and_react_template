import Root from './Root';
import ErrorPage from './error-page';
import Home from './Home';
import RequireAuth from './auth/RequireAuth';
import RequireNoAuth from './auth/RequireNoAuth';

import Index from './Index';
import Login from './auth/Login';
import Signup from './auth/Signup';


export { Root, ErrorPage, Home, RequireAuth, RequireNoAuth, Index, Login, Signup };

// loader/action
export { loader as requireAuthLoader } from "./auth/RequireAuth";
export { loader as requireNoAuthLoader } from "./auth/RequireNoAuth";
export { action as signupAction } from "./auth/Signup";
export { action as loginAction } from "./auth/Login";
