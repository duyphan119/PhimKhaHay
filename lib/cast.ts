export const getCasts = async (tmdbType: string, tmdbId: string | number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/${tmdbType}/${tmdbId}/credits?language=vi-VN`,
    {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      },
    },
  );
  const data: { cast: TCast[] } = await res.json();
  return data.cast;
};

export const getCastDetails = async (
  castId: string | number,
): Promise<TCastProfile | null> => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${castId}?language=vi-VN`,
      {
        next: { revalidate: 100 },
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
      },
    );
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

// const fetchCreditVideos = async <T extends TvCredit | MovieCredit>(
//     url: string,
//     getKeyword: (item: T) => string,
//     matchFn: (item: MovieItem, credit: T) => boolean
//   ): Promise<MovieItem[]> => {
//     console.log(url);
//     const res = await fetch(url, {
//       headers: {
//         Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
//       },
//       cache: "no-cache",
//     });
//     const { cast }: { cast: T[] } = await res.json();

//     const results = await Promise.allSettled(
//       cast.map((c) => searchVideos(getKeyword(c) ))
//     );

//     const items: MovieItem[] = [];
//     const videoIds = new Set<string>();

//     results.forEach((r, i) => {
//       if (r.status === "fulfilled") {
//         const { data } = r.value as VideosResponse;
//         if (data.items) {
//           const video = data.items.find((item) => matchFn(item, cast[i]));
//           if (video && !videoIds.has(video._id)) {
//             videoIds.add(video._id);
//             items.push(video);
//           }
//         }
//       }
//     });

//     return items;
//   }
