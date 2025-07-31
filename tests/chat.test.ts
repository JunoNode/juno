import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChatContainer from "@/features/chat/ChatContainer";
import "@testing-library/jest-dom";
import * as api from "@/features/chat/chatApi";

// Mock GPT-4 API response
jest.spyOn(api, "fetchJunoReply").mockImplementation(async () => {
  return "Mock reply from Juno.";
});

describe("ChatContainer (Juno Chat)", () => {
  beforeEach(() => {
    render(<ChatContainer />);
  });

  it("renders input field and no messages initially", () => {
    expect(screen.getByPlaceholderText("Ask Juno...")).toBeInTheDocument();
    expect(screen.queryByText("Mock reply from Juno.")).not.toBeInTheDocument();
  });

  it("sends a message and displays the assistant’s reply", async () => {
    const input = screen.getByPlaceholderText("Ask Juno...");
    fireEvent.change(input, { target: { value: "What’s risky in my portfolio?" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    // Wait for mock reply to appear
    await waitFor(() =>
      expect(screen.getByText("Mock reply from Juno.")).toBeInTheDocument()
    );

    expect(screen.getByText("What’s risky in my portfolio?")).toBeInTheDocument();
  });

  it("displays loading state while waiting for reply", async () => {
    const input = screen.getByPlaceholderText("Ask Juno...");
    fireEvent.change(input, { target: { value: "Test prompt" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(screen.getByText(/Juno is thinking/i)).toBeInTheDocument();

    // Wait for loading to resolve
    await waitFor(() =>
      expect(screen.queryByText(/Juno is thinking/i)).not.toBeInTheDocument()
    );
  });
});
