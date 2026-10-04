// Where the CMS image bridge sends uploads: core's /v1/media. Core's origin is
// API_BASE_URL, fixed per environment when the image is built; without it the
// upload goes to the CMS host's origin.
export function coreMediaUrl(apiBaseUrl: string | undefined, cmsUrl: string): string {
  return `${new URL(apiBaseUrl || cmsUrl).origin}/v1/media`;
}
