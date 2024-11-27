import { useState, useEffect } from "react";

export function useFintoc() {
  const [fintoc, setFintoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.fintoc.com/v1/";
    script.async = true;

    script.onload = () => {
      setFintoc(window.Fintoc || null);
      setLoading(false);
    };

    script.onerror = () => {
      setError(new Error("Failed to load Fintoc script"));
      setLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return [fintoc, loading, error];
}
