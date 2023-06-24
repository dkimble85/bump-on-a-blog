import { type AppType } from "next/dist/shared/lib/utils";

import "~/styles/globals.css";
import { Header } from "./components/Header";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Header className="flex flex-row items-center bg-orange-400 text-lg font-bold" />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
