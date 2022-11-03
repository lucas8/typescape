import { action, makeObservable, observable } from 'mobx';
import { Model } from '~/models/primitives';
import { Class } from '~/types';
import { RootStore } from './RootStore';

export abstract class BaseStore<T extends Model<any>> {
  @observable
  data: Map<string, T> = new Map();

  model: Class<T>;

  rootStore: RootStore;

  constructor(rootStore: RootStore, model: Class<T>) {
    makeObservable(this);
    this.rootStore = rootStore;
    this.model = model;
  }

  @action
  public create(item: Partial<T>): T {
    const ModelClass = this.model;
    const newModel = new ModelClass(item, this);

    this.data.set(newModel.id, newModel);

    return newModel;
  }

  @action
  public hydrate(models: Model<any>[]): Model<any>[] {
    return models.map(model => {
      this.data.set(model.id, model as any);
      return model;
    });
  }
}
