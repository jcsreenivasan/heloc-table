import SearchFilters from "@/components/SearchFilters";
import RateTable from "@/components/RateTable";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--brand-page-bg)",
        padding: "32px 24px 64px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Page heading */}
        <div style={{ marginBottom: 24 }}>
          <h1
            style={{
              margin: "0 0 6px",
              fontSize: 28,
              fontWeight: 800,
              color: "var(--brand-text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Today&apos;s Best HELOC Rates
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 15,
              color: "var(--brand-text-secondary)",
            }}
          >
            Compare rates from top lenders — updated daily.
          </p>
        </div>

        {/* Search filter bar */}
        <div style={{ marginBottom: 20 }}>
          <SearchFilters />
        </div>

        {/* Rate table */}
        <RateTable />
      </div>
    </main>
  );
}
