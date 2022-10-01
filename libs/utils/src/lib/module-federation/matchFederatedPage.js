import createMatcher from 'feather-route-matcher';

export async function matchFederatedPage(remotes, path) {
  if (!remotes) {
    console.error('No __REMOTES__ webpack global defined or no remotes passed to catchAll');
  }
  const maps = await Promise.all(
    Object.entries(remotes).map(([remote, loadRemote]) => {
      console.log('page map', remote, loadRemote);
      const loadOrReferenceRemote = !window[remote] ? loadRemote() : window[remote];
      return Promise.resolve(loadOrReferenceRemote).then(container => {
        console.log(container);
        return container
          .get('./pages-map')
          .then(factory => ({ remote, config: factory().default }))
          .catch(error => {
            console.error(error);
            return null;
          });
      });
    }),
  );
  const config = {};

  for (let map of maps) {
    if (!map) continue;

    for (let [path, mod] of Object.entries(map.config)) {
      config[path] = {
        remote: map.remote,
        module: mod,
      };
    }
  }

  const matcher = createMatcher(config);
  const match = matcher(path);

  return match;
}

