import axios from "./AxiosInstance.js";
import qs from "qs";

export const articleApi = () => {
  // 게시판 목록 조회
  const getArticleListApi = async (filters = {}) => {
    // filters 구조 분해, 필요없는 값은 자동 제외
    const { carType,
      carNames,
      carAges,
      articleTypes,
      sortType,
      page = 0,
      size = 12 } = filters;

    // params 객체 생성
    const params = {};

    if (carType) params.carType = carType;
    if (carNames && carNames.length) params.carName = carNames; // 배열 가능
    if (carAges && carAges.length) params.carAge = carAges; // 배열 가능
    if (articleTypes && articleTypes.length) params.articleType = articleTypes; // 배열/단일 모두 가능
    if (sortType) params.sortType = sortType;

    params.page = page;
    params.size = size;

    // axios에서 배열값은 carName=aa&carName=bb 형태로 변환해줌
    return await axios.get("/api/v1/article/list", {
      params,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }),
    });
  };

  // 게시판 목록 상세 조회
  const getArticleApi = async (articleId) => {
    return await axios.get("/api/v1/article", {
      params: { articleId },
    });
  };

  // 게시글 작성
  const postArticleApi = async (payload) => {
    return await axios.post("/api/v1/article", payload);
  };

  // 게시글 수정
  const updateArticleApi = async (payload) => {
    return await axios.put("/api/v1/article", payload);
  };

  // 좋아요 토글
  const toggleLikeApi = async (articleId) => {
    return await axios.post(`/api/v1/article/like/${articleId}`);
  };

  // 게시글 삭제
  const deleteArticleApi = async (articleId) => {
    return await axios.delete(`/api/v1/article/${articleId}`);
  };

  // 내가 작성한 게시글
  const getMyArticleListApi = async (
    sortType = "RECENT",
    page = 0,
    size = 20
  ) => {
    return await axios.get("/api/v1/article/my-list", {
      params: { sortType, page, size },
    });
  };

  const getMyArticleCountApi = async () => {
    return await axios.get("/api/v1/article/my-count");
  };

  const getMyTotalLikeCountApi = async () => {
    0;
    return await axios.get("/api/v1/article/my-like-count");
  };

  return {
    getArticleListApi,
    getArticleApi,
    postArticleApi,
    toggleLikeApi,
    deleteArticleApi,
    updateArticleApi,
    getMyArticleListApi,
    getMyArticleCountApi,
    getMyTotalLikeCountApi,
  };
};
