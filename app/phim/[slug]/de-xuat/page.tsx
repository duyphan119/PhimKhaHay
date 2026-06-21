import { videosApi } from "@/features/videos/api";
import hotVideos from "@/lib/hot-videos.json";
import { promises as fs } from "fs";
import { redirect } from "next/navigation";
import path from "path";

const filePath = path.join(process.cwd(), "lib", "hot-videos.json");

// GET
export async function getData() {
  try {
    const file = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(file);

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Không đọc được file" }, { status: 500 });
  }
}

// POST
export async function postData(
  body: {
    name: string;
    slug: string;
    thumb_url: string;
  }[],
) {
  try {
    await fs.writeFile(filePath, JSON.stringify(body, null, 2), "utf8");

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json({ error: "Không ghi được file" }, { status: 500 });
  }
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const awaitedParams = await params;

  const data = await videosApi.getDetails(awaitedParams.slug);

  if (!data || !data.item) return null;

  const videos = hotVideos as ThotedVideo[];

  const index = videos.findIndex((item) => item.slug === data.item.slug);
  const newhotVideo = {
    name: data.item.name,
    slug: data.item.slug,
    thumb_url: data.item.thumb_url,
  };


  if (index === -1) await postData([newhotVideo, ...videos]);
  else
    await postData(videos.filter((item) => item.slug !== data.item.slug));


  return redirect(`/phim-hot`);
}
