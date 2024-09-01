import ThemeProvider from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { StoreProvider } from "@/store/store-provider";
import UserSessionProvider from "@/components/user-session-provider";

export const metadata: Metadata = {
  title: "Stock E-learning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <UserSessionProvider>
        <html lang="en" suppressHydrationWarning={true}>
          <body
            className="bg-white dark-bg bg-no-repeat bg-cover transition h-full"
          >
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>           
              {children}
              <Toaster position="bottom-center" reverseOrder={false} />
            </ThemeProvider>
          </body>
        </html>
      </UserSessionProvider>
    </StoreProvider>
  );
}
