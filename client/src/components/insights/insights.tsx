import React from "react";
import { Trash2Icon } from "lucide-react";
import { cx } from "../../lib/cx.ts";
import styles from "./insights.module.css";
import type { Insight } from "../../schemas/insight.ts";

type InsightsProps = {
  insights: Insight[];
  className?: string;
};

export const Insights = ({ insights, className }: InsightsProps) => {
  const deleteInsight = async (id: number) => {
    try {
      const response = await fetch(`/api/insights/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete insight");
      }

      await response.json();
    } catch (error) {
      console.error(`Failed to delete insight ${id}:`, error);
    }
  };

  return (
    <div className={cx(className)}>
      <h1 className={styles.heading}>Insights</h1>
      <div className={styles.list}>
        {insights?.length ? (
          insights.map(({ id, text, createdAt, brand }) => (
            <div className={styles.insight} key={id}>
              <div className={styles["insight-meta"]}>
                <span>Brand: {brand}</span>
                <div className={styles["insight-meta-details"]}>
                  <span>{createdAt.toString()}</span>
                  <Trash2Icon
                    data-testid="delete-button"
                    className={styles["insight-delete"]}
                    onClick={() => deleteInsight(id)}
                  />
                </div>
              </div>
              <p className={styles["insight-content"]}>{text}</p>
            </div>
          ))
        ) : (
          <p>We have no insight!</p>
        )}
      </div>
    </div>
  );
};
