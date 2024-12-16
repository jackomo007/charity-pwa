import { useDonationStore } from "../infrastructure/lib/store";
import { useQuery } from "@apollo/client";
import { GET_DONATIONS } from "../infrastructure/graphql/queries";
import client from "../infrastructure/services/apollo-client";
import { DashboardHeader } from "../presentation/components/dashboard/header";
import { StatsCard } from "../presentation/components/dashboard/stats-card";
import { calculateTotalDonations } from "../infrastructure/lib/utils";
import { DollarSign, Users, Gift } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../presentation/components/ui/tabs";
import { DonationChart } from "../presentation/components/dashboard/donation-chart";
import { RecentDonations } from "../presentation/components/dashboard/recent-donations";
import { AnalyticsView } from "../presentation/components/dashboard/analytics/analytics-view";
import { Toaster } from "../presentation/components/ui/toaster";
import { useEffect } from "react";

export default function Home() {
  const { data, fetchDonations } = useDonationStore((state) => ({
    data: state.data,
    fetchDonations: state.fetchDonations,
  }));

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <DashboardHeader />

        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard
            title="Total Donations"
            value={`$${calculateTotalDonations(data.donations)}`}
            description=""
            icon={DollarSign}
          />
          <StatsCard
            title="Active Donors"
            value="2"
            description=""
            icon={Users}
          />
          <StatsCard
            title="Causes Supported"
            value="3"
            description=""
            icon={Gift}
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
              <DonationChart />
              <RecentDonations />
            </div>
          </TabsContent>
          <TabsContent value="analytics">
            <AnalyticsView />
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </main>
  );
}
