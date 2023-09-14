import React from "react";
import HomeHader from "./component/HomeHader";
import Journalism from "./component/Journalism";
import style from "./home.module.less";
import $http from "@/http";
import { Link } from "react-router-dom";
import { Swiper, Image, Toast, SpinLoading } from "antd-mobile";
import BackTheTop from "@/component/BackTheTop";
import RecombinationSkeleton from "@/component/RecombinationSkeleton";
import InfinityLoading from "@/component/InfinityLoading";
const Home = () => {
  const [today] = React.useState(new Date().toLocaleDateString().split("/")),
    [bannerInformation, setBannerInformation] = React.useState([]),
    [journalism, setJournalism] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const { date, stories, top_stories } = await $http.get("/news_latest");
        setBannerInformation(top_stories);
        setJournalism([...journalism, { date, stories }]);
      } catch (exception) {
        throw exception;
      }
    })();
  }, []);
  const loadMoreHooks = async () => {
    try {
      Toast.show({ icon: "loading", content: "加载中", duration: 0 });
      let preTime = journalism[journalism.length - 1]?.date;
      const { date = null, stories } = await $http.get(`/news_before?time=${preTime}`);
      setJournalism(preState => [...preState, { date, stories }]);
    } catch (exception) {
      throw exception;
    } finally {
      Toast.clear();
    }
  };
  return (
    <>
      <HomeHader today={today} />
      <div className={style.swiper_cot}>
        {bannerInformation.length > 0 ? (
          <Swiper autoplay loop>
            {bannerInformation.map(next => {
              let { id, image, hint, title } = next;
              return (
                <Swiper.Item key={id}>
                  <Link to={`/information/${id}`}>
                    <div className={style.content_cot}>
                      <Image src={image} alt='banner' lazy />
                      <h3 className={style.title}>{hint}</h3>
                      <p className={style.author}>{title}</p>
                    </div>
                  </Link>
                </Swiper.Item>
              );
            })}
          </Swiper>
        ) : null}
      </div>
      <ul className={style.journalism_cot}>
        {journalism.length === 0 ? (
          <RecombinationSkeleton line={23} />
        ) : (
          <>
            {journalism.map(({ date, stories }, key) => (
              <Journalism {...{ date, stories, dividerVisible: key === 0, key }} />
            ))}
          </>
        )}
      </ul>
      <InfinityLoading onBottomOut={() => loadMoreHooks()} altitude={20}>
        <SpinLoading /> <span style={{ marginLeft: 20, color: "#4b7bfb" }}>正在疯狂加载中...</span>
      </InfinityLoading>
      <BackTheTop />
    </>
  );
};

export default Home;
