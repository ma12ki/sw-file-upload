importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

workbox.clientsClaim();
workbox.skipWaiting();

const iterableRequest = async (request, newProps) => {
  const body = await copyBody(request);

  const {
    url,
    method,
    headers,
    mode,
    credentials,
    cache,
    redirect,
    referrer,
    integrity
  } = request;

  // object spread may not be supported (Edge), so use Object.assign instead
  return Object.assign(
    {
      url,
      method,
      headers,
      body,
      mode,
      credentials,
      cache,
      redirect,
      referrer,
      integrity
    },
    newProps
  );
};

const copyBody = async request => {
  const body = await request.clone().blob();

  if (body.size) {
    return body;
  }
  return Promise.resolve(undefined);
};

workbox.routing.registerRoute(
  /api/,
  workbox.strategies.networkOnly({
    plugins: [
      {
        requestWillFetch: async ({ request }) => {
          console.log(request);
          const iReq = await iterableRequest(request);
          console.log(iReq);
          const req = new Request(iReq.url, iReq);
          console.log(req);
          return req;
        }
      }
    ]
  }),
  "POST"
);
