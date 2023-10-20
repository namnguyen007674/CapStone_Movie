import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./modules/Home";
import MainLayout from "./layouts/MainLayout";
import DetailMovie from "./modules/DetailMovie";
import Auth from "./modules/Auth";
import SignIn from "./modules/Auth/components/pages/SignIn";
import SignUp from "./modules/Auth/components/pages/SignUp";
import UserProvider from "./modules/contexts/UserContext/UserContext";
import ProtectedRoute from "./modules/routers/ProtectedRoute/ProtectedRoute";
import Tickets from "./modules/Tickets/Tickets";
import TicketProvider from "./modules/contexts/TicketsContext/TicketsContext";
import UserAccount from "./modules/UserAccount";
import FormUserAccount from "./modules/UserAccount/components/FormUserAccount";
import BookingHistory from "./modules/UserAccount/components/BookingHistory";
import NotFound from "./components/NotFound/NotFound";
import ProtectedRouteAdmin from "./modules/routers/ProtectedRouteAdmin";
import AdminLayout from "./modules/AdminLayout";
import AdminUserList from "./modules/AdminLayout/components/Users/AdminUserList";
import AdminAddUser from "./modules/AdminLayout/components/Users/AdminAddUser";
import AdminUpdateUser from "./modules/AdminLayout/components/Users/AdminUpdateUser/AdminUpdateUser";
import AdminMovieList from "./modules/AdminLayout/components/Movies/AdminMovieList";
import AdminUpdateMovie from "./modules/AdminLayout/components/Movies/AdminUpdateMovie";
import AdminAddMovie from "./modules/AdminLayout/components/Movies/AdminAddMovie";
import AdminMovieShowtime from "./modules/AdminLayout/components/Movies/AdminMovieShowtime";

function App() {
  return (
    <UserProvider>
      <TicketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="detail/:movieId" element={<DetailMovie />} />
              <Route element={<ProtectedRoute />}>
                <Route path="tickets/:showtimeId" element={<Tickets />} />
                {/* Account  */}
                <Route path="account" element={<UserAccount />}>
                  <Route path="user" element={<FormUserAccount />} />
                  <Route path="history" element={<BookingHistory />} />
                </Route>
              </Route>
              {/* Form  */}
              <Route path="/" element={<Auth />}>
                <Route path="sign-in" element={<SignIn />} />
                <Route path="sign-up" element={<SignUp />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route element={<ProtectedRouteAdmin />}>
              {/* Admin  */}
              <Route path="/admin" element={<AdminLayout/>}>
                {/* User  */}
                <Route path="userList" element={<AdminUserList />} />
                <Route path="addUser" element={<AdminAddUser />} />
                <Route
                  path="updateUser/:username"
                  element={<AdminUpdateUser />}
                />
                {/* Movie  */}
                <Route path="movieList" element={<AdminMovieList />} />
                <Route path="addMovie" element={<AdminAddMovie />} />
                <Route
                  path="updateMovie/:movieId"
                  element={<AdminUpdateMovie />}
                />
                <Route
                  path="showtime/:movieId"
                  element={<AdminMovieShowtime />}
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TicketProvider>
    </UserProvider>
  );
}

export default App;
