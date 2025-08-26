const KEY_PREFIX = "PINIA:STATE:";

export default function (context) {
  const { store } = context;

  //注册页面卸载和刷新行为事件
  window.addEventListener("beforeunload", function () {
    sessionStorage.setItem(KEY_PREFIX + store.$id, JSON.stringify(store.$state));
  });

  // 读取数据
  try {
    const state = JSON.parse(sessionStorage.getItem(KEY_PREFIX + store.$id));
    if (state) {
      // 更新状态
      store.$patch(state);
    }
  } catch (error) {
    console.log(error);
  }
}