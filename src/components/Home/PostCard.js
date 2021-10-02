import { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Divider,
  Typography,
  Box,
  CircularProgress,
} from "@material-ui/core";
import Image from "material-ui-image";
import Swal from "sweetalert2";

import { customHomeStyle } from "./homeStyles";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ShareIcon from "@material-ui/icons/Share";
import { firestore } from "../Firebase/FirebaseConfig";
import { useSelector } from "react-redux";

import ShareModal from "./ShareModal";
const PostCard = ({ data }) => {
  const classes = customHomeStyle();
  const [cardData, setCardData] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);

  const userId = useSelector((state) => state.auth.userData.uid);
  const theme = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    setCardData(data);
  }, [setCardData, data]);

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

  // SHARE MODAL
  const toggleShareModal = () => {
    setShowShareModal(!showShareModal);
  };

  return (
    <Box className={classes.container}>
      <ShareModal toggle={toggleShareModal} showShareModal={showShareModal} />

      {cardData.length ? (
        cardData.map((item, index) => {
          return (
            <div key={index}>
              <Card style={{ width: "300px" }} elevation={3} variant="outlined" className={classes.cardContainer}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h3" className={classes.titleText}>
                      {item.title}
                    </Typography>
                  </CardContent>
                  <Image src={item.imageURl} aspectRatio={1} className={classes.cardImage} />
                </CardActionArea>
                <Box className={classes.cardBottom}>
                  <CardActions>
                    <Button variant="outlined" onClick={() => onClickToVote(item.id, "increase")}>
                      <ArrowUpwardIcon />
                      {item.upVote.length}
                    </Button>

                    <Button variant="outlined" onClick={() => onClickToVote(item.id, "decrease")}>
                      <ArrowDownwardIcon />
                      {item.downVote.length}
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
              <Divider className={classes.cardDivider} />
            </div>
          );
        })
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default PostCard;
