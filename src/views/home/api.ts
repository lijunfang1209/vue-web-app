import api from "@/plugins/plAxios/index";
import type { PlAxiosPromise, PlResponsePromise } from "@/plugins/plAxios/type";
import type { TopListRes, AppDetailsInfoRes, TopResItem, SimpleTopList } from "./type";

interface RtnType {
  ids: string[];
  list: SimpleTopList[]
}
// 对原始数据进行过滤处理
const topDataFilter = async (res: PlAxiosPromise<TopListRes>) => {
  let topDataList:TopResItem[] = await res.then((data) => {
    return data?.feed?.entry || []
  });
  const rtn: RtnType = {
    ids: [],
    list: []
  };
  // 数据瘦身
  rtn.list = topDataList.map((item: TopResItem) => {
    // ids集合
    rtn.ids.push(item.id.attributes["im:id"]);
    return {
      category: item.category.attributes.label,
      id: item.id.attributes["im:id"],
      icon: item["im:image"][2].label,
      // 应用名
      name: item["im:name"].label,
      // 开发者名
      artist: item["im:artist"].label,
      // 应用描述
      summary: item.summary.label,
    };
  });
  return Promise.resolve(rtn)
};

// 热门 Top10
export const getHotTop = (limit: number) => {
  const option = {
    url: `rss/topgrossingapplications/limit=${limit}/json`,
  };

  return topDataFilter(api.get<TopListRes>(option));
};
// 免费 Top100
export const getFreeTop = (limit: number) => {
  const option = {
    url: `rss/topfreeapplications/limit=${limit}/json`,
  };
  return topDataFilter(api.get<TopListRes>(option)); // PlAxiosPromise<T>
};
// 搜索结果
export const getDetailsByIds = (ids: string) => {
  const option = {
    url: `lookup?id=${ids}`,
  };
  return api.post<AppDetailsInfoRes>(option);
};
