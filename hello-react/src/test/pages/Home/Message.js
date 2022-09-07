import React, { Fragment, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Message() {
  const [messages] = useState([
    { id: "001", title: "消息1", content: "11e2e2" },
    { id: "002", title: "消息2", content: "11e2e2" },
    { id: "003", title: "消息3", content: "11e2e2" },
  ]);
  const navigate = useNavigate(); //获取函数
  const showDetail = (m) => {
    navigate("detail", {
      replace: false, //表示为push跳转
      state: {
        //只可以写state参数
        id: m.id,
        title: m.title,
        content: m.content,
      },
    });
  };

  return (
    <Fragment>
      <ul>
        {messages.map((m) => (
          <li key={m.id}>
            {/* <Link to={"detail" + "/" + m.id + "/" + m.title + "/" + m.content}>
              {m.title}
            </Link> */}
            {/* search */}
            {/* <Link
              to={`detail?id=${m.id}&title=${m.title}&content=${m.content}`}
            >
              {m.title}
            </Link> */}
            {/* {state} */}
            <Link
              to="detail"
              state={{ id: m.id, title: m.title, content: m.content }}
            >
              {m.title}
            </Link>
            <button onClick={() => showDetail(m)}>查看详情</button>
          </li>
        ))}
      </ul>
      <Outlet />
    </Fragment>
  );
}
