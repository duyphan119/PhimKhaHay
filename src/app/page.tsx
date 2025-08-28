import videoApi from "@/features/videos/data";
import { getSeo } from "@/lib/utils";
import Home from "@/pages/home";

export const generateMetadata = async () => {
  const defaultTitle = "PhimKhaHay | Trang chủ";
  try {
    const {
      data: { seoOnPage, APP_DOMAIN_CDN_IMAGE },
    } = await videoApi.fetchHomeData();

    return getSeo(
      {
        ...seoOnPage,
        titleHead: defaultTitle,
      },
      APP_DOMAIN_CDN_IMAGE
    );
  } catch (error) {
    console.log(error);
  }

  return {
    title: defaultTitle,
  };
};

export default async function Page() {
  return <Home />;
}
