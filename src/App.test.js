import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "./App";
beforeEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});
test("dark mode toggles and persists across visits", () => {
  localStorage.setItem("portfolio-theme", "light");
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
test("repository project opens with its GitHub source and closes", () => {
  render(<App />);
  fireEvent.click(
    screen.getByRole("button", { name: "View CarmeLink project" }),
  );
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /View on GitHub/ })).toHaveAttribute(
    "href",
    "https://github.com/JorjDominic/CarmeLink",
  );
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

test("slideshow starts on load, continues on hover and after navigation, and can pause and resume", () => {
  jest.useFakeTimers();
  const { unmount } = render(<App />);
  try {
    expect(
      screen.getByRole("button", { name: "View CarmeLink project" }),
    ).toBeInTheDocument();
    fireEvent.mouseEnter(
      screen.getByRole("region", { name: "Selected projects" }),
    );
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(
      screen.getByRole("button", { name: "View ActiBind project" }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next project" }));
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(
      screen.getByRole("button", { name: "View SureShopPH project" }),
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Pause project slideshow" }),
    );
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    expect(
      screen.getByRole("button", { name: "View SureShopPH project" }),
    ).toBeInTheDocument();
    const play = screen.getByRole("button", { name: "Play project slideshow" });
    fireEvent.focus(play);
    fireEvent.click(play);
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(
      screen.getByRole("button", { name: "View Biyahe Bulacan project" }),
    ).toBeInTheDocument();
  } finally {
    unmount();
    jest.useRealTimers();
  }
});

test("slideshow navigation wraps and Biyahe Bulacan links to the repository", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Previous project" }));
  expect(
    screen.getByRole("button", { name: "View Biyahe Bulacan project" }),
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Next project" }));
  expect(
    screen.getByRole("button", { name: "View CarmeLink project" }),
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Show Biyahe Bulacan" }));
  fireEvent.click(
    screen.getByRole("button", { name: "View Biyahe Bulacan project" }),
  );
  expect(screen.getByRole("link", { name: /View on GitHub/ })).toHaveAttribute(
    "href",
    "https://github.com/JorjDominic/byahe-bulacan",
  );
});

test("first visit defaults to dark mode and remembers a switch to light", () => {
  const { unmount } = render(<App />);
  expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  fireEvent.click(screen.getByRole("button", { name: "Switch to light mode" }));
  unmount();
  render(<App />);
  expect(document.documentElement).toHaveAttribute("data-theme", "light");
});
