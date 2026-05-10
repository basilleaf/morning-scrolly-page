"use client";

import { useState } from "react";

type Severity = "low" | "medium" | "high";

interface NewsItem {
  headline: string;
  severity: Severity;
}

interface CheckResult {
  status: "all_clear" | "heads_up";
  summary: string;
  items: NewsItem[];
}

const severityColor: Record<Severity, string> = {
  high: "#E24B4A",
  medium: "#EF9F27",
  low: "#888780",
};

export default function NewsDigest() {
  const [result, setResult] = useState<CheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const check = () => {
    setLoading(true);
    setError(null);
    fetch("/api/news-check", { method: "POST" })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data?.summary ?? `HTTP ${res.status}`);
        return data;
      })
      .then((data: CheckResult) => setResult(data))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Something went wrong"),
      )
      .finally(() => setLoading(false));
  };

  const isAllClear =
    !result || result.status === "all_clear" || result.items.length === 0;
  const hasHigh = result?.items.some((i) => i.severity === "high");
  const dotColor = isAllClear ? "#1D9E75" : hasHigh ? "#E24B4A" : "#EF9F27";

  if (!result && !loading && !error) {
    return (
      <div style={{ fontFamily: "inherit" }}>
        <button
          onClick={check}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "#F5F5F5",
            border: "none",
            borderRadius: 99,
            padding: "7px 14px",
            fontSize: 13,
            color: "#888",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          <span>📡</span>
          <span>Check news</span>
        </button>
        <p style={{ fontSize: "11px", color: "#bbb", margin: "8px 0 0" }}>
          94546 · Castro Valley
        </p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "inherit" }}>
      <div
        style={{
          borderRadius: "10px",
          border: "1px solid #e5e5e5",
          padding: "0.875rem 1rem",
          minHeight: "60px",
        }}
      >
        {error ? (
          <p style={{ fontSize: "14px", color: "#E24B4A", margin: 0 }}>
            {error}
          </p>
        ) : (
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
          >
            <div
              style={{
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                background: loading ? "#ccc" : dotColor,
                flexShrink: 0,
                marginTop: "5px",
                transition: "background 0.3s",
              }}
            />
            <div>
              <p
                style={{
                  fontSize: "14px",
                  margin: 0,
                  color: loading ? "#aaa" : "inherit",
                }}
              >
                {loading ? "checking…" : result?.summary}
              </p>
              {result && result.items.length > 0 && (
                <ul
                  style={{
                    margin: "8px 0 0",
                    padding: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  {result.items.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "7px",
                        fontSize: "13px",
                        color: "#555",
                      }}
                    >
                      <div
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: severityColor[item.severity],
                          flexShrink: 0,
                          marginTop: "4px",
                        }}
                      />
                      {item.headline}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
      <p style={{ fontSize: "11px", color: "#bbb", margin: "6px 0 0" }}>
        94546 · Castro Valley
      </p>
    </div>
  );
}
