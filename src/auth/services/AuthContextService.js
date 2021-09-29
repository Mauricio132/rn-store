import { createContext } from "react";

const AuthContextService = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
  stateShowScreenAuth: () => null,
});

export default AuthContextService;
