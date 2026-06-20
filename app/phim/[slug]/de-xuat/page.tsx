import recommendVideos from "@/lib/recommend-videos.json";
import { getVideo } from "@/lib/video";
import { promises as fs } from "fs";
import { redirect } from "next/navigation";
import path from "path";

const filePath = path.join(process.cwd(), "lib", "recommend-videos.json");

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
    poster_url: string;
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

  const { movie } = await getVideo(awaitedParams.slug);

  if (!movie) return null;

  const index = recommendVideos.findIndex((item) => item.slug === movie.slug);
  const newRecommendVideo = {
    name: movie.name,
    slug: movie.slug,
    poster_url: movie.poster_url,
  };

 
  if (index === -1) await postData([newRecommendVideo, ...recommendVideos]);
  else
    await postData(recommendVideos.filter((item) => item.slug !== movie.slug));

  
  return redirect(`/phim-hot`);
}
