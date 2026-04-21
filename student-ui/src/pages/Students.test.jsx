import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Students from "./Students";
import API from "../api/axios";

vi.mock("../api/axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}));

describe("Students page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem("token", "valid-token");
    API.get.mockResolvedValue({
      data: {
        data: [
          { id: 1, name: "Alice", email: "alice@test.com", age: 20, course: "Math" }
        ]
      }
    });
  });

  it("renders students fetched from API", async () => {
    render(<Students />);

    expect(await screen.findByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Total students:", { exact: false })).toBeInTheDocument();
    expect(API.get).toHaveBeenCalledWith("/student");
  });

  it("shows validation error when required fields are missing", async () => {
    render(<Students />);
    await screen.findByText("Alice");

    fireEvent.click(screen.getByRole("button", { name: "Add Student" }));

    expect(await screen.findByText("Name, email and course are required.")).toBeInTheDocument();
    expect(API.post).not.toHaveBeenCalled();
  });

  it("deletes a student and refreshes the list", async () => {
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);
    API.delete.mockResolvedValueOnce({ data: {} });

    render(<Students />);
    await screen.findByText("Alice");

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    await waitFor(() => {
      expect(API.delete).toHaveBeenCalledWith("/student/1");
    });

    expect(await screen.findByText("Student deleted successfully.")).toBeInTheDocument();

    confirmSpy.mockRestore();
  });
});
