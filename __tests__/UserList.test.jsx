import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import UserList from "../components/Question1-2";
import UserProfilePage from "../app/profile/[id]/UserProfilePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// describe("Page", () => {
//   it("Render a Users", () => {
//     render(
//       <UserList
//         users={[
//           { id: 1, name: "Hoàng", email: "huyhoang13199@gmail.com" },
//           { id: 2, name: "Dũng", email: "huyhoang13199@gmail.com" },
//           { id: 3, name: "Vanh", email: "huyhoang13199@gmail.com" },
//         ]}
//       />
//     );
//     const heading = screen.getByText("Users", { level: 1 });
//     expect(heading).toBeInTheDocument();
//   });
// });

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useParams: () => ({ id: "123" }),
}));

test("Render a Users", () => {
  render(
    <UserList
      users={[
        { id: 1, name: "Hoàng", email: "huyhoang13199@gmail.com" },
        { id: 2, name: "Dũng", email: "huyhoang13199@gmail.com" },
        { id: 3, name: "Vanh", email: "huyhoang13199@gmail.com" },
      ]}
    />
  );
  fireEvent.click(screen.getByText("Hoàng"));
  const heading = screen.getByText(/^Selected:/);
  expect(heading).toBeInTheDocument();
});

// test("Check input", () => {
//   const queryClient = new QueryClient();
//   render(
//     <QueryClientProvider client={queryClient}>
//       <UserProfilePage />
//     </QueryClientProvider>
//   );
//   const input = screen.getByPlaceholderText("Enter name");
//   fireEvent.change(input, { target: { value: "Hoàng" } });
//   expect(input.value).toBe("Hoàng");
// });
