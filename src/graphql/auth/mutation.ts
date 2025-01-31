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

export { CREATE_USER_MUTATION }