import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type {LinksFunction} from "@remix-run/node";

import "./tailwind.css";

export const links: LinksFunction = () => [
    {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
    },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Infant:ital,wght@0," +
            "300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Gloock&" +
            "family=IBM+Plex+Sans+JP:wght@300;400;500;600;700&family=Instrument+Sans:ital," +
            "wght@0,400..700;1,400..700&family=Manuale:ital,wght@0,300..800;1,300..800&" +
            "display=swap",
    }
];

export function Layout({children}: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <Meta/>
        <Links/>
      </head>
      <body>
      {children}
      <ScrollRestoration/>
      <Scripts/>
      </body>
      </html>
  );
}

export default function App() {
  return <Outlet/>;
}
