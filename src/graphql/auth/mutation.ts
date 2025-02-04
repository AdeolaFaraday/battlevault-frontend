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

export { 
    CREATE_USER_MUTATION,
    LOGIN_USER_MUTATION
 }