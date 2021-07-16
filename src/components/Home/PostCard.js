import { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Divider,
  Typography,
  Box,
  CircularProgress,
} from "@material-ui/core";
import Image from "material-ui-image";
import { customHomeStyle } from "./homeStyles";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ShareIcon from "@material-ui/icons/Share";
import { firestore } from "../Firebase/FirebaseConfig";
const PostCard = ({ data }) => {
  const classes = customHomeStyle();
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    setCardData(data);
  }, [setCardData, data]);

  const onClickToVote = (toBeUpVoted, condition) => {
    let postRef = firestore.collection("posts").doc(toBeUpVoted);

    let upVote = cardData.map((item) => {
      if (item.id === toBeUpVoted) {
        if (condition === "increase") {
          item.upVote++;
          postRef.set(item);
        } else {
          item.downVote++;
          postRef.set(item);
        }
      }
      return item;
    });

    setCardData(upVote);
  };

  return (
    <Box className={classes.container}>
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
                  <CardMedia title={item.title}>
                    <Image src={item.imageURl} aspectRatio={1} className={classes.cardImage} />
                  </CardMedia>
                </CardActionArea>
                <Box className={classes.cardBottom}>
                  <CardActions>
                    <Button variant="outlined" onClick={() => onClickToVote(item.id, "increase")}>
                      <ArrowUpwardIcon /> {item.upVote}
                    </Button>

                    <Button variant="outlined" onClick={() => onClickToVote(item.id, "decrease")}>
                      <ArrowDownwardIcon /> {item.downVote}
                    </Button>

                    <Button variant="outlined">
                      <ChatBubbleOutlineIcon>Comment</ChatBubbleOutlineIcon>
                    </Button>

                    <Button variant="outlined">
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
