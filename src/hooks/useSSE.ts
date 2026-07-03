import { useEffect, useRef, useState } from "react";

interface MaterialEvent {
  name: string;
  color: string;
}

export function useSSE(url: string) {
  const [materials, setMaterials] = useState<MaterialEvent | null>(null);
  const [connected, setConnected] = useState(false);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const es = new EventSource(url);
    esRef.current = es;

    es.onopen = () => setConnected(true);

    es.addEventListener("material-update", (event) => {
      const parsed = JSON.parse(event.data);
      setMaterials(parsed);
    });

    es.onerror = () => setConnected(false);

    return () => es.close();
  }, [url]);

  return { materials, connected };
}
