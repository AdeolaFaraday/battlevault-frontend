import { act, screen, waitFor } from "@testing-library/react";
import { renderWithRedux } from "@/src/utils/test-utils";
import { setLoggedInUserDetails } from "@/src/lib/redux/authSlice"; // Import your auth actions
import Greeting from ".";
import useSignIn from "../../../hooks/auth/useSignIn"; // Import your login hook

// Mock the login hook
jest.mock("../../../hooks/auth/useSignIn");
jest.mock("firebase/auth", () => ({
    getAuth: jest.fn(() => ({
        signInWithPopup: jest.fn(),
        signOut: jest.fn(),
    })),
    GoogleAuthProvider: jest.fn(),
}));

describe("Greeting Component with API Call", () => {
    it("should display user name after successful login", async () => {

        // Mock API login request
        const mockLogin = jest.fn(() =>
            Promise.resolve({ firstName: "Fifehanmi" })
        );

        (useSignIn as jest.Mock).mockReturnValue({
            login: mockLogin,
        });

        const { store, rerender } = renderWithRedux(<Greeting />)

        // Initially, user should NOT be logged in
        // expect(screen.getByText("Hi,")).toBeInTheDocument();
        expect(screen.queryByText("Fifehanmi")).not.toBeInTheDocument();

        // Simulate login API call
        await mockLogin();

        // console.log("Redux Store State before:", store.getState());

        // Simulate Redux updating the store
        act(() => {
            store.dispatch(setLoggedInUserDetails({ firstName: "Fifehanmi" } as TCommonResponseData));
        })

        rerender(<Greeting />)
        // console.log("Redux Store State:", store.getState());
        //screen.debug();
        // Wait for the component to update
        await waitFor(() => {
            expect(screen.getByText("Fifehanmi")).toBeInTheDocument();
        });

        // Ensure the greeting is fully displayed
        // expect(screen.getByText("Hi,")).toBeInTheDocument();
        // expect(screen.getByText("👋")).toBeInTheDocument();
    });
});
