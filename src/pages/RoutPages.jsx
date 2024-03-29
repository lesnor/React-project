import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PostServise from '../API/PostServise';
import Loader from '../components/Animation/Loader/Loader';
import { useFetching } from '../hooks/useFetching';

const RoutPages = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostServise.getById(id);
    setPost(response.data);
  });
  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostServise.getCommentsByPostId(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div className="Comments">
      <h1>Posts number {params.id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="Comments__post">
          {post.id}. {post.title}
          <p>{post.body}</p>
        </div>
      )}
      <h1>Comments</h1>
      {isComLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((comm) => (
            <div key={comm.id} style={{ marginTop: 15 }}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default RoutPages;
