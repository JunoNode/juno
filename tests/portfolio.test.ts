import { render, screen, waitFor } from "@testing-library/react";
import PortfolioPanel from "@/features/portfolio/PortfolioPanel";
import { WalletProvider } from "@/context/WalletProvider";
import * as api from "@/lib/api";

jest.mock("@/lib/api");

const mockedGetTokenBalances = api.getTokenBalances as jest.Mock;
const mockedGetTokenSecurity = api.getTokenSecurity as jest.Mock;

const mockTokens = {
  items: [
    {
      contract_address: "Token1Addr",
      contract_name: "Jungle Token",
      contract_ticker_symbol: "JGL",
      balance: "1000000000", // 10 tokens w/ 8 decimals
      contract_decimals: 8,
      quote: 500,
      logo_url: "",
    },
  ],
};

const mockRiskFlags = {
  token1addr: {
    is_mintable: "1",
    can_take_back_ownership: "0",
  },
};

describe("PortfolioPanel", () => {
  beforeEach(() => {
    mockedGetTokenBalances.mockResolvedValue(mockTokens);
    mockedGetTokenSecurity.mockResolvedValue(mockRiskFlags);
  });

  it("renders loading state initially", () => {
    render(
      <WalletProvider>
        <PortfolioPanel />
      </WalletProvider>
    );
    expect(screen.getByText(/Loading your assets/i)).toBeInTheDocument();
  });

  it("displays token name, balance, and risk badge", async () => {
    render(
      <WalletProvider>
        <PortfolioPanel />
      </WalletProvider>
    );

    await waitFor(() =>
      expect(screen.getByText("JGL")).toBeInTheDocument()
    );

    expect(screen.getByText("Jungle Token")).toBeInTheDocument();
    expect(screen.getByText("$500.00")).toBeInTheDocument();
    expect(screen.getByText(/Mintable/)).toBeInTheDocument(); // from parsed risk
  });
});

