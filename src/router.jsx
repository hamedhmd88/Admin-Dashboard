import { createBrowserRouter } from "react-router-dom";
import Login from './features/identity/components/Login'
import Register, { registerAction } from './features/identity/components/Register'
import IdentityLayout from "./layouts/IdentityLayout";

const router = createBrowserRouter([
    {
        element: <IdentityLayout/>,
        children: [
            {
                path:'/login',
                element: <Login/>
            },
            {
                path:'/register',
                element: <Register/>,
                action: registerAction,
                errorElement: <Register/>, // یعنی خطاهای مربوط به این کامپوننت را در همین نشان بده
            },
        ]
    }
    
]);

export default router;