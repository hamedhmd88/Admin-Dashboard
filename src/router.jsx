import { createBrowserRouter } from "react-router-dom";
import Login, { loginAction } from './features/identity/components/Login'
import Register, { registerAction } from './features/identity/components/Register'
import IdentityLayout from "./layouts/IdentityLayout";
import MainLayout from "./layouts/mainLayout/MainLayout";
import Courses, { coursesLoader } from "./pages/Courses";
import CourseCategories, { categoriesLoader } from "./pages/CourseCategories";
import CourseDetails from "./features/courses/components/CourseDetails";

const router = createBrowserRouter([ 
    {
        path: '/',
        element: <MainLayout/>,
        children: [{
            element: <Courses/>,
            index: true,           //   با این مقدار ایندکس تورو خاصیت پیشفرض را مشخص میکنیم
            loader: coursesLoader,  // لودر یک پراپرتی جدید ریکت روتر است که وقتی یک اطلاعاتی فچ میشود که آن همان فانکشن کورسزبودر ما است با اینکار این را هندل میکنیم
        },
        {
            path: '/course-categories',
            element: <CourseCategories/>,
            loader: categoriesLoader,
        },
        {
            path: "courses/:id",
            element: <CourseDetails />,
            
        },
    ]
    },

   
    
    {
        element: <IdentityLayout/>,
        children: [
            {
                path:'/login',
                element: <Login/>,
                action: loginAction,
                errorElement: <Login/>
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