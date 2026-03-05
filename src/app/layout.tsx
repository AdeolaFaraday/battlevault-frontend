import type { Metadata } from "next";
import { Toaster } from "sonner";
import { ApolloWrapper } from "./ApolloWrapper";
import StoreProvider from "./StoreProvider";
import "./globals.css";


const LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/battlevault.firebasestorage.app/o/uploads%2Fcommon%2Fbattlevault-logo-white.png?alt=media&token=112e1614-1aed-461e-9768-113e4680103e";

export const metadata: Metadata = {
  title: "BattleVault – Compete. Win. Dominate.",
  description:
    "BattleVault is the ultimate competitive gaming platform where players battle it out in tournaments, ludo, and more. Enter the vault and claim your victory.",
  icons: {
    icon: LOGO_URL,
    shortcut: LOGO_URL,
    apple: LOGO_URL,
  },
  openGraph: {
    title: "BattleVault – Compete. Dominate.",
    description:
      "BattleVault is the ultimate competitive gaming platform where players battle it out in tournaments, ludo, and more. Enter the vault and claim your victory.",
    url: "https://battlevault.app",
    siteName: "BattleVault",
    images: [
      {
        url: LOGO_URL,
        width: 1200,
        height: 630,
        alt: "BattleVault – Compete. Win. Dominate.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BattleVault – Compete. Win. Dominate.",
    description:
      "BattleVault is the ultimate competitive gaming platform where players battle it out in tournaments, ludo, and more. Enter the vault and claim your victory.",
    images: [LOGO_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap" rel="stylesheet" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5375644953228251"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors position="top-right" />
        <ApolloWrapper>
          <StoreProvider>
            {children}
          </StoreProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
