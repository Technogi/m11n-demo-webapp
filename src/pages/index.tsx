import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";
import { IoMdOpen, IoMdInformationCircle, IoMdContact } from "react-icons/io";
const Button: React.FC<{ children: React.ReactNode; href: string }> = ({
  children,
  href,
}) => (
  <Link
    className="
      border-2 border-main-400 border-opacity-70 rounded-lg text-main-200 text-center p-2  transition-shadow items-center flex justify-center
      hover:bg-main-100 hover:border-none hover:shadow-lg hover:text-main-700"
    href={href}
  >
    {children}
  </Link>
);

const description =
  "A simple yet powerful cloud migration and modernization strategy";
const title = "M11n";
export default function HomePage() {
  return (
    <>
      <Head>
        <title>M11n | Technogi</title>
        <meta property="title" content={title} />
        <meta name="description" content={description} key="desc" />
        <meta property="og:title" content={title} key="title" />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://m11n-web-demo.io.technogi.com.mx/technogi.png"
        />
      </Head>
      <>
        <main className="bg-main-700 text-main-100 min-h-[calc(100vh_-_8em)] flex flex-row justify-center items-center p-5">
          <div className="container max-w-4xl mx-auto">
            <h1 className="text-center font-bold text-8xl ">M11n</h1>
            <div className="flex justify-center items-center">
              <span className="mr-2 text-xl">by</span>
              <Link href="https://www.technogi.com.mx">
                <img
                  alt="technogi"
                  src="/technogi-teal-light.png"
                  width={160}
                />
              </Link>
            </div>
            <p className="text-lg mb-16 mt-16 text-center">
              M11N es una estrategia de migración y modernización en la nube
              desarrollada por Technogi, construida sobre los principios del{" "}
              <a
                className="mx-1 underline hover:text-white"
                rel="noreferrer"
                target="_blank"
                href="https://learn.microsoft.com/en-us/archive/msdn-magazine/2009/february/best-practice-an-introduction-to-domain-driven-design"
              >
                Desarrollo Basado en Dominio
              </a>
              y implementada a través del patrón{" "}
              <a
                className="ml-1 underline hover:text-white"
                rel="noreferrer"
                target="_blank"
                href="https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing"
              >
                Event Sourcing
              </a>
              . M11N ofrece un enfoque rápido, simple y altamente eficiente para
              actualizar sus sistemas heredados y adoptar las últimas
              tecnologías en la nube.
              {/*M11N is a cloud migration and modernization strategy developed
                  by Technogi, built on the principles of Domain Driven
                  Development and implemented through the Event Sourcing
                  pattern. M11N offers a fast, simple, and highly efficient
                  approach to upgrading your legacy systems and embracing the
  latest cloud technologies.*/}
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
              <Button href="/about">Información</Button>
              <Button href="#">Contáctanos</Button>
              <Button href="#">
                <div className="flex justify-between items-center w-full">
                  <span>&nbsp;</span>
                  <span>Demo</span> <IoMdOpen />
                </div>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    </>
  );
}
