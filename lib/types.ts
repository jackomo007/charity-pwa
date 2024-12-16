export interface Donations {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface DonationFormData {
  amount: string;
  category: string;
  description: string;
}
