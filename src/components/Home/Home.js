import { Container } from "@material-ui/core";

import PostList from "./PostList";

const Home = () => {
  return (
    <Container style={{ height: "200vh" }}>
      <h1>Home</h1>
      <PostList />
    </Container>
  );
};

export default Home;
