import React, { useState } from 'react';
import Comment from '../../components/Comment/Comment';

const CommentBox = ({ isLogged, postId }) => {
  const [comments, setComments] = useState([
    {
      title: 'Headache For Two Days',
      user: 'umutdenizsenerr',
      content:
        'I have ache for two days at left of my head and it is getting worse day by day. \n I dont know what to do. \n I make some research on internet and now i am suspicios about brain tumor please help me.',
      time: '28.10.2022 14:43',
    },
    {
      title: 'Sprained Ankle',
      user: 'beratdamar',
      content:
        'In the football match I played with my friends 3 days ago, the ball hit my foot very hard and my foot was sprained. It still hurts a lot while walking.',

      time: '25.10.2022 19:11',
    },
    {
      title: 'Focus Problem',
      user: 'mbatuhanmalazgirt',
      content:
        'Since my exam schedule is very busy these days, I study at the library every day, but I check my phone every five minutes. I am open to any advice.',

      time: '29.10.2022 09.27',
    },
    {
      title: 'Neck Pain',
      user: 'yigitcanozkaya',
      content:
        'Since constantly i work with a computer, my neck have been suffering from looking to it. Doing sports has always been a blessing but it started to not be enough for it',

      time: '30.10.2022 23.27',
    },
  ]);

  return (
    <div style={{ padding: 14 }}>
      {comments.map((comment, index) => (
        <Comment
          index={index}
          key={index}
          user={isLogged ? comment.user : 'Anonymous'}
          content={comment.content}
          time={comment.time}
          isLogged={isLogged}
        />
      ))}
    </div>
  );
};

export default CommentBox;
