import { FC, ReactNode } from "react";
import Footer from "./Footer";
import SimpleHeader from "./SimpleHeader";

const PublicLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <SimpleHeader />
      {children}
      <Footer />
    </>
  );
};

export default PublicLayout;
