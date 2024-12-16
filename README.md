# Charity Dashboard PWA

A modern **Progressive Web Application** (PWA) for managing charitable donations, built using **Next.js**, **TypeScript**, and **TailwindCSS**. This project follows **Clean Architecture** principles to ensure a clean, scalable, and maintainable codebase.

---

## 🚀 **Key Features**

- **Clean Architecture**: Organized into layers for scalability and clarity.
- **Progressive Web App (PWA)**: Offline support enabled with `next-pwa`.
- **GraphQL with Apollo Client**: Efficient data fetching and management.
- **Zustand State Management**: Lightweight and efficient global state management.
- **TailwindCSS**: Modern, responsive, and utility-first styling.
- **Reusable Components**: Modular, consistent, and reusable UI components.
- **TypeScript**: Static typing for better development and fewer runtime errors.

---

## 📁 **Project Structure**

The project is organized following **Clean Architecture** principles:

```plaintext
charity-pwa/
├── public/                         # Static assets
├── src/
│   ├── domain/                     # Domain layer
│   │   ├── entities/               # Core business entities (Donation, Metric)
│   │   ├── enums/                  # Enums for domain logic
│   │   └── interfaces/             # TypeScript interfaces
│   │
│   ├── application/                # Application layer (use cases)
│   │   └── donation/               # Use cases for donations
│   │       ├── AddDonationUseCase.ts
│   │       └── GetDonationsUseCase.ts
│   │
│   ├── infrastructure/             # Infrastructure layer
│   │   ├── graphql/                # GraphQL queries and mutations
│   │   ├── lib/                    # Zustand store and utility functions
│   │   ├── services/               # Apollo Client configuration
│   │   └── hooks/                  # Custom hooks (e.g., use-toast)
│   │
│   ├── presentation/               # Presentation layer (UI)
│   │   ├── components/             # Reusable and feature-specific components
│   │   └── pages/                  # Next.js pages
│   │
│   ├── styles/                     # Global styles (TailwindCSS)
│   └── next.config.js              # Next.js configuration
└── README.md                       # Project documentation
```

## 🛠️ **Installation**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/charity-pwa.git
   cd charity-pwa

   ```

2. **Install dependencies**:

   ```bash
   npm install

   ```

3. **Run the development server**:

   ```bash
   npm run dev

   ```

## 🔧 **Technical Design**

### **Clean Architecture**

The project is divided into four main layers:

1. **Domain Layer**:

   - Contains core business logic such as entities (`Donation`, `Metric`), enums, and interfaces.

2. **Application Layer**:

   - Use cases encapsulate application-specific actions, like `AddDonationUseCase` and `GetDonationsUseCase`.

3. **Infrastructure Layer**:

   - Handles external integrations:
     - **GraphQL** queries and mutations with Apollo Client.
     - **Zustand** for global state management.
     - Custom hooks and utility functions.

4. **Presentation Layer**:
   - Contains the React components and Next.js pages.
   - Focuses on UI rendering using TailwindCSS for modern styling.

---

## 🛠️ **Key Components**

### **State Management with Zustand**

Global state management is implemented using Zustand for simplicity and flexibility.

**Example of the Donation Store**:

```typescript
import { create } from "zustand";
import { GetDonationsUseCase } from "../../application/donation/GetDonationsUseCase";
import { AddDonationUseCase } from "../../application/donation/AddDonationUseCase";
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
    const addedDonation = await addDonationUseCase.execute(donation);
    set((state) => ({
      data: {
        ...state.data,
        donations: [...state.data.donations, addedDonation],
      },
    }));
  },
}));
```

### **GraphQL Integration with Apollo Client**

GraphQL queries and mutations are defined in the **infrastructure** layer.

#### **Example Query**

```typescript
import { gql } from "@apollo/client";

export const GET_DONATIONS = gql`
  query GetDonations {
    donations {
      id
      amount
      donorName
      month
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
```

## 🧩 **Future Improvements**

Given more time, the following features could be added:

1. **Authentication**: User login and role-based access control.
2. **Advanced Analytics**: Filters and interactive charts for donation insights.
3. **Pagination**: Server-side pagination for handling large datasets efficiently.
4. **Offline Functionality**: Enhance PWA capabilities by caching donations locally.
5. **Localization**: Support for multiple languages and regional settings.
6. **Dark Mode**: Implement a theme switcher for light and dark modes.
7. **Testing**: Add unit tests with **Jest** and end-to-end testing with **Cypress**.
