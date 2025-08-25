import Breadcrumb from "@/components/breadcrumb";
import actorApi from "@/features/actors/data";
import VideoCard from "@/features/videos/components/video-card";
import { Metadata } from "next";
import Image from "next/image";

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

  const { items, profile, breadCrumb, APP_DOMAIN_CDN_IMAGE } =
    await actorApi.fetchVideosData(slug);
  return (
    <>
      <Breadcrumb breadCrumb={breadCrumb} />
      <div className="flex md:flex-row flex-col gap-4">
        <div className="space-y-4">
          <div className="relative aspect-[2/3] w-full md:w-[300px]">
            <Image
              unoptimized
              src={
                profile.avatar ||
                (profile.gender === "Nam"
                  ? "/placeholder-actor-male.jpg"
                  : "/placeholder-actor-female.jpg")
              }
              alt="Profile"
              fill
              className="rounded-md object-cover"
            />
          </div>
          <h3 className="_text-primary text-3xl">{profile.name}</h3>
          <div className="space-y-1">
            <p className="">Giới tính: {profile.gender}</p>
            <p className="">Ngày sinh: {profile.birthday}</p>
          </div>
        </div>
        <div className="md:flex-1">
          <div className="grid grid-cols-12 gap-4 h-auto">
            {items.map((video) => (
              <VideoCard
                key={video._id}
                video={video}
                imageType="poster"
                appDomainCdnImage={APP_DOMAIN_CDN_IMAGE}
                className="col-span-6 sm:col-span-4 md:col-span-3 _bg-layout"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
