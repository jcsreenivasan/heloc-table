"use client";

import { useState } from "react";
import SearchFilters from "@/components/SearchFilters";
import RateTable from "@/components/RateTable";

export default function Home() {
  // Incrementing this key remounts RateTable, triggering the fade-in animation
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--brand-page-bg)",
        padding: "40px 24px 72px",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div
          style={{
            background: "#ffffff",
            borderRadius: 16,
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          }}
        >
          {/* Filter section — grey rounded card for visual separation */}
          <div style={{ padding: "20px 24px 16px" }}>
            <div
              style={{
                background: "#f8fafc",
                borderRadius: 12,
                padding: "20px 24px",
              }}
            >
              <SearchFilters onSeeRates={() => setRefreshKey((k) => k + 1)} />
            </div>
          </div>

          {/* Rate cards — key forces remount + fade-in on See Rates click */}
          <div style={{ padding: "8px 24px 24px" }}>
            <RateTable key={refreshKey} />
          </div>
        </div>
      </div>
    </main>
  );
}
