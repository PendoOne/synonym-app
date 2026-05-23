// Patch os.hostname() for Vercel CLI — Windows Chinese computer names break HTTP headers
const os = require("os");
os.hostname = () => "PendoOne-PC";
