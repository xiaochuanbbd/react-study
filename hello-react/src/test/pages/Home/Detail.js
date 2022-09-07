import React from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
export default function Detail(props) {
  const {
    state: { title, id, content },
  } = useLocation(); //连续结构赋值
  return (
    <ul>
      <li>id:{id}</li>
      <li>title:{title}</li>
      <li>content:{content}</li>
    </ul>
  );
}
