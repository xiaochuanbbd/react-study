import React, { Component } from "react";
import { useEffect } from "react";

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function mouentd() {
      console.log("mouentd");
    }
    console.log("update");
    return () => {
      console.log("unmouentd");
    };
  });
}
