import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
beforeEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});
test("dark mode toggles and persists across visits", () => {
  const { unmount } = render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Switch to dark mode" }));
  expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  expect(localStorage.getItem("portfolio-theme")).toBe("dark");
  unmount();
  render(<App />);
  expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  fireEvent.click(screen.getByRole("button", { name: "Switch to light mode" }));
  expect(document.documentElement).toHaveAttribute("data-theme", "light");
});
test("sample project opens and closes", () => {
  render(<App />);
  fireEvent.click(
    screen.getByRole("button", { name: /A quieter kind of brand/ }),
  );
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Close project" }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("profile photo enlarges, closes with Escape, and restores focus", () => {
  render(<App />);
  const trigger = screen.getByRole("button", { name: "Enlarge profile photo" });
  trigger.focus();
  fireEvent.click(trigger);
  expect(
    screen.getByRole("dialog", { name: /Profile photo of Jorge/ }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Close enlarged photo" }),
  ).toHaveFocus();
  expect(document.body.style.overflow).toBe("hidden");
  fireEvent.keyDown(window, { key: "Tab" });
  expect(
    screen.getByRole("button", { name: "Close enlarged photo" }),
  ).toHaveFocus();
  fireEvent.keyDown(window, { key: "Escape" });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(document.body.style.overflow).toBe("");
  expect(trigger).toHaveFocus();
});

test("photo closes using the close button or backdrop", () => {
  render(<App />);
  const trigger = screen.getByRole("button", { name: "Enlarge profile photo" });
  fireEvent.click(trigger);
  fireEvent.click(screen.getByRole("button", { name: "Close enlarged photo" }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  fireEvent.click(trigger);
  fireEvent.click(screen.getByRole("dialog").parentElement);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
