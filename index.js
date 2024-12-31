import Header from "./src/components/header/Header";
import Footer from "./src/components/footer/Footer";
import Container from "./src/components/container/Container";
//Pages
import LandingPage from "./src/components/pages/LandingPage";
import SignUp from "./src/components/pages/SignUp";
import LogIn from "./src/components/pages/LogIn";
import Profile from "./src/components/pages/Profile";
import PublicPage from "./src/components/pages/PublicPage";
import ManageLinks from "./src/components/pages/ManageLinks";
import ForgotPassword from "./src/components/pages/ForgotPassword";
import ResetPassword from "./src/components/pages/ResetPassword";
// auths and Config
import { logIn, signUp, logOut } from "./src/supabase/authLogin";
import { supabase } from "./src/supabase/config";
export {
  Header,
  Footer,
  Container,
  LandingPage,
  SignUp,
  LogIn,
  supabase,
  logIn,
  signUp,
  logOut,
  Profile,
  PublicPage,
  ManageLinks,
  ForgotPassword,
  ResetPassword
};
