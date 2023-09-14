import { useState } from "react";

/**
 *
 * @param {*初始值} initialValue
 * @returns
 * @describe {*用于函数式组件复合状态,省略解构赋值}
 */
const usePortionState = initialValue => {
  const [initialValue, setInitialValue] = useState(initialValue);
  const setPortionState = newValue => setInitialValue({ ...initialValue, ...newValue });
  return [initialValue, setPortionState];
};

export default usePortionState;
