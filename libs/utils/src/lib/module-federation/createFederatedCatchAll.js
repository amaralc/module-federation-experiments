import React from 'react';
import { matchFederatedPage } from './matchFederatedPage';

export function createFederatedCatchAll(remotes) {
  const FederatedCatchAll = initialProps => {
    const [lazyProps, setProps] = React.useState({});

    const { FederatedPage, render404, renderError, needsReload, ...props } = {
      ...lazyProps,
      ...initialProps,
    };

    console.log('in catchall', { initialProps });

    React.useEffect(async () => {
      if (needsReload) {
        console.log('needs reload');
        const federatedProps = await FederatedCatchAll.getInitialProps(props);
        setProps(federatedProps);
      }
    }, []);

    if (render404) {
      // TODO: Render 404 page
      return React.createElement('h1', {}, '404 Not Found');
    }
    if (renderError) {
      // TODO: Render error page
      return React.createElement('h1', {}, 'Oops, something went wrong.');
    }

    if (FederatedPage) {
      return React.createElement(FederatedPage, props);
    }

    return null;
  };

  FederatedCatchAll.getInitialProps = async ctx => {
    const { err, req, res, AppTree, ...props } = ctx;
    console.log('in initial props');
    if (err) {
      // TODO: Run getInitialProps for error page
      return { renderError: true, ...props };
    }

    if (!process.browser) {
      return { needsReload: true, ...props };
    }

    try {
      const matchedPage = await matchFederatedPage(remotes, ctx.asPath);
      console.log('matchedPage', matchedPage);

      const remote = matchedPage?.value?.remote;
      const mod = matchedPage?.value?.module;

      if (!remote || !mod) {
        // TODO: Run getInitialProps for 404 page
        return { render404: true, ...props };
      }

      console.log('loading exposed module', mod, 'from remote', remote);
      try {
        if (!window[remote].__initialized) {
          window[remote].__initialized = true;

          // eslint-disable-next-line
          await window[remote].init(__webpack_share_scopes__.default);
        }
      } catch (initErr) {
        console.log('initErr', initErr);
      }

      const FederatedPage = await window[remote].get(mod).then(factory => factory().default);
      console.log('FederatedPage', FederatedPage);
      if (!FederatedPage) {
        // TODO: Run getInitialProps for 404 page
        return { render404: true, ...props };
      }

      const modifiedContext = {
        ...ctx,
        query: matchedPage.params,
      };
      const federatedPageProps = (await FederatedPage.getInitialProps?.(modifiedContext)) || {};
      return { ...federatedPageProps, FederatedPage };
    } catch (err) {
      console.log('err', err);
      // TODO: Run getInitialProps for error page
      return { renderError: true, ...props };
    }
  };

  return FederatedCatchAll;
}
