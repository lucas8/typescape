import { BaseStore } from './BaseStore';
import { FontFamilyStore } from './FontFamilyStore';

// we'll use the term snapshot to define a plain object representation of the store
// this will either come from the local database, or be loaded from the server
// TODO: more strictly define what this schema will look like
type TSnapshotItem = { __typename: string; [key: string]: any };
export type TSnapshot = TSnapshotItem[];

export class RootStore {
  fontFamilies: FontFamilyStore;

  constructor(snapshot: TSnapshot) {
    this.fontFamilies = new FontFamilyStore(this);
    this._loadSnapshot(snapshot);
  }

  private _loadSnapshot(snapshot: TSnapshot) {
    // batch entities with the same type together
    const snapshotGroups = snapshot.reduce((acc, item) => {
      return { ...acc, [item.__typename]: [...(acc[item.__typename] || []), item] };
    }, {} as Record<string, TSnapshotItem[]>);

    Object.keys(snapshotGroups).forEach(entityType => {
      // all items in this group will inherit the properties from BaseStore
      const store: BaseStore<any> = Object.values(this).find(store => store.model.name === entityType);

      if (store) {
        store.load(snapshotGroups[entityType]);
      } else {
        console.warn("[RootStore] couldn't find a store for item of type ", entityType);
      }
    });
  }

  // 1. check store checks if data is in the indexdb
  // 2. if not, it fetches it from from the preload
  // 3. if it is, loads into mobx, and fetches relations

  // TODO: store cleanup methods
}

export const createRootStore = (snapshot: TSnapshot): RootStore => {
  return new RootStore(snapshot);
};
