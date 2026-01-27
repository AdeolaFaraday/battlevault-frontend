#!/bin/bash
# Re-create the missing utility paths that @apollo/client-react-streaming expects
mkdir -p node_modules/@apollo/client/utilities/invariant
echo "export { invariant } from '../globals/index.js';" > node_modules/@apollo/client/utilities/invariant/index.js
echo 'declare const invariant: any; export { invariant };' > node_modules/@apollo/client/utilities/invariant/index.d.ts

mkdir -p node_modules/@apollo/client/utilities/environment
echo "export * from '../globals/index.js';" > node_modules/@apollo/client/utilities/environment/index.js
echo 'export {};' > node_modules/@apollo/client/utilities/environment/index.d.ts

mkdir -p node_modules/@apollo/client/utilities/internal
echo "export * from '../index.js';" > node_modules/@apollo/client/utilities/internal/index.js
echo 'export {};' > node_modules/@apollo/client/utilities/internal/index.d.ts

mkdir -p node_modules/@apollo/client/utilities/observables
echo "export * from '../index.js';" > node_modules/@apollo/client/utilities/observables/index.js
echo 'export {};' > node_modules/@apollo/client/utilities/observables/index.d.ts

# Ensure @apollo/client is seen as a ESM package but handled carefully by Next.js
# Sometimes removing it from serverExternalPackages helps with the hooks error
