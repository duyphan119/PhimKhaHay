const name = "watchedvideos";

export const watchedVideosApi = {
  create: (newVideo: TWatchedVideo) => {
    const videos: TWatchedVideo[] = JSON.parse(localStorage.getItem(name)!);

    if (videos) {
      const index = videos.findIndex(({ slug }) => slug === newVideo.slug);

      if (index === -1) {
        videos.unshift(newVideo);
      } else {
        videos[index].serverIndex = newVideo.serverIndex;
        videos[index].episodeName = newVideo.episodeName;
      }
    }
    console.log(videos || [newVideo]);
    localStorage.setItem(name, JSON.stringify(videos || [newVideo]));
  },
  delete: (slug: string) => {
    const videos: TWatchedVideo[] = JSON.parse(localStorage.getItem(name)!);

    localStorage.setItem(
      name,
      JSON.stringify(videos.filter((item) => item.slug !== slug)),
    );
  },
  getAll: ({
    page,
    limit,
  }: {
    page: string;
    limit: string;
  }): { items: TWatchedVideo[]; pagination?: TPagination } => {
    const videos: TWatchedVideo[] = JSON.parse(localStorage.getItem(name)!);
    if (!videos)
      return {
        items: [],
      };
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 24;
    const start = (pageNum - 1) * limitNum;
    const end = start + limitNum;
    return {
      items: videos.slice(start, end),
      pagination: {
        currentPage: pageNum,
        totalItemsPerPage: limitNum,
        totalItems: videos.length,
      },
    };
  },
};
