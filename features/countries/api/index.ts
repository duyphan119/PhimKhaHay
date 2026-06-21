import queryString from "query-string";

export const countries: TCountry[] = [
  {
    id: "62093063196e9f4ab6b448b8",
    name: "Trung Quốc",
    slug: "trung-quoc",
    tmdbName: "China",
  },
  {
    id: "620a2300e0fc277084dfd6d2",
    name: "Hàn Quốc",
    slug: "han-quoc",
    tmdbName: "South Korea",
  },
  {
    id: "620a2307e0fc277084dfd726",
    name: "Nhật Bản",
    slug: "nhat-ban",
    tmdbName: "Japan",
  },
  {
    id: "620a2318e0fc277084dfd77a",
    name: "Thái Lan",
    slug: "thai-lan",
    tmdbName: "Thailand",
  },
  {
    id: "620a231fe0fc277084dfd7ce",
    name: "Âu Mỹ",
    slug: "au-my",
    tmdbName: undefined,
  },
  {
    id: "620a2335e0fc277084dfd822",
    name: "Đài Loan",
    slug: "dai-loan",
    tmdbName: "Taiwan",
  },
  {
    id: "620a2347e0fc277084dfd876",
    name: "Hồng Kông",
    slug: "hong-kong",
    tmdbName: "Hong Kong",
  },
  {
    id: "620a2355e0fc277084dfd8ca",
    name: "Ấn Độ",
    slug: "an-do",
    tmdbName: "India",
  },
  {
    id: "620a2370e0fc277084dfd91e",
    name: "Anh",
    slug: "anh",
    tmdbName: "United Kingdom",
  },
  {
    id: "620a2378e0fc277084dfd972",
    name: "Pháp",
    slug: "phap",
    tmdbName: "France",
  },
  {
    id: "620a2381e0fc277084dfd9c6",
    name: "Canada",
    slug: "canada",
    tmdbName: "Canada",
  },
  {
    id: "620a2398e0fc277084dfda1a",
    name: "Quốc Gia Khác",
    slug: "quoc-gia-khac",
    tmdbName: undefined,
  },
  {
    id: "620e0e8fd9648f114cde77f7",
    name: "Đức",
    slug: "duc",
    tmdbName: "Germany",
  },
  {
    id: "620e0ea0d9648f114cde784b",
    name: "Tây Ban Nha",
    slug: "tay-ban-nha",
    tmdbName: "Spain",
  },
  {
    id: "620f7fa791fa4af90ab6ad1f",
    name: "Thổ Nhĩ Kỳ",
    slug: "tho-nhi-ky",
    tmdbName: "Turkey",
  },
  {
    id: "6211e48c1f1609c9d9343bd0",
    name: "Hà Lan",
    slug: "ha-lan",
    tmdbName: "Netherlands",
  },
  {
    id: "6211fbe91f1609c9d9344bd7",
    name: "Indonesia",
    slug: "indonesia",
    tmdbName: "Indonesia",
  },
  {
    id: "62121edd1f1609c9d9345940",
    name: "Nga",
    slug: "nga",
    tmdbName: "Russia",
  },
  {
    id: "6212611d1f1609c9d93466cc",
    name: "Mexico",
    slug: "mexico",
    tmdbName: "Mexico",
  },
  {
    id: "621262d11f1609c9d934677f",
    name: "Ba lan",
    slug: "ba-lan",
    tmdbName: "Poland",
  },
  {
    id: "62135c8f1f1609c9d9346bb1",
    name: "Úc",
    slug: "uc",
    tmdbName: "Australia",
  },
  {
    id: "62135e8d1f1609c9d9346c8a",
    name: "Thụy Điển",
    slug: "thuy-dien",
    tmdbName: "Sweden",
  },
  {
    id: "62159af71f1609c9d934824e",
    name: "Malaysia",
    slug: "malaysia",
    tmdbName: "Malaysia",
  },
  {
    id: "62159c501f1609c9d934830a",
    name: "Brazil",
    slug: "brazil",
    tmdbName: "Brazil",
  },
  {
    id: "6216607570b58bba6858b27c",
    name: "Philippines",
    slug: "philippines",
    tmdbName: "Philippines",
  },
  {
    id: "62166eef70b58bba6858b624",
    name: "Bồ Đào Nha",
    slug: "bo-dao-nha",
    tmdbName: "Portugal",
  },
  { id: "621674a770b58bba6858b852", name: "Ý", slug: "y", tmdbName: "Italy" },
  {
    id: "6216751d70b58bba6858b885",
    name: "Đan Mạch",
    slug: "dan-mach",
    tmdbName: "Denmark",
  },
  {
    id: "6218e1e7a2d0f024a9de45a2",
    name: "UAE",
    slug: "uae",
    tmdbName: "United Arab Emirates",
  },
  {
    id: "621a2cb63fb21848d1970e39",
    name: "Na Uy",
    slug: "na-uy",
    tmdbName: "Norway",
  },
  {
    id: "621e33423fb21848d1974d12",
    name: "Thụy Sĩ",
    slug: "thuy-si",
    tmdbName: "Switzerland",
  },
  {
    id: "621f64afa666e8a57f65c512",
    name: "Châu Phi",
    slug: "chau-phi",
    tmdbName: undefined,
  },
  {
    id: "621f64bca666e8a57f65c51a",
    name: "Nam Phi",
    slug: "nam-phi",
    tmdbName: "South Africa",
  },
  {
    id: "6220d7ba8481266c5b7f08ea",
    name: "Ukraina",
    slug: "ukraina",
    tmdbName: "Ukraine",
  },
  {
    id: "623f34b1e3cd150b39912d5d",
    name: "Ả Rập Xê Út",
    slug: "a-rap-xe-ut",
    tmdbName: "Saudi Arabia",
  },
  {
    id: "6246acafc78eb57bbfe35df6",
    name: "Bỉ",
    slug: "bi",
    tmdbName: "Belgium",
  },
  {
    id: "625e9769db43524328af1e9c",
    name: "Ireland",
    slug: "ireland",
    tmdbName: "Ireland",
  },
  {
    id: "625ff28adb43524328afc13f",
    name: "Colombia",
    slug: "colombia",
    tmdbName: "Colombia",
  },
  {
    id: "63295529b4be4e0b655ed084",
    name: "Phần Lan",
    slug: "phan-lan",
    tmdbName: "Finland",
  },
  {
    id: "63e0fd3ecaf0f6e22aeb0616",
    name: "Việt Nam",
    slug: "viet-nam",
    tmdbName: "Vietnam",
  },
  {
    id: "6401c9e1269d33eaed6b0535",
    name: "Chile",
    slug: "chile",
    tmdbName: "Chile",
  },
  {
    id: "641433f6c9eab12a2a34e4f4",
    name: "Hy Lạp",
    slug: "hy-lap",
    tmdbName: "Greece",
  },
  {
    id: "642fd1c311f407ffb90e8fab",
    name: "Nigeria",
    slug: "nigeria",
    tmdbName: "Nigeria",
  },
  {
    id: "64399e5d06956a473bb27813",
    name: "Argentina",
    slug: "argentina",
    tmdbName: "Argentina",
  },
  {
    id: "644f3b0ed95ac616c32b79ee",
    name: "Singapore",
    slug: "singapore",
    tmdbName: "Singapore",
  },
];
export const countriesApi = {
  getVideos: async (
    countrySlug: string,
    params?: Omit<TVideosParams, "type_list" | "country">,
  ): Promise<
    | {
        seoOnPage: TSeoOnPage;
        items: TMovieItem[];
        params: TParams;
        breadCrumb: TBreadcrumbItem[];
      }
    | undefined
  > => {
    try {
      const response = await fetch(
        `${process.env.DOMAIN_API}/quoc-gia/${countrySlug}?${queryString.stringify(params || {})}`,
        { next: { revalidate: 60 } },
      );

      const jsonData = await response.json();
      if (jsonData.data && jsonData.data.items) {
        return jsonData.data;
      }
    } catch (error) {
      console.log("countriesApi,getVideos,error", error);
    }

    return undefined;
  },
};
