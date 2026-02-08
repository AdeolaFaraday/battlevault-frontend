import { gql } from "@apollo/client";
import { USER_RESPONSE_FRAGMENT } from "./fragments";

const CREATE_USER_MUTATION = gql`
	${USER_RESPONSE_FRAGMENT}
	mutation createUser($args: UserInput) {
		createUser(args: $args) {
			...UserResponseFragment
		}
	}
`;

const LOGIN_USER_MUTATION = gql`
	${USER_RESPONSE_FRAGMENT}
	mutation login($email: String! $password: String!) {
		login(email: $email password: $password) {
			...UserResponseFragment
		}
	}
`;

const VERIFY_EMAIL_MUTATION = gql`
	${USER_RESPONSE_FRAGMENT}
	mutation verifyEmail($token: String!) {
		verifyEmail(token: $token) {
			...UserResponseFragment
		}
	}
`;

const SOCIAL_LOGIN_USER_MUTATION = gql`
	${USER_RESPONSE_FRAGMENT}
	mutation socialAuth($token: String!) {
		socialAuth(token: $token) {
			...UserResponseFragment
		}
	}
`;

const UPDATE_PROFILE_MUTATION = gql`
	${USER_RESPONSE_FRAGMENT}
	mutation UpdateMyProfile($input: UpdateUserProfileInput!) {
		updateUserProfile(args: $input) {
			...UserResponseFragment
		}
	}
`;

const LOGOUT_MUTATION = gql`
	mutation logout {
		logout {
			success
			message
		}
	}
`;

export {
	CREATE_USER_MUTATION,
	LOGIN_USER_MUTATION,
	SOCIAL_LOGIN_USER_MUTATION,
	VERIFY_EMAIL_MUTATION,
	LOGOUT_MUTATION,
	UPDATE_PROFILE_MUTATION,
	REQUEST_PASSWORD_RESET_MUTATION,
	RESET_PASSWORD_MUTATION
}

const REQUEST_PASSWORD_RESET_MUTATION = gql`
	mutation RequestPasswordReset($email: String!) {
		requestPasswordReset(email: $email) {
			statusCode
			success
			message
		}
	}
`;

const RESET_PASSWORD_MUTATION = gql`
	mutation ResetPassword($token: String!, $newPassword: String!) {
		resetPassword(token: $token, newPassword: $newPassword) {
			statusCode
			success
			message
		}
	}
`;