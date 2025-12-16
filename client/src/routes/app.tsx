import React from "react";
import { useEffect, useState } from "react";
import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import styles from "./app.module.css";
import type { Insight } from "../schemas/insight.ts";

export const App = () => {
  const [insights, setInsights] = useState<Array<Insight>>([]);

  useEffect(() => {
    fetch(`/api/insights`).then(async (res) => {
      if (res.ok) {
        const response = await res.json();
        setInsights(response);
      } else {
        console.error("Failed to fetch insights");
      }
    });
  }, []);

  return (
    <main className={styles.main}>
      <Header />
      <Insights className={styles.insights} insights={insights} />
    </main>
  );
};
