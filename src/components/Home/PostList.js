import { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { firestore } from "../Firebase/FirebaseConfig";
import PostCard from "./PostCard";
import { customHomeStyle } from "./homeStyles";
const PostList = () => {
  const [dataList, setDataList] = useState([]);

  const classes = customHomeStyle();
  useEffect(() => {
    firestore
      .collection("posts")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => setDataList((prevState) => [...prevState, { ...doc.data(), id: doc.id }]));
      });
  }, []);

  return (
    <Container className={classes.container}>
      <PostCard data={dataList} />
    </Container>
  );
};

export default PostList;
