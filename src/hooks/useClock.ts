import { useEffect, useState } from "react";

interface ClockValue {
  time: string;
  date: string;
}

export function useClock(): ClockValue {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return {
    time: now.toLocaleTimeString("en-GB"),
    date: now.toISOString().slice(0, 10),
  };
}
