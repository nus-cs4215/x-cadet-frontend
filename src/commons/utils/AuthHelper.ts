import Constants from './Constants';

export function computeEndpointUrl(providerId: string): string | undefined {
  const ep = Constants.authProviders.get(providerId);
  if (!ep) {
    return undefined;
  }
  try {
    const epUrl = new URL(ep.endpoint);
    epUrl.searchParams.set('redirect_uri', computeRedirectUri(providerId)!);
    return epUrl.toString();
  } catch (e) {
    // in dev, sometimes the endpoint is a dummy; allow that
    return ep.endpoint || '';
  }
}

export function computeRedirectUri(providerId: string): string | undefined {
  const ep = Constants.authProviders.get(providerId);
  if (!ep) {
    return undefined;
  }
  const port = window.location.port === '' ? '' : `:${window.location.port}`;
  const callback = `${window.location.protocol}//${window.location.hostname}${port}/login${
    ep.isDefault ? '' : '?provider=' + encodeURIComponent(providerId)
  }`;
  return callback;
}

export function getClientId(providerId: string): string | undefined {
  const ep = Constants.authProviders.get(providerId);
  if (!ep) {
    return undefined;
  }
  try {
    const epUrl = new URL(ep.endpoint);
    return epUrl.searchParams.get('client_id') || undefined;
  } catch (e) {
    // in dev, sometimes the endpoint is a dummy; allow that
    return ep.endpoint || undefined;
  }
}

export function getDefaultProvider():
  | [string, NonNullable<ReturnType<typeof Constants.authProviders.get>>]
  | undefined {
  return [...Constants.authProviders.entries()].find(([_, { isDefault }]) => isDefault);
}
