import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { firestore } from "../Firebase/FirebaseConfig";
import { Button, Box, Card, CardActionArea, CardActions, CardContent, Container, Typography } from "@material-ui/core";
import Image from "material-ui-image";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ShareIcon from "@material-ui/icons/Share";
import { customHomeStyle } from "./homeStyles";

const CardDetail = () => {
  let { uid } = useParams();
  const history = useHistory();
  const classes = customHomeStyle();

  const userId = useSelector((state) => state?.auth?.userData?.uid || "");
  const theme = useSelector((state) => state.theme.darkMode);

  const [cardData, setCardData] = useState([]);
  const [dataNotFound, setDataNotFound] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    if (!uid) return history.push("/");

    const getPostData = () => {
      const postRef = firestore.collection("posts").doc(uid);
      postRef
        .get()
        .then((doc) => {
          if (!doc) {
            setCardData([]);
            setDataNotFound(true);
          }

          setCardData((prevState) => [...prevState, doc.data()]);
        })
        .catch(() => {
          setDataNotFound(true);
          history.push("/");
        });
    };

    getPostData();
  }, [history, uid]);

  const onClickToVote = (IDToBeUpVoted, condition) => {
    if (!userId)
      return Swal.fire({
        title: "Please log in to perform this action",
        icon: "error",
        showCancelButton: false,
        background: theme ? "rgb(250,250,250)" : "rgb(48,48,48)",
        confirmButtonColor: theme ? "" : "rgb(154,164,172)",
        confirmButtonText: "<b>Sure!</b>",
      });

    let postRef = firestore.collection("posts").doc(IDToBeUpVoted);

    let clickedPost = cardData.map((item) => {
      if (item.id === IDToBeUpVoted) {
        if (condition === "increase") {
          let isAlreadyUpVoted = cardData[0].upVote.indexOf(userId);
          let isAlreadyDownVoted = cardData[0].downVote.indexOf(userId);

          // 612f8df4eb7ea300122db2a1

          if (isAlreadyDownVoted !== -1) {
            item.downVote.splice(isAlreadyDownVoted, 1);
          }
          if (isAlreadyUpVoted === -1) {
            item.upVote.push(userId);
          }
          if (isAlreadyUpVoted !== -1) {
            item.upVote.splice(isAlreadyUpVoted, 1);
          }
        }

        if (condition === "decrease") {
          let isAlreadyUpVoted = cardData[0].upVote.indexOf(userId);
          let isAlreadyDownVoted = cardData[0].downVote.indexOf(userId);

          if (isAlreadyUpVoted !== -1) {
            item.upVote.splice(isAlreadyUpVoted, 1);
          }
          if (isAlreadyDownVoted === -1) {
            item.downVote.push(userId);
          }
          if (isAlreadyDownVoted !== -1) {
            item.downVote.splice(isAlreadyDownVoted, 1);
          }
        }
        postRef.set(item);
      }
      return item;
    });
    setCardData(clickedPost);
  };
  const toggleShareModal = () => {
    setShowShareModal(!showShareModal);
  };
  return cardData[0] && !dataNotFound ? (
    <Container className={classes.container} style={{ marginTop: "10vh" }}>
      <Card style={{ width: "300px" }} elevation={3} variant="outlined" className={classes.cardContainer}>
        <CardActionArea onClick={() => history.push(`/post/${cardData[0].id}`)}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h3" className={classes.titleText}>
              {cardData[0].title || ""}
            </Typography>
          </CardContent>
          <Image src={cardData[0].imageURl || ""} aspectRatio={1} className={classes.cardImage} />
        </CardActionArea>
        <Box className={classes.cardBottom}>
          <CardActions>
            <Button variant="outlined" onClick={() => onClickToVote(cardData[0].id, "increase")}>
              <ArrowUpwardIcon />
              {cardData[0]?.upVote?.length || 0}
            </Button>

            <Button variant="outlined" onClick={() => onClickToVote(cardData[0].id, "decrease")}>
              <ArrowDownwardIcon />
              {cardData[0]?.downVote?.length || 0}
            </Button>

            <Button variant="outlined" disabled={true}>
              <ChatBubbleOutlineIcon>Comment</ChatBubbleOutlineIcon>
            </Button>

            <Button variant="outlined" onClick={toggleShareModal}>
              <ShareIcon>Share</ShareIcon>
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Container>
  ) : (
    <h1>Post not found</h1>
  );
};

export default CardDetail;
