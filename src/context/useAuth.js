import { useContext } from "react";
import { AuthContext } from "./authprovider";

export const useAuth =() => useContext(AuthContext)