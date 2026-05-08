'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import ForestLoader from './ForestLoader';

export default function RouteTransitionLoader({ duration = 4500 }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // پہلی بار (initial mount) پر لوڈر نہ دکھائیں – یہ کام AppLoader کرے گا
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // جب بھی راستہ (pathname) بدلے، لوڈر شروع کریں
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [pathname, duration]);

  if (!loading) return null;

  return <ForestLoader fullScreen={true} />;
}