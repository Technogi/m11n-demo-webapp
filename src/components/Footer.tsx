import config from "next/config";
import Link from "next/link";

const { publicRuntimeConfig } = config() || {};

function Copyright() {
  return (
    <div className="text-center text-slate-400 pt-4">
      {"Copyright © "}
      <Link color="inherit" href="https://technogi.com.mx/">
        Technogi
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </div>
  );
}
export default function Footer() {
  return (
    <footer className="bg-slate-900">
      <div className="bg-slate-700 py-4 text-slate-200 text-center">
        Keeping IT Simple since 2012
      </div>
      <div>
        <Copyright />
      </div>
      <div className="p-4 text-slate-400 text-xs text-right">
        {" "}
        v{publicRuntimeConfig?.version}
      </div>
    </footer>
  );
}
