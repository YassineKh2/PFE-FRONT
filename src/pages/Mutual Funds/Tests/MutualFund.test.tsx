import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import MutualFund from "../MutalFund";

describe("MutualFund Component", () => {
  it("renders without crashing", () => {
    let router = createMemoryRouter(
      createRoutesFromElements(
        <Route element={<MutualFund />} path="/fund/:id" />,
      ),
    );
    let { container } = render(<RouterProvider router={router} />);

    expect(container).toBeInTheDocument();
  });
});
