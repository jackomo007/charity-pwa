import { useDonationStore } from "../lib/store";
import { useQuery } from "@apollo/client";
import { GET_DONATIONS } from "../graphql/queries";
import client from "../services/apollo-client";
import { DashboardHeader } from "../components/dashboard/header";
import { StatsCard } from "../components/dashboard/stats-card";
import { calculateTotalDonations } from "../lib/utils";
import { DollarSign, Users, Gift } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { DonationChart } from "../components/dashboard/donation-chart";
import { RecentDonations } from "../components/dashboard/recent-donations";
import { AnalyticsView } from "../components/dashboard/analytics/analytics-view";
import { Toaster } from "../components/ui/toaster";

export default function Home() {
  const setDonationsData = useDonationStore((state) => state.setDonationsData);
  const { loading, error, data } = useQuery(GET_DONATIONS, { client });

  if (loading) return <p>Loading donations...</p>;
  if (error) return <p>Error loading donations: {error.message}</p>;

  if (!loading && !error && data) {
    setDonationsData(data);
  }

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
