import React from "react";
import { Divider, Image } from "antd-mobile";
import { Link } from "react-router-dom";
import "./Journalism.less";
import PropTypes from "prop-types";
const Journalism = ({ date, stories, dividerVisible }) => {
  const formattingTimeHooks = date => {
    let nonJudgment = date.substring(4, date.length - 2),
      dayJudgment = date.substring(6, date.length);
    return `${nonJudgment}月${dayJudgment}日`;
  };
  return (
    <>
      {!dividerVisible ? <Divider contentPosition='left'>{formattingTimeHooks(date)}</Divider> : null}
      {stories.map(({ id, title, hint, images }) => {
        return (
          <Link to={`/information/${id}`} key={id}>
            <li className='journalism_lt'>
              <h3 className='lt_title'>{title}</h3>
              <span className='ht_cot'>{hint}</span>
              <Image src={images[0]} lazy />
            </li>
          </Link>
        );
      })}
    </>
  );
};
Journalism.defaultProps = {
  date: "19981022",
  stories: [],
  dividerVisible: false,
};
Journalism.propTypes = {
  date: PropTypes.string.isRequired,
  stories: PropTypes.arrayOf(PropTypes.object).isRequired,
  dividerVisible: PropTypes.bool,
};
export default Journalism;
