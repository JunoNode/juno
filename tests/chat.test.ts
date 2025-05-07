import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChatContainer from "@/features/chat/ChatContainer";
import "@testing-library/jest-dom";
import * as api from "@/features/chat/chatApi";

// Mock GPT-4 API response
jest.spyOn(api, "fetchJunoReply").mockImplementation(async () => {
  return "Mock reply from Juno.";
});

describe("Juno Chat", () => {
  it("renders input and no messages initially", () => {
    render(<ChatContainer />);
    expect(screen.getByPlaceholderText("Ask Juno...")).toBeInTheDocument();
  });

  it("sends a message and receives a reply", async () => {
    render(<ChatContainer />);

    const input = screen.getByPlaceholderText("Ask Juno...");
    fireEvent.change(input, { target: { value: "What’s risky in my portfolio?" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() =>
      expect(screen.getByText("Mock reply from Juno.")).toBeInTheDocument()
    );

    expect(screen.getByText("What’s risky in my portfolio?")).toBeInTheDocument();
  });

  it("shows loading indicator while waiting for reply", async () => {
    render(<ChatContainer />);
    const input = screen.getByPlaceholderText("Ask Juno...");
    fireEvent.change(input, { target: { value: "Test" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(screen.getByText(/Juno is thinking/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByText(/Juno is thinking/i)).not.toBeInTheDocument()
    );
  });
});

