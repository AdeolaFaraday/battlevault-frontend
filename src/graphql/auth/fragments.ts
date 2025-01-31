import { gql } from "@apollo/client";


export const USER_FRAGMENT = gql`
	fragment UserFragment on User {
		_id
		userName
    }
`;

const USER_RESPONSE_FRAGMENT = gql`
	${USER_FRAGMENT}
	fragment UserResponseFragment on Response {
		statusCode
		success
		message
		data {
			...UserFragment
		}
	}
`;

export { USER_RESPONSE_FRAGMENT }