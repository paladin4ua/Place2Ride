
export class FirebaseUtils {

  static mapToObject<T>(instance:T) : T {
    const result = {};
    Object.keys(instance).map(key => result[key] = instance[key]);
    return <T>result;
  }

  static mapFromObject<T>(type: {new(): T}, instance: object) : T {
    let result = new type();
    Object.keys(instance).map(key => result[key] = instance[key]);
    return <T>result;
  }
}
