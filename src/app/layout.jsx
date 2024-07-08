import { Bree_Serif, Lilita_One, Passion_One, Patua_One } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/navbars/Navbar";

const lilitaOne = Lilita_One({
  subsets: ["latin"],
  variable: "--font-lilita-one",
  weight: "400",
  display: 'swap',
  adjustFontFallback: false
});

const passionOne = Passion_One({
  subsets: ["latin"],
  variable: "--font-passion-one",
  weight: "400",
  display: 'swap',
  adjustFontFallback: false
});

const breeSerif = Bree_Serif({
  subsets: ['latin'],
  variable: '--font-bree-serif',
  weight: '400',
  display: 'swap',
  adjustFontFallback: false
})

const patuaOne = Patua_One({
  subsets: ['latin'],
  variable: '--font-patua-one',
  weight: '400',
  display: 'swap',
  adjustFontFallback: false
})

export const metadata = {
  title: "Zaxch Finance",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${lilitaOne.variable} ${passionOne.variable} ${breeSerif.variable} ${patuaOne.variable}`}>
        <AuthProvider>

          <Navbar />
          
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}