const fs = require("fs");
const path = require("path");

const indexHtml = fs.readFileSync(path.join(__dirname, "./build/index.html"), "utf-8");
const assetsPath = path.join(__dirname, "./build");

exports.frontend = async (event, _context) => {
  const { path: requestedPath } = event;

  // Serve index.html for any route except static assets
  if (requestedPath === "/" || !fs.existsSync(path.join(assetsPath, requestedPath))) {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: indexHtml,
    };
  }

  // Serve static assets
  const asset = fs.readFileSync(path.join(assetsPath, requestedPath));
  const extension = path.extname(requestedPath);
  const contentType = getContentType(extension);
  return {
    statusCode: 200,
    headers: {
      "Content-Type": contentType,
    },
    body: asset.toString("base64"),
    isBase64Encoded: true,
  };
};

function getContentType(extension) {
  switch (extension) {
    case ".css":
      return "text/css";
    case ".js":
      return "text/javascript";
    case ".svg":
      return "image/svg+xml";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
}
