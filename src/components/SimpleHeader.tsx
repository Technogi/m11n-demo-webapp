import cx from "classnames";
import { Container, Typography, Link as UILink } from "@mui/material";
import { teal } from "@mui/material/colors";
import Link from "next/link";
import { FC, ReactNode, useEffect, useState } from "react";
import { IoMdOpen } from "react-icons/io";

const To: FC<{ children: ReactNode; href: string; open?: boolean }> = ({
  children,
  href,
  open,
}) => (
  <Link
    href={href}
    rel="noreferrer"
    target={open ? "_blank" : undefined}
    className="text-main-100 hover:text-main-50 mr-4 hover:underline flex items-center justify-center"
  >
    {children}
  </Link>
);

const SimpleHeader: FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  const isScrolled = () => {
    const scrollTop = window.scrollY;
    setScrolled(scrollTop >= 180);
  };

  useEffect(() => {
    window.addEventListener("scroll", isScrolled);
    return () => {
      window.removeEventListener("scroll", isScrolled);
    };
  }, []);

  return (
    <>
      <header
        className={cx("bg-main-700 fixed w-screen transition-all", {
          "py-4 ": !scrolled,
          "shadow-lg": scrolled,
        })}
      >
        <div className="container px-2 text-white py-2 mx-auto ">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link
                href={"/"}
                className="mr-8 text-main-100 text-3xl font-bold border-r pr-6 border-main-200"
              >
                M11n
              </Link>
              <To href="/">Inicio</To>
              <To href="/about">Información</To>
              <To href="/contact">Contacto</To>
              <To href="/demo" open>
                Demo <IoMdOpen className="ml-1" />
              </To>
            </div>
            <div>
              <Link href="https://www.technogi.com.mx">
                <img
                  alt="technogi"
                  src="/technogi-teal-light.png"
                  width={160}
                />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className="h-10 bg-main-700">lñ</div>
    </>
  );
};
const SimpleHeaderOld: FC = () => (
  <header style={{ backgroundColor: teal[500], padding: "0.5em" }}>
    <Container
      style={{
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color={teal[50]}
        fontWeight={900}
      >
        <Link href="/" passHref legacyBehavior>
          <UILink color="inherit">M11n</UILink>
        </Link>
      </Typography>
    </Container>
  </header>
);

export default SimpleHeader;
