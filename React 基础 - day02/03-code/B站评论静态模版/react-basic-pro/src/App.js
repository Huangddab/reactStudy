import { useState, useRef, useEffect } from "react";
import "./App.scss";
import avatar from "./images/bozai.png";
// 导入js库lodash https://lodash.com/
import _ from "lodash";
// classnames 通过条件动态控制class类名 https://github.com/JedWatson/classnames
import classnames from "classnames";
// uuid 库 生成唯一id
import { v4 as uuidV4 } from "uuid";
// 使用时间格式化库 dayjs https://github.com/iamkun/dayjs
import dayjs from "dayjs";
// axios
import axios from "axios";

/**
 * 评论列表的渲染和操作
 *
 * 1. 根据状态渲染评论列表
 * 2. 删除评论
 */

// 评论列表数据
// const defaultList = [
//   {
//     // 评论id
//     rpid: 3,
//     // 用户信息
//     user: {
//       uid: "13258165",
//       avatar: "",
//       uname: "周杰伦",
//     },
//     // 评论内容
//     content: "哎哟，不错哦",
//     // 评论时间
//     ctime: "10-18 08:15",
//     like: 88,
//   },
//   {
//     rpid: 2,
//     user: {
//       uid: "36080105",
//       avatar: "",
//       uname: "许嵩",
//     },
//     content: "我寻你千百度 日出到迟暮",
//     ctime: "11-13 11:29",
//     like: 88,
//   },
//   {
//     rpid: 1,
//     user: {
//       uid: "30009257",
//       avatar,
//       uname: "黑马前端",
//     },
//     content: "学前端就来黑马",
//     ctime: "10-19 09:00",
//     like: 66,
//   },
// ];
// 当前登录用户信息
const user = {
  // 用户id
  uid: "30009257",
  // 用户头像
  avatar,
  // 用户昵称
  uname: "黑马前端",
};

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
  { type: "hot", text: "最热" },
  { type: "time", text: "最新" },
];
function useComments() {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    // 请求数据
    async function getList() {
      // axios请求数据
      const res = await axios.get("http://localhost:3004/list");
      setComments(res.data);
    }
    getList();
  }, []);
  return {
    comments,
    setComments,
  };
}
const Item = ({ item, onDel }) => {
  return (
    <div className="reply-item">
      {/* 头像 */}
      <div className="root-reply-avatar">
        <div className="bili-avatar">
          <img className="bili-avatar-img" alt="" />
        </div>
      </div>

      <div className="content-wrap">
        {/* 用户名 */}
        <div className="user-info">
          <div className="user-name">{item.user.uname}</div>
        </div>
        {/* 评论内容 */}
        <div className="root-reply">
          <span className="reply-content">{item.content}</span>
          <div className="reply-info">
            {/* 评论时间 */}
            <span className="reply-time">{item.ctime}</span>
            {/* 评论数量 */}
            <span className="reply-time">点赞数:{item.like}</span>
            {user.uid === item.user.uid && (
              <span className="delete-btn" onClick={() => onDel(item.user.uid)}>
                删除
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const App = () => {
  // 1 评论列表渲染
  // const [comments, setComments] = useState(_.orderBy(defaultList, ["like"], ["desc"]));
  //  获取接口数据
  // const [comments, setComments] = useState([]);

  // useEffect(() => {
  //   // 请求数据
  //   async function getList() {
  //     // axios请求数据
  //     const res = await axios.get("http://localhost:3004/list");
  //     setComments(res.data);
  //   }
  //   getList();
  // }, []);
  // 封装成useComments
  const { comments, setComments } = useComments();
  const [type, setType] = useState("hot");
  // 2 删除评论
  const handleDel = (uid) => {
    // 过滤掉被删除的评论
    setComments(comments.filter((item) => item.user.uid !== uid));
  };
  // 3 导航 Tab 切换
  const handleTabChange = (type) => {
    setType(type);
    if (type === "hot") {
      // lodash 函数库
      // 最热排序
      setComments(_.orderBy(comments, ["like"], ["desc"]));
    } else {
      // 最新排序
      setComments(_.orderBy(comments, ["ctime"], ["desc"]));
    }
  };
  // 4 发布评论
  const [content, setContent] = useState("");
  //  使用 useRef 拿到 DOM 对象
  const inputRef = useRef(null);
  const handlePublish = () => {
    // 将评论添加到 评论列表contents中
    setComments([
      ...comments,
      {
        rpid: uuidV4(), // 使用js库uuid生成唯一id
        user: {
          uid: "30009257",
          avatar,
          uname: "黑马前端",
        },
        content: content,
        ctime: dayjs(new Date()).format("MM-DD HH:mm"),
        like: 66,
      },
    ]);
    // 1. 清空内容 - 把控制input框的value状态设置为空串
    setContent("");
    // 2. 重新聚焦 - 拿到input的dom元素，调用focus方法
    inputRef.current.focus();
  };
  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{10}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}
            {tabs.map((item) => (
              // 点击谁就把谁的tab保存下来
              <span
                key={item.type}
                // className={`nav-item ${type === item.type && "active"}`}
                className={classnames("nav-item", { active: type === item.type })}
                onClick={() => handleTabChange(item.type)}
              >
                {item.text}
              </span>
            ))}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
              // 绑定评论内容
              value={content}
              // 实现获取评论内容
              onChange={(e) => setContent(e.target.value)}
              ref={inputRef}
            />
            {/* 发布按钮 */}
            <div className="reply-box-send">
              <div className="send-text" onClick={handlePublish}>
                发布
              </div>
            </div>
          </div>
        </div>
        {/* 评论列表 */}
        <div className="reply-list">
          {/* 评论项 */}
          {comments.map((item) => (
            // 优化成Item子组件
            <Item key={item.user.uid} item={item} onDel={handleDel} />
            // <div className="reply-item" key={item.rpid}>
            //   {/* 头像 */}
            //   <div className="root-reply-avatar">
            //     <div className="bili-avatar">
            //       <img className="bili-avatar-img" alt="" />
            //     </div>
            //   </div>

            //   <div className="content-wrap">
            //     {/* 用户名 */}
            //     <div className="user-info">
            //       <div className="user-name">{item.user.uname}</div>
            //     </div>
            //     {/* 评论内容 */}
            //     <div className="root-reply">
            //       <span className="reply-content">{item.content}</span>
            //       <div className="reply-info">
            //         {/* 评论时间 */}
            //         <span className="reply-time">{item.ctime}</span>
            //         {/* 评论数量 */}
            //         <span className="reply-time">点赞数:{item.like}</span>
            //         {user.uid === item.user.uid && (
            //           <span className="delete-btn" onClick={handleDel(item.user.uid)}>
            //             删除
            //           </span>
            //         )}
            //       </div>
            //     </div>
            //   </div>
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
