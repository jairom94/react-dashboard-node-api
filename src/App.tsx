import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/home.page";
import SignPage from "./pages/auth/signup-page";
import Layout from "./components/layout/layout";
import { lazy, Suspense } from "react";
import LoginLoader from "./components/ui/login-loader";
import AdvertsPage from "./pages/adverts/adverts-page";
import NewAdvertPage from "./pages/adverts/new-advert-page";
import AdvertPage from "./pages/adverts/advert-page";
// import RequireAuth from "./pages/auth/require-auth";
import NotFoundPage from "./pages/404/not-found";
import { LayoutAdverts } from "./components/layout/layout-adverts";
import Notfications from "./components/ui/notification/notifications";
import { NotificationContext } from "./components/ui/notification/context";
import useNotifications from "./components/ui/notification/useNotifications";
import ErrorBoundary from "./components/error/error-boundary";
// import LoginPage from "./pages/auth/login-page";
//package json dev concurrently \"npm:dev:vite\" \"npm:lint:watch\" \"npm:format:watch\"

const LoginPage = lazy(() => import("./pages/auth/login-page"));

function App() {
  const { addNoti,notifications,handleNotifications } = useNotifications()
  return (
    <>
    <NotificationContext.Provider value={{addNoti}}>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<HomePage />} />        
          <Route path="/adverts" element={<LayoutAdverts />}>
            <Route index element={
                <AdvertsPage />
              } />
            <Route path="new" element={
                <NewAdvertPage />
            } />
            <Route path=":advertId" element={
                <AdvertPage />            
              } />
          </Route>
          
        </Route>
        <Route path="/signup" element={<SignPage />} />
        <Route
          path="/login"
          element={
            <ErrorBoundary>
            <Suspense fallback={<LoginLoader />}>
              <LoginPage />
            </Suspense>
            </ErrorBoundary>
          }
        />   
        <Route path="/not-found" element={<NotFoundPage/>} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />  
      </Routes>
      <Notfications 
      notifications={notifications} 
      handleNotifications={handleNotifications}  
      />
    </NotificationContext.Provider>    
    </>
  );
}

export default App;
