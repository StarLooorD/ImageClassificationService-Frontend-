import Login from "../pages/Auth/Login";
import AuthLayout from "../layouts/Auth/AuthLayout";
import NavsLayout from "../layouts/Navs/NavsLayout";
import CreateUser from "../pages/CreateUser/CreateUser";

const LoginRoute = {
    path: "/login",
    component: Login,
    layout: AuthLayout,
    protectedRoute: false
}

const CreateUserRoute = {
    path: "/create-user",
    component: CreateUser,
    layout: NavsLayout,
    protectedRoute: true
}

export const routes = [
    LoginRoute,
    CreateUserRoute,
]
