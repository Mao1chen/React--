import React from "react";
import style from "./collect.module.less";
import $http from "@/http";
import { connect } from "react-redux";
import { useToast } from "@/utils";
import { Link } from "react-router-dom";
import { collectAction } from "@/redux/action";
import { SwipeAction, Image, Dialog } from "antd-mobile";
import RecombinationNavBar from "@/component/RecombinationNavBar";
import RecombinationSkeleton from "@/component/RecombinationSkeleton";

const Collect = ({ collectList, removeCollectAsyncAction, initialCollectListAsyncAction }) => {
  React.useEffect(() => {
    if (collectList === null) {
      initialCollectListAsyncAction();
    }
  }, []);

  const clickHooksRemoveCollect = async id => {
    try {
      const result = await Dialog.confirm({
        content: "确定要删除吗？",
      });
      useToast.loading();
      if (!result) return;
      const { code } = await $http.get(`/store_remove?id=${id}`);
      !code && removeCollectAsyncAction(id);
    } catch (exception) {
      throw exception;
    } finally {
      useToast.overallSituation();
    }
  };
  return (
    <main className={style.main}>
      <RecombinationNavBar title='个人收藏' />
      {!collectList ? (
        <RecombinationSkeleton line={30} />
      ) : (
        collectList?.map(({ id, news }) => {
          return (
            <SwipeAction
              key={id}
              closeOnAction={false}
              closeOnTouchOutside={true}
              rightActions={[
                {
                  key: "delete",
                  text: "删除",
                  color: "danger",
                  onClick: () => clickHooksRemoveCollect(news.id),
                },
              ]}
            >
              <Link to={`/information/${news.id}`}>
                <li className='journalism_lt'>
                  <h3 className='lt_title'>{news.title}</h3>
                  <Image src={news.image} lazy />
                </li>
              </Link>
            </SwipeAction>
          );
        })
      )}
    </main>
  );
};

export default connect(({ collectReducer: { collectList } }) => ({ collectList }), collectAction)(Collect);
