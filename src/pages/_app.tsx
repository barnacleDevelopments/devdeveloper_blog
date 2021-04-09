/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: index.tsx
*/

import React from "react";

// COMPONENTS
import ErrorNotification from "../components/ErrorNotification";

// HOOKS
import useError from "../hooks/useError";

// CONTEXTS
import ErrorContext from "../contexts/ErrorContext";

//GLOBAL STYLES
import "../styles/reset.css";
import "../styles/global.css";

// COMPONENTS
import Container from "../components/Container"
// TYPES 
import type { AppProps /*, AppContext */ } from "next/app"

// AUTH
import { UserProvider } from '@auth0/nextjs-auth0';
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {

  // error hook
  const ErrorContextData = useError();

  return (

    // auth0 provider
    <UserProvider>
      {/* error provider */}
      <ErrorContext.Provider value={ErrorContextData}>
        {/* app container layout */}
        <Container>
          <Head>
            <title>devdeveloper_blog</title>
            <link rel="icon" href="/img/logo_3.png" />
          </Head>
          {/* pages */}
          <Component {...pageProps} />
          {/* ERROR MESSAGES */}
          {ErrorContextData.currentError &&
            <ErrorNotification error={ErrorContextData.currentError} />}
        </Container>
      </ErrorContext.Provider>
    </UserProvider>


  )
}

export default MyApp
