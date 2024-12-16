import client from "../../infrastructure/services/apollo-client";
import { GET_DONATIONS } from "../../infrastructure/graphql/queries";
import { Donation } from "../../domain/entities/Donation";
import { Metric } from "../../domain/entities/Metric";

export class GetDonationsUseCase {
  async execute(): Promise<{ donations: Donation[]; metrics: Metric[] }> {
    const { data } = await client.query({ query: GET_DONATIONS });

    const donations = data.donations.map(
      (donation: any) =>
        new Donation(
          donation.id,
          donation.category,
          donation.amount,
          donation.donorName,
          donation.month
        )
    );

    const metrics = data.metrics.map(
      (metric: any) => new Metric(metric.label, metric.type, metric.value)
    );

    return { donations, metrics };
  }
}
