import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios"
import baseUrl from "../shared/baseUrl"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
  const [terms, setTerms] = useState(false);
  const url = `${baseUrl}register`
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "all" });

  const submit = async (data) => {

    const student = {
        firstname:data.firstname, 
        lastname: data.lastname,
        regNumber: data.regNumber,
        phoneNumber: data.phoneNumber,
        gender : data.gender,
        email : data.email,
        password : data.password
    
    }

    console.log(student);

    try{

        const response = await axios.post(url, student)

        console.log(response)

        if(response.status === 201){

            toast.success("Registered Successfully", {
                theme: "colored"
              })
              setTimeout(()=>{
                
                navigate('/login');
              },3000);
              
              
            }else{
              
                toast.error('Request Failed')
             
            }
            

    }catch(err){

        console.log(err)
    }

    
  };

  const password = watch("password");

  return (
    <section className="bg-gray-50 dark:bg-gray-900 pt-40">
        <ToastContainer />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6 "
              onSubmit={handleSubmit(submit)}
            >
              <div>
                <label
                  htmlFor="firstname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Firstname
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  {...register("firstname", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Alex"
                />
                {errors.firstname && (
                  <p className="text-sm text-red-500">
                    {" "}
                    First Name is required{" "}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Lastname
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  {...register("lastname", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Clinton"
                />
                {errors.lastname && (
                  <p className="text-sm text-red-500">
                    {" "}
                    Last Name is required{" "}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="regNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Student Reg. Number
                </label>
                <input
                  type="text"
                  name="regNumber"
                  id="regNumber"
                  {...register("regNumber", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Funai/2022/7789"
                />
                {errors.regNumber && (
                  <p className="text-sm text-red-500">
                    {" "}
                    Registration Number is required{" "}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  {...register("phoneNumber", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="09067543211"
                  
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-500">
                    {" "}
                    Phone Number is required{" "}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Gender
                </label>
                <select
                  id="gender"
                  {...register("gender", { required: true })}
                  autoComplete="gender"
                  defaultValue={"DEFAULT"}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white p-2.5 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm  dark:bg-gray-700  dark:border-gray-600"
                >
                  <option
                    value="DEFAULT"
                    disabled
                  >
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-sm text-red-500"> gender is required </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register("email", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  
                />
                {errors.email && (
                  <p className="text-sm text-red-500">
                    {" "}
                    Email Address is required{" "}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  {...register("password", { required: true })}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && (
                  <p className="text-sm text-red-500"> Password is required </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="confirm-password"
                  name="confirm-password"
                  id="confirm-password"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) =>
                      value === password || "passwords do not match",
                  })}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {" "}
                    confirm password is required {" "}
                  </p>
                )}
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    onChange={()=>setTerms(prev => !prev)}
                    {...register("terms", {
                      required: true,
                    })}
                    
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                  {errors.terms && (
                    <p className="text-sm text-red-500"> You must accept terms and Conditions </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                
                className="w-full cursor-pointer text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
