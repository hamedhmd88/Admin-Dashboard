import logo from "@assets/images/logo.png"; // instead of from '../../../assets/images/logo.svg '
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, redirect, useNavigation, useRouteError, useSubmit } from "react-router-dom";
import { httpService } from "../../../core/http-service";
import axios from "axios";



function Login() {

    const {t} = useTranslation();

    const{register,  handleSubmit, formState:{errors}} =  useForm();

    const submitForm = useSubmit();
    const onSubmit = data => {
        submitForm(data, {method: 'POST'});
    };

    const navigation = useNavigation();

    const isSubmitting = navigation.state !== 'idle';

    const routeError = useRouteError();


  return (
    <>
        

      
                            <div className="text-center mt-4">
                                <img src={logo} style={{height: '70px', marginBottom: '18px'}}/>
                                <h1 className="h2"> {t('login.title')} </h1>
                                <p className="lead">
                                {t('login.introMessage')}
                                </p>
                                <p className="lead">
                                    {t('login.areNotRegistered')}
                                    <Link to="/register" className="me-2"> {t('login.register')} </Link>
                                </p>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <div className="m-sm-4">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mb-3">
                                                <label className="form-label"> {t('login.mobile')} </label>
                                                <input
                                                {...register('mobile', {
                                                    required: `${t('login.validation.mobileRequired')}`,
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
                                                                {t('register.validation.mobileLength')}
                                                           </p>
                                                          )}
                                     
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label"> {t('login.password')} </label>
                                                <input
                                                    {...register('password', 
                                                    {required: `${t('login.validation.passwordRequired')}`})}
                                                    className={`form-control form-control-lg ${errors.password && 'is-invalid'}`} 
                                                    type='password'
                                                    style={{ paddingLeft: '40px' }}
                                                />
                                                    {errors.password && (
                                                    <p className="text-danger small fw-bolder mt-1">
                                                        {errors.password?.message}
                                                    </p>
                                                    )}
                                            </div>
                                            <div className="text-center mt-3">
                                                <button
                                                    disabled={isSubmitting}
                                                    type="submit"
                                                    className="btn btn-lg btn-primary"
                                                >
                                                    

                                                    {
                                                        isSubmitting ? t('login.signingin') : t('login.signin')
                                                    }  

                                                </button>
                                            </div>

                                            {
                                                        routeError && (
                                                            <div className="alert alert-danger text-danger p-2 mt-3">
                                                            {
                                                                routeError.response?.data.map((error) => (   
                                                                <p className="mb-0">
                                                                    {t(`login.validation.${error.code}`)}
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


export async function loginAction({request}) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const respnse = await axios.post('https://react-mini-projects-api.classbon.com/users/login', data);

    if(respnse.status === 200) {
        localStorage.setItem('token', respnse?.data?.token);
        return redirect('/')
    }
}








export default Login;
