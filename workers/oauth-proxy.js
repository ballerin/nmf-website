/**
 * Decap CMS OAuth Proxy — Cloudflare Worker
 *
 * Paste this entire file into the Cloudflare Worker quick editor.
 */

addEventListener('fetch', function (event) {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  var url = new URL(request.url);
  var origin = GITHUB_ORIGIN || 'https://nmf-website.pages.dev';

  var corsHeaders = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // /auth — redirect to GitHub for authorization
  if (url.pathname === '/auth') {
    var params = 'client_id=' + encodeURIComponent(GITHUB_CLIENT_ID) +
      '&scope=repo,user' +
      '&redirect_uri=' + encodeURIComponent(url.origin + '/callback');
    return Response.redirect(
      'https://github.com/login/oauth/authorize?' + params, 302
    );
  }

  // /callback — exchange code for access token
  if (url.pathname === '/callback') {
    var code = url.searchParams.get('code');
    if (!code) return new Response('Missing code', { status: 400 });

    var tokenRes = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code: code,
        }),
      }
    );

    var data = await tokenRes.json();

    var html = '<!DOCTYPE html>\n<html><head><script>\n' +
      '(function() {\n' +
      '  if (window.opener) {\n' +
      '    window.opener.postMessage(\n' +
      '      { token: "' + data.access_token + '", provider: "github" },\n' +
      '      "' + origin + '"\n' +
      '    );\n' +
      '  }\n' +
      '})();\n' +
      '</script></head><body><p>Authenticated — close this window.</p></body></html>';

    return new Response(html, {
      headers: { 'Content-Type': 'text/html', ...corsHeaders },
    });
  }

  return new Response('Not found', { status: 404 });
}
