import { DonationData } from "./DonationData";
import { MetricData } from "./MetricData";

export interface DonationResponseData {
  donations: DonationData[];
  metrics: MetricData[];
}

export interface DonationChartProps {
  data: DonationResponseData;
}
