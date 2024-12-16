import client from "../../infrastructure/services/apollo-client";
import { ADD_DONATION } from "../../infrastructure/graphql/queries";
import { Donation } from "../../domain/entities/Donation";

export class AddDonationUseCase {
  async execute(donation: Omit<Donation, "id" | "month">): Promise<Donation> {
    const { data } = await client.mutate({
      mutation: ADD_DONATION,
      variables: donation,
    });

    return new Donation(
      data.addDonation.id,
      data.addDonation.category,
      data.addDonation.amount,
      data.addDonation.donorName,
      data.addDonation.month
    );
  }
}
