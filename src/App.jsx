import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch } from 'react-redux';
import { DNA } from 'react-loader-spinner'

import Header from './components/Header/Header';
import AsideNav from './components/LeftAside/AsideNav'
import FooterNav from './components/FooterNav/MobileNavbar';
import RightAside from './components/RightAside/RightAside';
import getCurrentUser from './components/Api/UserApi/getCurrentUser';
import { login, logout } from './featured/authSlice';
import { ThemeProvider } from './components/Contexts/theme';

function App() {
  const [themeMode, setThemeMode] = useState(true);
  const dispatch = useDispatch();

  const { data: user, isLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (user) {
      dispatch(login({ userData: user.data }));
    } else {
      dispatch(logout());
    }

  }, [user])
  // Toggle dark mode and light mode 
  const toggleMode = () => {
    setThemeMode(!themeMode);
  };

  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark");
    document.querySelector('html').classList.add(themeMode ? "dark" : "light");
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, toggleMode }}>
      {!isLoading ? (
        <>
          <Header />
          <main className={`${themeMode ? 'dark' : 'light'} grid sm:grid-cols-12 `}>
            <SkeletonTheme
              baseColor={themeMode ? '#313131' : '#E0E0E0'}
              highlightColor={themeMode ? '#525252' : '#F0F0F0'}
            >
              <AsideNav />
              <Outlet />
              <RightAside />
              <FooterNav />
            </SkeletonTheme>
            <ToastContainer />
          </main>
        </>
      ) : (
        <div className='h-screen w-full flex flex-col justify-center items-center'>
          <DNA />
          <p className='text-2xl font-semibold text-white'>The Blog is waiting</p>
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
