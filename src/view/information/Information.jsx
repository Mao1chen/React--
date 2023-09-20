import React from "react";
import "./information.less";
import { flushSync } from "react-dom";
import { connect } from "react-redux";
import * as reduxAction from "@/redux/action";
import { SafeArea, Badge } from "antd-mobile";
import $http from "@/http";
import RecombinationSkeleton from "@/component/RecombinationSkeleton";
const Information = ({ params, navigate, collectList, initialCollectListAsyncAction, removeCollectAsyncAction }) => {
  const id = params.id,
    [hotInformation, setHotInformation] = React.useState({ popularity: 0, comments: 0 }),
    [viewInformation, setviewInformation] = React.useState(null);

  const headerElement = document.getElementsByTagName("head")[0];
  const linkElement = document.createElement("link");
  const initSettleHooksInformation = result => {
    linkElement.className = "external";
    linkElement.href = result?.css[0];
    linkElement.setAttribute("rel", "stylesheet");
    linkElement.setAttribute("media", "all");
    linkElement.setAttribute("type", "text/css");
    headerElement.appendChild(linkElement);
    const imgContainer = document.querySelector(".img-place-holder");
    const imageElement = new Image();
    const spanNode = document.createElement("span");
    spanNode.className = "span-placeholder";
    spanNode.innerText = result?.title;
    imageElement.src = result?.image;
    imgContainer.appendChild(imageElement);
    imgContainer.appendChild(spanNode);
  };
  React.useEffect(() => {
    (async () => {
      try {
        const response = await Promise.all([$http.get(`/story_extra?id=${id}`), $http.get(`/news_info?id=${id}`)]);
        setHotInformation(response[0]);
        flushSync(() => {
          setviewInformation(response[1]);
        });
        initSettleHooksInformation(response[1]);
      } catch (exception) {
        throw exception;
      }
    })();
    return () => {
      headerElement.removeChild(linkElement);
    };
  }, []);

  React.useEffect(() => {
    if (collectList === null) {
      initialCollectListAsyncAction();
    }
  }, []);

  const whetherCollect = React.useMemo(() => (collectList || []).some(next => next.news.id === id), [collectList, id]);

  return (
    <div className='information-cot'>
      {!viewInformation ? <RecombinationSkeleton onOff={false} line={50} /> : <main className='content' dangerouslySetInnerHTML={{ __html: viewInformation?.body }}></main>}
      <div className='app-cot'>
        <div className='back-cot' onClick={() => navigate(-1)}>
          <svg t='1694138395550' className='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='4139'>
            <path
              d='M399.471111 512.806365l356.22005-346.652138c24.105001-24.089651 24.140817-63.11548 0.032746-87.186711-24.106024-24.055882-63.185065-24.039509-87.291088 0.051165L268.308839 468.412272c-24.106024 24.089651-24.140817 63.11548-0.032746 87.170339a61.887512 61.887512 0 0 0 5.831822 5.121648l394.668734 384.118447c24.106024 24.088628 62.97938 24.346501 86.776366 0.583285 23.762193-23.763217 23.521716-62.549591-0.618077-86.63822L399.471111 512.806365z'
              fill=''
              p-id='4140'
            ></path>
          </svg>
        </div>
        <div className='more-cot'>
          <Badge content={hotInformation.popularity}>
            <svg t='1694138474884' className='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='5159'>
              <path
                d='M821.333333 800H547.584l-86.464 96.074667a32 32 0 1 1-47.573333-42.816l96-106.666667A32 32 0 0 1 533.333333 736h288a53.333333 53.333333 0 0 0 53.333334-53.333333V234.666667a53.333333 53.333333 0 0 0-53.333334-53.333334H202.666667a53.333333 53.333333 0 0 0-53.333334 53.333334v448a53.333333 53.333333 0 0 0 53.333334 53.333333h138.666666a32 32 0 0 1 0 64H202.666667c-64.8 0-117.333333-52.533333-117.333334-117.333333V234.666667c0-64.8 52.533333-117.333333 117.333334-117.333334h618.666666c64.8 0 117.333333 52.533333 117.333334 117.333334v448c0 64.8-52.533333 117.333333-117.333334 117.333333zM704 341.333333a32 32 0 0 1 0 64H320a32 32 0 0 1 0-64h384zM512 512a32 32 0 0 1 0 64H320a32 32 0 0 1 0-64h192z'
                fill='#000000'
                p-id='5160'
              ></path>
            </svg>
          </Badge>
          <Badge content={hotInformation.comments}>
            <svg t='1694138608007' className='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='6174'>
              <path
                d='M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z'
                p-id='6175'
              ></path>
            </svg>
          </Badge>
          <svg t='1694138688018' className='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='7131'>
            <path
              d='M335.008 916.629333c-35.914667 22.314667-82.88 10.773333-104.693333-25.557333a77.333333 77.333333 0 0 1-8.96-57.429333l46.485333-198.24a13.141333 13.141333 0 0 0-4.021333-12.864l-152.16-132.586667c-31.605333-27.52-35.253333-75.648-8.234667-107.733333a75.68 75.68 0 0 1 51.733333-26.752L354.848 339.2c4.352-0.362667 8.245333-3.232 10.026667-7.594667l76.938666-188.170666c16.032-39.2 60.618667-57.92 99.52-41.461334a76.309333 76.309333 0 0 1 40.832 41.461334l76.938667 188.16c1.781333 4.373333 5.674667 7.253333 10.026667 7.605333l199.712 16.277333c41.877333 3.413333 72.885333 40.458667 69.568 82.517334a76.938667 76.938667 0 0 1-26.08 51.978666l-152.16 132.586667c-3.541333 3.082667-5.141333 8.074667-4.021334 12.853333l46.485334 198.24c9.621333 41.013333-15.36 82.336-56.138667 92.224a75.285333 75.285333 0 0 1-57.525333-9.237333l-170.976-106.24a11.296 11.296 0 0 0-12.010667 0l-170.986667 106.24z'
              fill='#000000'
              p-id='7132'
            ></path>
          </svg>
          <svg t='1694138723919' className='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='8122'>
            <path d='M224 512m-80 0a80 80 0 1 0 160 0 80 80 0 1 0-160 0Z' p-id='8123' fill='#aaa'></path>
            <path d='M512 512m-80 0a80 80 0 1 0 160 0 80 80 0 1 0-160 0Z' p-id='8124' fill='#aaa'></path>
            <path d='M800 512m-80 0a80 80 0 1 0 160 0 80 80 0 1 0-160 0Z' p-id='8125' fill='#aaa'></path>
          </svg>
        </div>
      </div>
      <SafeArea />
    </div>
  );
};

export default connect(({ collectReducer: { collectList } }) => ({ collectList }), reduxAction.collectAction)(Information);
