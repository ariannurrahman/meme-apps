import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import {
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { customHomeStyle } from "./homeStyles";

const ShareModal = ({ toggle, showShareModal }) => {
  const currentURL = window.location.href;
  const classes = customHomeStyle();

  return (
    <Dialog fullWidth open={showShareModal} onClose={toggle}>
      <DialogTitle>Share To Your Favorite Platform</DialogTitle>
      <DialogContent className={classes.shareContainer}>
        <div className={classes.shareWrapper}>
          <TwitterShareButton title="Check this cool memes website" url={currentURL}>
            <TwitterIcon round={true} />
          </TwitterShareButton>

          <EmailShareButton title="Check this cool memes website" url={currentURL}>
            <EmailIcon round={true} />
          </EmailShareButton>

          <FacebookShareButton title="Check this cool memes website" url={currentURL}>
            <FacebookIcon round={true} />
          </FacebookShareButton>

          <LinkedinShareButton title="Check this cool memes website" url={currentURL}>
            <LinkedinIcon round={true} />
          </LinkedinShareButton>

          <WhatsappShareButton title="Check this cool memes website" url={currentURL}>
            <WhatsappIcon round={true} />
          </WhatsappShareButton>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="text"
          onClick={() => {
            toggle();
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareModal;
