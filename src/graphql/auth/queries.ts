import { gql } from "@apollo/client";
import { USER_RESPONSE_FRAGMENT } from "./fragments";

export const GET_ME_QUERY = gql`
    ${USER_RESPONSE_FRAGMENT}
    query GetMe {
        me {
           ...UserResponseFragment
        }
    }
`;
