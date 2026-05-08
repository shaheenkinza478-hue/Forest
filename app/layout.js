import { LanguageProvider } from '@/hooks/useLanguage';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AppLoader from '@/components/common/AppLoader';
import RouteTransitionLoader from '@/components/common/RouteTransitionLoader';
import './globals.css';

export const metadata = {
  title: 'Forest Explorer | Discover Nature',
  description: 'Explore the magical forest world...',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <AppLoader />
          <RouteTransitionLoader duration={900} />
          <div className="relative z-10 flex min-h-screen flex-col bg-white">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}