import PublicLayout from "@/components/PublicLayout";
import { NextPage } from "next";
import { FC, ReactNode } from "react";
import cx from "classnames";
import { BiRocket, BiTimer, BiVector, BiWindowAlt } from "react-icons/bi";
import { IconType } from "react-icons";

const Feature: FC<{ text: string; Icon: IconType }> = ({ Icon, text }) => (
  <div className="p-2 rounded-2xl bg-white flex items-center left-4">
    <Icon className=" text-secondary-600 mr-2" size={60} />
    <div className="text-center w-max">{text}</div>
  </div>
);

const UseCase: FC<{ children: ReactNode; title: string }> = ({
  title,
  children,
}) => (
  <div className="text-center p-4 rounded-2xl bg-white">
    <h4>{title}</h4>
    <div className="mt-4">{children}</div>
  </div>
);

type SectionVariant = "default" | "main" | "secondary" | "grey";
type SectionProps = {
  children: ReactNode;
  title?: ReactNode;
  variant?: SectionVariant;
};
const Section: FC<SectionProps> = ({ children, title, variant }) => {
  return (
    <section
      className={cx("py-16", {
        "bg-inherit": variant === "default",
        "bg-main-700": variant === "main",
        "bg-slate-50": variant === "grey",
        "bg-secondary-700": variant === "secondary",
        "text-main-50": variant === "main",
        "text-secondary-50": variant === "secondary",
      })}
    >
      {Boolean(title) && (
        <h2
          className={cx("text-center text-4xl  mb-10 ", {
            "text-main-800": variant === "default",
            "text-secondary-100": variant === "secondary",
          })}
        >
          {title}
        </h2>
      )}
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
};

const Post: FC<{ children: ReactNode; title: ReactNode }> = ({
  children,
  title,
}) => {
  return (
    <>
      <div>
        <div className="bg-main-700 pt-20 pb-20   ">
          <h1 className="text-center text-6xl px-5 text-main-100">{title}</h1>
        </div>

        {children}
      </div>
    </>
  );
};

const ListItem: FC<{ title: ReactNode; children: ReactNode }> = ({
  children,
  title,
}) => (
  <>
    <div className="uppercase text-lg">{title}</div>
    <div className="col-span-2">
      <hr className="border-main-700" />
    </div>
    <div className="col-span-3 ml-2 my-2">{children}</div>
  </>
);

const AboutPage: NextPage = () => {
  return (
    <PublicLayout>
      <main className="">
        <Post title="Modernización de Aplicaciones">
          <Section variant="grey">
            <p className="text-lg text-slate-800">
              Las empresas de base tecnológica requieren de un proceso{" "}
              <strong>eficiente</strong>, <strong>ágil</strong> y{" "}
              <strong>efectivo</strong> para mejorar y actualizar sus
              aplicaciones y soluciones basadas en software, con el fin de{" "}
              <strong>permanecer vigente</strong> en el mercado y continuar
              ofreciendo a sus clientes un alto nivel de valor a un{" "}
              <strong>precio competitivo</strong>.
            </p>
            <p className="mt-2">M11n es una estrategia que....</p>
          </Section>

          <Section title="Problemática" variant="default">
            <div className="grid grid-cols-6 items-center">
              <ListItem title="Tecnología Legacy">
                La tecnología de hace años, hoy está caduca y no escala
                adecuadamente para los requerimientos actuales y las
                posibilidades que ofrecen las nuevas tecnologías.
              </ListItem>
              <ListItem title="Sistemas Aislados">
                Gran parte de los sistemas de legado, tienen impedimentos para
                integrarse con otros sistemas, y con tecnologías modernas. Lo
                cual los hace unas piezas muy valiosas pero fácilmente
                sustituibles por soluciones más livianas y versátiles.
              </ListItem>
              <ListItem title="Dependencias Operativas">
                Aunque las empresas buscan evolucionar, la operación diaria es
                siempre la prioridad número principal, lo cual obliga al equipo
                responsable de evolucionar el negocio, deba volver
                constantemente a operar el mismo y la innovación se estanca.
              </ListItem>
              <ListItem title="Altos Costos">
                Costos elevados por mantenimiento del sistema, falta de
                visibilidad, baja productividad y falta de agilidad de la
                empresa para cumplir con las necesidades del mercado.
              </ListItem>
            </div>
          </Section>
          <Section
            title={
              <span className="text-secondary-700 font-bold">
                ¿Como encarar este reto?
              </span>
            }
            variant="grey"
          >
            <div>
              <p className="mb-10 text-center text-lg">
                Con una estrategia que en pocos días genere resultados, que sea
                fácil de implementar para la empresa y que siente las bases para
                una evolución constante del producto, logrando:
              </p>
              <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
                <Feature Icon={BiTimer} text="Invertir poco tiempo" />
                <Feature
                  Icon={BiWindowAlt}
                  text="Minimizar las modificaciones al sistema actual"
                />
                <Feature
                  Icon={BiRocket}
                  text="Acceso inmediato a nuevas tecnologías"
                />
                <Feature
                  Icon={BiVector}
                  text="Iniciar proceso de modernización"
                />
              </div>
            </div>
          </Section>
          <Section variant="secondary" title="Estrategia M11n">
            <p className="text-center mb-2">
              M11N es una estrategia de migración y modernización en la nube
              desarrollada por Technogi, construida sobre los principios del
              <strong>Domain Driven Development</strong> e implementada a través
              del patrón <strong>Event Sourcing</strong>.
            </p>
            <p className="text-center">
              M11N ofrece un enfoque rápido, sencillo y altamente eficiente para
              actualizar sus sistemas legacy y adoptar las últimas tecnologías
              en la nube.
            </p>
            <div className=" p-2 flex justify-center">
              <div className="bg-white p-6 rounded-2xl shadow">
                <img src="/images/m11n-arch.png" alt="diagram" />
              </div>
            </div>
          </Section>

          <Section variant="grey" title="Casos de uso">
            <div className="grid grid-cols-3 gap-4">
              <UseCase title="Reporte de consolidación de ventas">
                En construcción
              </UseCase>
              <UseCase title="Telemetría">En construcción</UseCase>
              <UseCase title="Desacople de monolitos">En construcción</UseCase>
            </div>
          </Section>
          <Section title="¿Por donde empiezo?">
            Link a Technogi y pasos{" "}
          </Section>
        </Post>
      </main>
    </PublicLayout>
  );
};

export default AboutPage;
