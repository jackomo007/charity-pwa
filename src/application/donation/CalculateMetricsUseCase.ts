import { Donation } from "../../domain/entities/Donation";

export class CalculateMetricsUseCase {
  execute(donations: Donation[]) {
    return donations.reduce((total, donation) => total + donation.amount, 0);
  }
}
