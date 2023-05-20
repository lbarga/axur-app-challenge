import GlobalLoader from "@/component/global-loader.tsx/global-loader";
import { ContextWrapper } from "@/context/_context";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Axur Test",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContextWrapper>
      <>
        <html lang="en">
          <head>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            ></link>
          </head>
          <body className={inter.className} suppressHydrationWarning={true}>
            <GlobalLoader />
            {children}
          </body>
        </html>
      </>
    </ContextWrapper>
  );
}
