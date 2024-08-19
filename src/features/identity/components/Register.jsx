import logo from "@assets/images/logo.svg"; // instead of from '../../../assets/images/logo.svg '
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {  Link, useActionData, useNavigation, useSubmit, useNavigate, useRouteError } from "react-router-dom";
import { httpService } from "../../../core/http-service";
import axios from "axios";
import { useTranslation } from "react-i18next";



function Register() {
 const{register, watch, handleSubmit, formState:{errors}} =  useForm();

const submitForm = useSubmit(); //برای هندل کردن فرم یوزسابمیت را از ریکت روتر دام میگیریم

const onSubmit = (data) => {
    const {confirmPassword, ...userData} = data; // با استفاده از رست کانفورم پسوورد را جدا میکنیم چون عملا سمت فرانت انجام میشه و بقیه دیتاها را بهسابمیت فرم در بالا تعریف کردیم میدیم با متد پست و اینجا با نام یوزر دیتا سیو کردیم
    submitForm(userData, {method: 'POST'})
}

const navigation = useNavigation(); // استفاده از این هوک برای بررسی ارسال دیتاها به سرور که دارای سه مرحله است
const isSubmitting = navigation.state !== 'idle'; // اولین مرحله همین idle 

const isSuccessOperation = useActionData(); 


const navigate = useNavigate(); // برای ریدایرکت کردن به صفحه لاگین

const routeError = useRouteError(); // برای هندل کردن ارورها


useEffect(() => {

    if (isSuccessOperation) {
        setTimeout(() => {
            navigate('/login')  // با ست تایم میگیم بعد سه ثانیه بره صفحه لاگین
        }, 3000);
    }

}, [isSuccessOperation])



 const [showPassword, setShowPassword] = useState(false);
 const [showConfrimPassword, setShowConfrimPassword] = useState(false);

 const togglePasswordVisibility = () => {
     setShowPassword(!showPassword);
 };
 const toggleConfrimPasswordVisibility = () => {
    setShowConfrimPassword(!showConfrimPassword);
 };
     // Watch the value of the password input
     const passwordValue = watch('password', '');
     const passwordValue2 = watch('confirmPassword', '');

     // Check if the password contains any numeric character
     const containsNumber = /\d/.test(passwordValue);
     const containsNumber2 = /\d/.test(passwordValue);



  // for transltion
  
  const {t} = useTranslation();

 

  
 
  return (
    <>
    
                            <div className="text-center mt-4">
                                <img src={logo} style={{height: '100px'}}/>
                                <h1 className="h2">پلتفرم آموزش آنلاین</h1>
                                <p className="lead">
                                    جهت استفاده از ویژگی های پلتفرم آموزش آنلاین ثبت نام کنید
                                </p>
                                <p className="lead">
                                    قبلا ثبت نام کرده اید ؟
                                    <Link to="/login" className="me-2"> وارد شوید  </Link>
                                </p>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <div className="m-sm-4">

                                        <form onSubmit={handleSubmit(onSubmit)}>


                                        <div className="mb-3" >
                                                <label className="form-label">   موبایل </label>
                                                <input
                                                {...register('mobile', {
                                                    required: 'موبایل الزامی است',
                                                    minLength: 11,
                                                    maxLength: 11
                                                })}
                                                    className={`form-control form-control-lg ${errors.mobile && 'is-invalid'}`}
                                                />

                                                
                                                {errors.mobile && errors.mobile.type === "required" && (
                                                            <p className="text-danger small fw-bolder mt-1">
                                                                {errors.mobile?.message}
                                                             </p>
                                                         )}
                                                          {errors.mobile && (errors.mobile.type === "minLength" || errors.mobile.type === 'maxLength') && (
                                                            <p className="text-danger small fw-bolder mt-1">
                                                                موبایل باید 11 رقم باشد
                                                           </p>
                                                          )}
                                            </div>


                                            <div className="mb-3" style={{ position: 'relative' }}>
                                                <label className="form-label"> رمز عبور</label>
                                                <input
                                                    {...register('password', 
                                                    {required: 'رمز عبور الزامی است'})}
                                                    className={`form-control form-control-lg ${errors.password && 'is-invalid'}`} 
                                                    type={showPassword ? 'text' : 'password'}
                                                    style={{ paddingLeft: containsNumber ? '40px' : '10px' }}
                                                />

                                                        
                                                   { containsNumber && 
                                                    (<span
                                                        onClick={togglePasswordVisibility}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '72%',
                                                            left: '10px',
                                                            transform: 'translateY(-50%)',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                    </span>)
                                                    }
                                                    {errors.password && (
                                                    <p className="text-danger small fw-bolder mt-1">
                                                        {errors.password?.message}
                                                    </p>
                                                    )}
                                            </div>


                                            <div className="mb-3" style={{ position: 'relative' }}>
                                                <label className="form-label">  تکرار رمز عبور </label>
                                                <input
                                                    {...register('confirmPassword', {
                                                        required: 'تکرار رمز عبور الزامی است',
                                                        validate: value => {
                                                            if(watch('password') !== value) {
                                                                return "عدم تطابق رمز عبور"
                                                            }
                                                        }
                                                        })}
                                                    className={`form-control form-control-lg ${errors.confirmPassword && 'is-invalid'}`}
                                                    type={showConfrimPassword ? 'text' : 'password'}
                                                    style={{ paddingLeft: containsNumber2 ? '40px' : '10px' }}
                                                />

                                                    { containsNumber2 && 
                                                    (<span
                                                        onClick={toggleConfrimPasswordVisibility}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '72%',
                                                            left: '10px',
                                                            transform: `${errors.confirmPassword ? 'translateY(-110%)' : 'translateY(-50%)'}`,
                                                            cursor: 'pointer',
                                                        
                                                        }}
                                                    >
                                                            {showConfrimPassword ? <FaEyeSlash /> : <FaEye />}
                                                    </span>)
                                                    }





                                                {errors.confirmPassword &&
                                                                errors.confirmPassword.type === "required" && (
                                                                    <p className="text-danger small fw-bolder pt-1">
                                                                    {errors.confirmPassword?.message}
                                                                    </p>
                                                                )}
                                                                {errors.confirmPassword &&
                                                                errors.confirmPassword.type === "validate" && (
                                                                    <p className="text-danger small fw-bolder pt-1">
                                                                    {errors.confirmPassword?.message}
                                                                    </p>
                                                                )}

                                            </div>


                                            <div className="text-center mt-3">
                                                <button
                                                disabled = {isSubmitting}
                                                    type="submit"
                                                    className="btn btn-lg btn-primary"
                                                >
                                                    {
                                                        isSubmitting ? 'در حال انجام عملیات' : "ثبت نام کنید"
                                                    }
                                                </button>
                                            </div>
                                            {
                                                isSuccessOperation && (
                                                    <div className="alert alert-success text-success text-center p-2 mt-3">
                                                        عملیات با موفقیت انجام شد به صفحه ورود منتقل میشوید
                                                    </div>
                                                ) 
                                            }
                                            {
                                               routeError && (
                                                <div className="alert alert-danger text-danger p-2 mt-3">
                                                    {
                                                        routeError.response?.data.map((error) => (    // با استفاده از این هوک ریکت روتر هر خطایی که از قبیل تشابه شماره تماس و اندازه رمز عبور باشه با مپ فانکشین بررسی میکنیم و نمایش میدهیم
                                                            <p className="mb-0">
                                                                {error.description}    
                                                            </p>
                                                        ))                              // و برای نشان دادن این خطا در همان فایل روتر جی اس ایکس مشخص کردیم در مینجا نشان بده
                                                    }
                                                </div>
                                               ) 
                                            }
                                        </form>
                                    </div>
                                </div>
                            </div>

      
    </>
  )
}

export default Register;


// export const registerAction = async({request}) => {
//     const formData = await request.formData();
 //    const data = Object.fromEntries(formData);  // در فرم دیتا مقادیر به شکل کیلید ولیو است و با متد آبجکت و فرام اینتیریز به آبجکت تبدیلش میکنیم
 //    const response = await httpService.post('/users', data);
  //   return response.status === 200;
// }

//export async function registerAction({request}) {
 //   const formData = await request.formData();
 //    const data = Object.fromEntries(formData);  // در فرم دیتا مقادیر به شکل کیلید ولیو است و با متد آبجکت و فرام اینتیریز به آبجکت تبدیلش میکنیم
    //  const response = await httpService.post('/Users', data);
 //    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', data);
 //    return response.status === 201;
 // }
export async function registerAction({request}) {
    const formData = await request.formData();
     const data = Object.fromEntries(formData);  
     const response = await httpService.post('/users', data);
     return response.status === 200;
}
