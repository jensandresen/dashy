const instanceVersion = new Date().getTime();

export function getVersion() {
  return instanceVersion;
  // return process.env.APP_VERSION || "n/a";
}
