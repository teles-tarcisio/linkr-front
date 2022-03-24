import { useContext, useEffect, useState } from "react";
import {
  Container,
  Feed,
  Form,
  ProfilePic,
} from "../../components/TimelineComponents";
import UserContext from "../../contexts/userContext";
import { api } from "../../services/api";
import FeedPosts from "./FeedPosts";
import Nav from "./navbar";

export default function Timeline() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    try {
      const request = api.loadPosts(userData.token);
      request.then((response) => {
        setPosts(response.data);
      });
    } catch (e) {
      alert("error");
      console.log(e);
    }
    setLoading(false);
  }, [userData.token]);
  console.log("posts: ", posts);
  // if (posts.length === 0) {
  //   return <p>There are no posts yet</p>;
  // }
  return (
    <>
      <Nav />

      <Container>
        <Feed>
          <header>
            <p>timeline</p>
          </header>

          <main>
            <div className="new-post">
              <div className="profile-pic">
                <ProfilePic className="img">
                  <img src="#" alt="profile" />
                </ProfilePic>
              </div>
              <div className="post-info">
                <p className="post-info-title">
                  What are you going to share today?
                </p>
                <Form action="">
                  <input type="url" placeholder="http://..." />
                  <input
                    className="description"
                    type="text"
                    placeholder="Awesome article about #javascript"
                  />
                  <button>Publish</button>
                </Form>
              </div>
            </div>

            <div className="posts">
              {loading ? <p>Carregando postss</p> : <FeedPosts posts={posts} />}
            </div>
          </main>
        </Feed>
      </Container>
    </>
  );
}
