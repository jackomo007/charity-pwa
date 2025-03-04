"use client";

import { DonationDialog } from "./donation/donation-dialog";

export function DashboardHeader() {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your charitable giving and impact.
        </p>
      </div>
      <DonationDialog />
    </div>
  );
}
