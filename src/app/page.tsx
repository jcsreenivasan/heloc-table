import SearchFilters from "@/components/SearchFilters";
import RateTable from "@/components/RateTable";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--brand-page-bg)",
        padding: "40px 24px 72px",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        {/* Unified card: filters + results in one container */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 16,
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
            overflow: "visible",
          }}
        >
          {/* Top: filter section */}
          <div style={{ padding: "24px 28px 20px" }}>
            <SearchFilters />
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "#e5e7eb" }} />

          {/* Bottom: rate cards */}
          <div style={{ padding: "20px 28px 24px" }}>
            <RateTable />
          </div>
        </div>
      </div>
    </main>
  );
}
