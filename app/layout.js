import { Playfair_Display, Inter } from "next/font/google";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import "@/app/_styles/globals.css";
import { ToastContainer } from "react-toastify";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
  title: "Luxury Car Rentals",
  description: "Premium car rental service with modern web design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${playfair.className} ${inter.className} bg-brand-900 text-brand-100`}
      >
        <ToastContainer position="top-center" autoClose={3000} />
        <Header />

        <main className="w-full max-w-9xl mx-auto min-h-[80vh] px-4 sm:px-6 lg:px-8">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
