import { cmsConfig } from "@/lib/cms-config";
import { coreMediaUrl } from "@/lib/core-media";

const coreMedia = coreMediaUrl(process.env.CORE_API_ORIGIN, cmsConfig.baseUrl);

// The CMS image editor posts here and reads the uploaded image's address from
// `data.url`. Core's /v1/media answers with the media object itself, so forward
// the upload with the editor's token and wrap the answer in that envelope.
export async function POST(request: Request) {
  const headers = new Headers();
  for (const name of ["authorization", "content-type"]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }

  let upstream: Response;
  try {
    upstream = await fetch(coreMedia, {
      method: "POST",
      headers,
      body: await request.arrayBuffer(),
      cache: "no-store",
    });
  } catch {
    return Response.json({ detail: "Görsel yükleme servisine ulaşılamadı." }, { status: 502 });
  }

  const body = await upstream.json().catch(() => null);
  if (!upstream.ok) {
    return Response.json(body ?? { detail: upstream.statusText }, { status: upstream.status });
  }
  return Response.json({ data: body }, { status: upstream.status });
}
