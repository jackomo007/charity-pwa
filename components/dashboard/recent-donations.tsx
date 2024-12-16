"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useDonationStore } from "../../lib/store";

export function RecentDonations() {
  const donations = useDonationStore((state) => state.data.donations);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Donations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {donations.length === 0 ? (
            <p className="text-muted-foreground">No donations yet</p>
          ) : (
            donations
              .slice(-5)
              .reverse()
              .map((donation, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{donation.category}</p>
                    <p className="text-sm text-muted-foreground">
                      {donation.donorName}
                    </p>
                  </div>
                  <p className="font-semibold">${donation.amount.toFixed(2)}</p>
                </div>
              ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
