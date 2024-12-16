import { create } from "zustand";
import { GetDonationsUseCase } from "../../application/donation/GetDonationsUseCase";
import { AddDonationUseCase } from "../../application/donation/AddDonationsUseCase";
import { Donation } from "../../domain/entities/Donation";

interface DonationStore {
  data: { donations: Donation[]; metrics: any[] };
  fetchDonations: () => Promise<void>;
  addDonation: (donation: Omit<Donation, "id" | "month">) => Promise<void>;
}

const getDonationsUseCase = new GetDonationsUseCase();
const addDonationUseCase = new AddDonationUseCase();

export const useDonationStore = create<DonationStore>((set) => ({
  data: { donations: [], metrics: [] },

  fetchDonations: async () => {
    const result = await getDonationsUseCase.execute();
    set(() => ({ data: result }));
  },

  addDonation: async (donation) => {
    const month = new Date()
      .toLocaleString("default", { month: "short" })
      .toUpperCase();

    const body = {
      amount: donation.amount,
      donorName: donation.donorName,
      month,
      category: donation.category,
    };
    const addedDonation = await addDonationUseCase.execute(body);

    set((state) => ({
      data: {
        ...state.data,
        donations: [
          ...state.data.donations,
          {
            ...donation,
            id: addedDonation.id,
            month: month,
          },
        ],
      },
    }));
  },
}));
