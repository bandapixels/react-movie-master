import { SearchState } from "../features/SearchContainer/searchContainer.state";
import { HeaderState } from "../shared/Header/header.state";

export interface AppState {
  searchState: SearchState;
  headerState: HeaderState;
}

export class Action {
  readonly type: string | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toJSON(): Record<string, any> {
    return { ...this };
  }
}
