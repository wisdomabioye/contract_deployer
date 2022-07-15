import React, {Suspense, lazy} from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// hooks
import { useEagerConnect, useInactiveListener } from "hooks/connector";
// Components
import Spinner from "components/Spinner";
import Footer from "components/Footer";
import { TopNav } from "components/Navbar";

// theme
import { useAtom } from "jotai";
import { CText, CBg } from "store/theme";

import "./App.scss";

// pages
const Home = lazy(() => import("pages/Home"));
const ConnectWallet = lazy(() => import("pages/ConnectWallet"));
const NotFound = lazy(() => import("pages/NotFound"));

function App() {
  const [bg] = useAtom(CBg);
  const [text] = useAtom(CText);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();
  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  const themeClass = `${text} ${bg}`;

  return (
    <div style={{minHeight: "100vh"}} className={themeClass}>
      <Toaster 
        toastOptions={{
          duration: 5000,
          className: themeClass,
        }}
      />

      <Suspense fallback={<Spinner />}>
        <TopNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connect" element={<ConnectWallet />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
