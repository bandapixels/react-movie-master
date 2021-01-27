import { Action } from "../../store/state";

export enum HeaderActions {
  UPDATE_LIST = "[Header] update list",
}

export class UpdateList extends Action {
  readonly type = HeaderActions.UPDATE_LIST;

  constructor(public payload: string) {
    super();
  }
}

export type HeaderActionsTypes = UpdateList;
