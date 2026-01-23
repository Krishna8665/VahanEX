// src/app/dashboard/page.tsx
import { Separator } from "@/components/ui/separator";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { SessionsTable } from "@/components/dashboard/SessionsTable";
import { PackageExpiries } from "@/components/dashboard/PackageExpires";
import { stats, sessions, packageExpiries } from "@/data/mockData";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Responsive container */}
      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="space-y-8 md:space-y-10 lg:space-y-12">
          {/* Header */}
          <header className="space-y-3 text-center sm:text-left">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              VahanEX - Driving Institute Management System
            </h1>
            <h2 className="text-xl font-medium text-muted-foreground md:text-2xl">
              Dashboard
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Welcome back! Here's what's happening today.
            </p>
          </header>
          <Separator className="my-6 md:my-8 lg:my-10" />
          {/* Stats Cards – 3×2 grid on md+, 2 columns on sm+, 1 on xs */}

        <section aria-labelledby="stats-title" className="space-y-2">
            <h3 id="stats-title" className="sr-only">
              Key Statistics
            </h3>

            {stats.length > 0 ? (
              <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {stats.map((stat, index) => (
                  <StatsCard key={index} stat={stat} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground text-lg font-medium">
                No statistics available at the moment
              </div>
            )}
          </section>
          {/* Two-column content on lg+ */}
          <section className="grid gap-8 md:gap-10 lg:grid-cols-2 xl:gap-12">
            {/* Today's Driving Sessions */}
            <div className="space-y-5">
              <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                Today's Driving Sessions
              </h3>
              <div className="rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <SessionsTable sessions={sessions} />
              </div>
            </div>

            {/* Package Expiries */}
            <div className="space-y-5">
              <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                Package Expiries
              </h3>
              <div className="rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <PackageExpiries items={packageExpiries} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
