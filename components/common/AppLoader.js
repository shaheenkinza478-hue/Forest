'use client';
import { useState, useEffect } from 'react';
import ForestLoader from './ForestLoader';

export default function AppLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 سیکنڈ بعد ختم – آپ چاہیں تو بڑھا سکتے ہیں
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return <ForestLoader fullScreen={true} />;
}