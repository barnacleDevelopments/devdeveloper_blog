/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: index.tsx
*/

// DEPENCIES
import React from "react";

//GLOBAL STYLES
import "../styles/reset.css";
import "../styles/global.css";

// COMPONENTS
import ErrorNotification from "../components/ErrorNotification";

// HOOKS
import useError from "../hooks/useError";

// CONTEXTS
import ErrorContext from "../contexts/ErrorContext";

// COMPONENTS
import Container from "../components/Container"
import Head from "next/head"

// TYPES 
import type { AppProps /*, AppContext */ } from "next/app"

// AUTH
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }: AppProps) {

  // error hook
  const ErrorContextData = useError();

  return (
    <>
      <Head>
        <title>devdevloper_blog</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/img/logo_3.png" type="image/x-icon" />
      </Head>
      <UserProvider>
        {/* error provider */}
        <ErrorContext.Provider value={ErrorContextData}>
          {/* app container layout */}
          <Container>
            {/* pages */}
            <Component {...pageProps} />
            {/* ERROR MESSAGES */}
            {ErrorContextData.currentError &&
              <ErrorNotification error={ErrorContextData.currentError} />}
          </Container>
        </ErrorContext.Provider>
      </UserProvider>
    </>
  )
}

export default MyApp
