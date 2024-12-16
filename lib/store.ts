import { create } from "zustand";
import { DonationResponseData } from "../domain/interfaces/DonationResponse";
import { DonationData } from "../domain/interfaces/DonationData";

interface DonationStore {
  data: DonationResponseData;
  setDonationsData: (donations: Partial<DonationResponseData>) => void;
  addDonation: (donation: DonationData) => void;
}

export const useDonationStore = create<DonationStore>((set) => ({
  data: {
    donations: [],
    metrics: [],
  },

  setDonationsData: (donations) =>
    set((state) => ({
      data: {
        ...state.data,
        ...donations,
      },
    })),

  addDonation: (donation: Omit<DonationData, "id" | "month">) =>
    set((state) => {
      const lastId = state.data.donations.reduce(
        (maxId, donation) => Math.max(maxId, parseInt(donation.id, 10)),
        0
      );

      return {
        data: {
          ...state.data,
          donations: [
            ...state.data.donations,
            {
              ...donation,
              id: (lastId + 1).toString(),
              month: new Date()
                .toLocaleString("default", { month: "short" })
                .toUpperCase(),
            },
          ],
        },
      };
    }),
}));
