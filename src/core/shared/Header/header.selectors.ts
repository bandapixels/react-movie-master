import { AppState } from "../../store/state";

export const getListType = ({ headerState: { listType } }: AppState): string =>
  listType;
