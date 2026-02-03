import { StatsCard } from "@/components/dashboard/StatsCard";
import { SessionsTable } from "@/components/dashboard/SessionsTable";
import { PackageExpiries } from "@/components/dashboard/PackageExpires";
import { stats, sessions, packageExpiries } from "@/data/mockData";

export default function DashboardPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Cards – 2 rows, 3 columns with more space between */}
      <section aria-labelledby="stats-title" className="space-y-3">
        <h2 id="stats-title" className="sr-only">
          Key Statistics
        </h2>

        {stats.length > 0 ? (
          <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-3 md:grid-cols-3">
            {stats.map((stat, index) => (
              <StatsCard key={index} stat={stat} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground text-sm md:text-base font-medium">
            No statistics available at the moment
          </div>
        )}
      </section>

      {/* Two-column content on lg+, single on smaller screens */}
      <section className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {/* Today's Driving Sessions */}
        <div className="space-y-3">
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Today's Driving Sessions
          </h3>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <SessionsTable sessions={sessions} />
          </div>
        </div>

        {/* Package Expiries */}
        <div className="space-y-3">
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Package Expiries
          </h3>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <PackageExpiries items={packageExpiries} />
          </div>
        </div>
      </section>
    </div>
  );
}
