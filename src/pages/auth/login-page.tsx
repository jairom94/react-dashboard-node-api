import { useEffect, useRef, useState } from "react";
// import FormField from "../../components/ui/form-field";
import type { Login } from "./types";
// import ButtonCustom from "../../components/ui/button";
import { AxiosError } from "axios";
import { LogIn } from "./service";
import LoginLoader from "../../components/ui/login-loader";
import { useAuth } from "./context";
import { useLocation, useNavigate } from "react-router";
import { useUserInformation } from "./me/context";
// import useNotifications from "../../components/ui/notification/useNotifications";
// import Notfications from "../../components/ui/notification/notifications";
import { useNotification } from "../../components/ui/notification/context";
import { createFormFactory } from "../../components/forms/FormFactory";


const LoginPage = () => {
  // const [credentials, setCredentials] = useState<Login>();
  const credentials =  useRef<Login>({
    email: "",
    password: "",
    remember:false
  })
  const { isLogged, onLogin } = useAuth();
  const { onUserLogged } = useUserInformation();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();  

  const { addNoti } = useNotification();  

  useEffect(() => {
    if (isLogged) {
      navigate("/", { replace: true });
    }
  }, [isLogged, navigate]);  
  const { Form, Input } = createFormFactory<Login>();  

  async function handleLogin(values:Login){
    // (values) => console.log(values)
    try {
      //   setIsLogin(true);
      setIsLoading(true);
      // await LogIn({ email, password }, rememberMe);
      await LogIn(values)
      onLogin();
      onUserLogged();
      addNoti({
        message: "Login success",
        id: crypto.randomUUID(),
        type: "success",
        createdAt: Date.now(),
      });
      const to = location.state?.from ?? "/";
      navigate(to, { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        addNoti({
          message: `${error.response?.data.message} - ${error.response?.data.statusCode}`,
          type: "error",
          id: crypto.randomUUID(),
          createdAt: Date.now(),
        });
        credentials.current = {...values}
        // alert(error);
      }
    } finally {
      setIsLoading(false);
    }  
  }

  if (isLoading) {
    return <LoginLoader />;
  }

  return (
    <>
      {isLogged ? (
        <LoginLoader />
      ) : (
        <div className="flex min-h-dvh items-center justify-center bg-gray-800">
          <div className="md:container-md container flex flex-col gap-3 rounded-lg bg-white px-5 py-8">
           <h3 className="text-2xl font-medium text-gray-800">
              Formulario de inicio de sesión
          </h3>
          <Form
            initialValue={credentials.current}
            // onChange={setCredentials}
            onSubmit={handleLogin}
            className="flex flex-col gap-2"
          >
            <Input name="email" type="email" label="E-mail" />
            <Input name="password" type="password" label="Contraseña" />
            <Input name="remember" type="checkbox" id="remenber" label="Recordar contraseña" />            
            <Input 
            name="enviar" 
            type="submit" 
            // disabled={isDisabled}
            className="bg-emerald-600 hover:bg-emerald-500 transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            />
          </Form>
          </div>
          {/* <div className="md:container-md container flex flex-col gap-3 rounded-lg bg-white px-5 py-8">
            <h3 className="text-2xl font-medium text-gray-800">
              Formulario de inicio de sesión
            </h3>
            <form
              onSubmit={handleSubmit}
              className="flex flex-1 flex-col justify-center gap-3"
            >
              <FormField
                id="email"
                label="E-mail"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
              />
              <FormField
                id="password"
                label="Contraseña"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
              />
              <div>
                <label htmlFor="remenber">
                  Recordar contraseña
                  <input
                    checked={rememberMe}
                    onChange={(e) => {
                      setRememberMe(e.target.checked);
                    }}
                    type="checkbox"
                    name="remenber"
                    id="remenber"
                  />
                </label>
              </div>
              <ButtonCustom
                disabled={isDisabled}
                className="cursor-pointer rounded-lg bg-emerald-400 py-3 font-bold tracking-wide text-white transition-colors duration-300 ease-linear hover:bg-emerald-700 disabled:pointer-events-none disabled:opacity-50"
              >
                Login
              </ButtonCustom>
            </form>
          </div> */}
        </div>
      )}
    </>
  );
};

export default LoginPage;
