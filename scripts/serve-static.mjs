import {
  createReadStream,
  existsSync,
  statSync,
} from "node:fs";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import process from "node:process";
import { URL } from "node:url";

const args = process.argv.slice(2);

function readArgument(name) {
  const index = args.indexOf(name);

  if (index === -1) {
    return undefined;
  }

  const value = args[index + 1];

  if (!value || value.startsWith("--")) {
    throw new Error(`Missing value for ${name}.`);
  }

  return value;
}

const host =
  readArgument("--hostname") ??
  readArgument("--host") ??
  process.env.HOST ??
  "127.0.0.1";

const rawPort =
  readArgument("--port") ??
  process.env.PORT ??
  "3000";

const port = Number(rawPort);

if (
  !Number.isInteger(port) ||
  port < 1 ||
  port > 65535
) {
  throw new Error(
    `Invalid port: ${rawPort}. Expected an integer from 1 to 65535.`,
  );
}

const exportRoot = resolve(process.cwd(), "out");

if (!existsSync(exportRoot)) {
  throw new Error(
    'Static export directory "out" is missing. Run "pnpm build" first.',
  );
}

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".map", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".xml", "application/xml; charset=utf-8"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

const securityHeaders = {
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=()",
  "Strict-Transport-Security":
    "max-age=31536000; includeSubDomains",
};

function isFile(filePath) {
  try {
    return statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function resolveRequestFile(pathname) {
  let decodedPath;

  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  if (decodedPath.includes("\0")) {
    return null;
  }

  const requestedPath = resolve(
    exportRoot,
    `.${decodedPath}`,
  );

  if (
    requestedPath !== exportRoot &&
    !requestedPath.startsWith(`${exportRoot}${sep}`)
  ) {
    return null;
  }

  const candidates = [];

  if (decodedPath.endsWith("/")) {
    candidates.push(
      resolve(requestedPath, "index.html"),
    );
  } else {
    candidates.push(
      requestedPath,
      `${requestedPath}.html`,
      resolve(requestedPath, "index.html"),
    );
  }

  return candidates.find(isFile) ?? null;
}

function sendFile(request, response, filePath, statusCode) {
  const contentType =
    contentTypes.get(extname(filePath).toLowerCase()) ??
    "application/octet-stream";

  const size = statSync(filePath).size;

  response.writeHead(statusCode, {
    "Content-Length": size,
    "Content-Type": contentType,
    ...securityHeaders,
  });

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  const stream = createReadStream(filePath);

  stream.on("error", () => {
    if (!response.headersSent) {
      response.writeHead(500, {
        "Content-Type": "text/plain; charset=utf-8",
        ...securityHeaders,
      });
    }

    response.end("Internal Server Error");
  });

  stream.pipe(response);
}

const server = createServer((request, response) => {
  if (
    request.method !== "GET" &&
    request.method !== "HEAD"
  ) {
    response.writeHead(405, {
      Allow: "GET, HEAD",
      "Content-Type": "text/plain; charset=utf-8",
      ...securityHeaders,
    });
    response.end("Method Not Allowed");
    return;
  }

  const requestUrl = new URL(
    request.url ?? "/",
    `http://${request.headers.host ?? `${host}:${port}`}`,
  );

  const filePath = resolveRequestFile(requestUrl.pathname);

  if (filePath) {
    sendFile(request, response, filePath, 200);
    return;
  }

  const notFoundPath = resolve(exportRoot, "404.html");

  if (isFile(notFoundPath)) {
    sendFile(request, response, notFoundPath, 404);
    return;
  }

  response.writeHead(404, {
    "Content-Type": "text/plain; charset=utf-8",
    ...securityHeaders,
  });
  response.end("Not Found");
});

server.on("clientError", (_error, socket) => {
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});

server.listen(port, host, () => {
  console.log(
    `Static export ready at http://${host}:${port}`,
  );
});

function shutdown(signal) {
  console.log(`Received ${signal}; stopping static server.`);

  server.close((error) => {
    if (error) {
      console.error(error);
      process.exitCode = 1;
    }
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
