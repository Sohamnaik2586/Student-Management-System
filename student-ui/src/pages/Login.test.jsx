import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";
import API from "../api/axios";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

vi.mock("../api/axios", () => ({
  default: {
    post: vi.fn()
  }
}));

describe("Login page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("shows validation error when fields are empty", async () => {
    render(<Login />);

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(await screen.findByText("Please enter both username and password.")).toBeInTheDocument();
    expect(API.post).not.toHaveBeenCalled();
  });

  it("logs in and navigates to students on success", async () => {
    API.post.mockResolvedValueOnce({ data: { token: "token-123" } });

    render(<Login />);

    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "admin" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password" } });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(API.post).toHaveBeenCalledWith("/auth/login", null, {
        params: { username: "admin", password: "password" }
      });
    });

    expect(localStorage.getItem("token")).toBe("token-123");
    expect(mockNavigate).toHaveBeenCalledWith("/students");
  });
});
