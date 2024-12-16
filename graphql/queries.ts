import { gql } from "@apollo/client";

export const GET_DONATIONS = gql`
  query GetDonations {
    donations {
      id
      amount
      donorName
      month
    }
    metrics {
      label
      value
      type
    }
  }
`;

export const ADD_DONATION = gql`
  mutation AddDonation(
    $amount: Float!
    $donorName: String!
    $month: String!
    $category: String!
  ) {
    addDonation(
      amount: $amount
      donorName: $donorName
      month: $month
      category: $category
    ) {
      id
      amount
      donorName
      month
      category
    }
  }
`;
