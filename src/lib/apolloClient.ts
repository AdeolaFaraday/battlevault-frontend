import { HttpLink } from '@apollo/client';
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
// import { createUploadLink } from 'apollo-upload-client';

const LINK = {
  credentials: 'include',
  uri: process.env.NEXT_PUBLIC_SERVER_URL,
};

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URL,
});

// const uploadLink = createUploadLink(LINK);

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      uri: "http://example.com/api/graphql",
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },
    }),
  });
});
