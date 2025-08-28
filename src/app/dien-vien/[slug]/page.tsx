import actorApi from "@/features/actors/data";
import Actor from "@/components/pages/actor";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  try {
    const { slug } = await params;
    const { name } = await actorApi.fetchActorDetailsData(slug);

    return {
      title: `PhimKhaHay | Diễn viên ${name}`,
      description: `Danh sách phim của diễn viên ${name}`,
    };
  } catch (error) {
    console.log(error);
  }
  return {
    title: "PhimKhaHay | Diễn viên",
  };
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  return <Actor actorId={slug} />;
}
