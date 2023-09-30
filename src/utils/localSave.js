class $localStorage {
  /*
   ** @params:String Or Array
   ** 两个参数需要相同类型
   */
  // 支持批量存储
  save(key, value) {
    switch (typeof key) {
      case "string":
        localStorage.setItem(key, JSON.stringify(value));
        break;
      case "object":
        key.forEach((next, index) => localStorage.setItem(next, JSON.stringify(value[index])));
        break;
      default:
        return Promise.reject("传入类型错误");
    }
  }
  gain(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  delete(key) {
    return localStorage.removeItem(key);
  }
  clear() {
    return localStorage.clear();
  }
  set(key, value) {
    sessionStorage.setItem(key, value);
  }
  get(key) {
    return sessionStorage.getItem(key);
  }
  remove(key) {
    sessionStorage.removeItem(key);
  }
  eliminate() {
    sessionStorage.clear();
  }
}
export default new $localStorage();
