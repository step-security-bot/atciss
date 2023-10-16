import { createBrowserRouter } from "react-router-dom"
import { AtisAfw } from "../views/AtisAfw"
import { Map } from "../views/Map"
import { Wx } from "../views/Wx"
import { App } from "../App"
import { Notam } from "../views/Notam"
import {
  Auth,
  AuthCallback,
  Logout,
  RequireAuth,
  authCallbackLoader,
} from "./auth"
import { LOA } from "../views/LOA"
import { AipIfr } from "../views/AipIfr"
import { AipVfr } from "../views/AipVfr"
import { Windy } from "../views/Windy"
import { Alias, aliasLoader } from "../views/Alias"
// import { Bookings } from "../views/Bookings"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <App />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: <AtisAfw sx={{ flex: "auto" }} />,
      },
      {
        path: "map",
        element: <Map />,
      },
      {
        path: "alias",
        element: <Alias />,
        loader: aliasLoader,
      },
      {
        path: "wx",
        element: <Wx />,
      },
      // {
      //   path: "bookings",
      //   element: <Bookings />,
      // },
      {
        path: "windy",
        element: <Windy />,
      },
      {
        path: "notam",
        element: <Notam />,
      },
      {
        path: "loa",
        element: <LOA />,
      },
      {
        path: "aip-ifr",
        element: <AipIfr />,
      },
      {
        path: "aip-vfr",
        element: <AipVfr />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/auth/callback",
    element: <AuthCallback />,
    loader: authCallbackLoader,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
])

export default router
