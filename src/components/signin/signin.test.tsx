import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import userEvent from '@testing-library/user-event'
import SignInComponent from './index'
import { renderWithRedux } from '@/src/utils/test-utils';

// Mock Next.js Router
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));
jest.mock("firebase/auth", () => ({
    getAuth: jest.fn(() => ({
        signInWithPopup: jest.fn(),
        signOut: jest.fn(),
    })),
    GoogleAuthProvider: jest.fn(),
}));

jest.mock('@apollo/client', () => ({
    ...jest.requireActual('@apollo/client'),
    useMutation: jest.fn(() => [jest.fn(), {}]), // Mock mutation and state
}));

describe('Sigin', () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(), // Mock router.push()
            replace: jest.fn(), // Mock router.replace()
            pathname: '/signin', // Fake pathname
        });
    });
    it('it renders sign component', () => {
        renderWithRedux(<SignInComponent />)
        const getOrText = screen.getByText('OR')
        expect(getOrText).toBeInTheDocument()
    })

    it('checks if the button is disabled when fields are empty', async () => {
        renderWithRedux(<SignInComponent />)
        userEvent.setup()
        const userNameField = screen.getByPlaceholderText('Enter Username')
        const passwordField = screen.getByPlaceholderText('Enter Password')

        const button = screen.getByRole('button', { name: "Sign In" })

        // Ensure the button is disabled initially (when email and password are empty)
        expect(button).toBeDisabled()

        // Simulate user typing in the email and password fields using user-event
        await userEvent.type(userNameField, 'test@example.com')
        await userEvent.type(passwordField, 'password123')

        expect(button).toBeEnabled()
    })
})