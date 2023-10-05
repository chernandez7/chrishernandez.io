import "./global.css";
import { Fira_Mono } from "next/font/google";

export const firaMono = Fira_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-mono",
});

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} className={firaMono.className} />;
}
