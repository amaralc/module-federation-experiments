import { createFederatedCatchAll } from '@module-federation-experiments/utils/lib/module-federation/createFederatedCatchAll';

export default createFederatedCatchAll(process.env.REMOTES);
