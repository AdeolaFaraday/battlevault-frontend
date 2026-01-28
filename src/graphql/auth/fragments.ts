import { gql } from "@apollo/client";


export const USER_FRAGMENT = gql`
	fragment UserFragment on User {
		_id
		userName
		firstName
		lastName
		email
		bio
	}
`;

const USER_RESPONSE_FRAGMENT = gql`
	${USER_FRAGMENT}
	fragment UserResponseFragment on Response {
		statusCode
		success
		message
		data {
			... on AuthPayload {
				token
				user {
					...UserFragment
				}
			}
		}
	}
`;

export { USER_RESPONSE_FRAGMENT }