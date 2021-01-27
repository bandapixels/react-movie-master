import { AxiosResponse } from "axios";
import request from "./request";

export class MoviesRequests {
  public GetMovies = (query: string): Promise<AxiosResponse> => {
    const url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";

    return request.get(url, {
      params: {
        "api-key": "sM1VQfoF12RAMDx3ccuZSfppPeq13mYR",
        query,
      },
    });
  };
}

const instance = new MoviesRequests();

export default instance;
