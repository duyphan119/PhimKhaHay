export type WatchedVideo = {
  id: string;
  slug: string;
  name: string;
  thumbnail: string;
  episodeName: string;
  serverName: string;
  time: number;
  originName: string;
  query: string;
  otherWatchedEpisodes: string[];
};

export const getWatchedVideos = () => {
  const watchedVideos: WatchedVideo[] = JSON.parse(
    localStorage.getItem("watched")!
  );

  if (!watchedVideos) return [];

  localStorage.setItem("watched", JSON.stringify(watchedVideos));

  return watchedVideos;
};

export const saveWatchedVideo = (input: WatchedVideo) => {
  const watchedVideos = getWatchedVideos();

  const index = watchedVideos.findIndex(({ id }) => id === input.id);

  if (index !== -1) {
    const watchedEpisodeString = `${input.episodeName}${input.serverName}`;
    input.otherWatchedEpisodes = [
      ...watchedVideos[index].otherWatchedEpisodes.filter(
        (item) => item !== watchedEpisodeString
      ),
      watchedEpisodeString,
    ];
    watchedVideos.splice(index, 1);
  }
  watchedVideos.unshift(input);

  localStorage.setItem("watched", JSON.stringify(watchedVideos));

  return watchedVideos;
};

export const deleteWatchedVideo = (id: string) => {
  const watchedVideos = getWatchedVideos();

  localStorage.setItem(
    "watched",
    JSON.stringify(watchedVideos.filter((item) => item.id !== id))
  );
};
