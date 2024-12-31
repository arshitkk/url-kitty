import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Footer,
  Header,
  Container,
  LandingPage,
  LogIn,
  SignUp,
  Profile,
  PublicPage,
  ManageLinks,
  supabase,
  ForgotPassword,
  ResetPassword
} from "../index.js";
function Main() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Check session on mount
    const fetchSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        console.log("Session fetched:", session);
        setLoggedIn(!!session); // true if session exists
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
    // Listen to auth changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setLoggedIn(!!session);
      }
    );
  });
  if (loading) return <div></div>;
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: loggedIn ? (
          <Navigate to="/profile" />
        ) : (
          <>
            <Container>
              <Header />
              {loggedIn ? <Profile /> : <LandingPage />}
            </Container>
            <Footer />
          </>
        ),
      },
      {
        path: "/sign-up",
        element: (
          <Container>
            <Header />
            <SignUp />
          </Container>
        ),
      },
      {
        path: "/login",
        element: (
          <Container>
            <Header />
            <LogIn />
          </Container>
        ),
      },
      {
        path: "/profile",
        element: (
          <>
            <Container>
              <Header />
              <Profile />
            </Container>
            <Footer />
          </>
        ),
      },
      {
        path: "/manage-links",
        element: (
          <>
            <Container>
              <Header />
              <ManageLinks />
            </Container>
            <Footer />
          </>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <>
            <Container>
              <Header />
              <ForgotPassword />
            </Container>
            <Footer />
          </>
        ),
      },
      {
        path: "/reset-password",
        element: (
          <>
            <Container>
              <ResetPassword />
            </Container>
            <Footer />
          </>
        ),
      },
      {
        path: ":username",
        element: (
          <Container>
            <PublicPage />
          </Container>
        ),
      },
    ],
    {
      future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );
  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")).render(<Main />);
