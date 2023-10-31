import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
import { useEffect, useState } from "react";

// class CommentArea extends Component {
//   state = {
//     comments: [],
//     isLoading: false,
//     isError: false,
//  };

const CommentArea = (props) => {
  const [comments, setcomments] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);

  // componentDidMount = async () => {
  //   try {
  //     let response = await fetch(
  //       'https://striveschool-api.herokuapp.com/api/comments/' +
  //         this.props.asin,
  //       {
  //         headers: {
  //           Authorization:
  //             'Bearer inserisci-qui-il-tuo-token',
  //         },
  //       }
  //     )
  //     console.log(response)
  //     if (response.ok) {
  //       let comments = await response.json()
  //       this.setState({ comments: comments, isLoading: false, isError: false })
  //     } else {
  //       console.log('error')
  //       this.setState({ isLoading: false, isError: true })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     this.setState({ isLoading: false, isError: true })
  //   }
  // }
  useEffect(() => {
    DidUpdate();
  });

  const DidUpdate = async (prevProps) => {
    if (prevProps.asin !== props.asin) {
      // this.setState({
      //   isLoading: true,
      // });
      setisLoading(true);
      try {
        let response = await fetch(
          "https://striveschool-api.herokuapp.com/api/comments/" + props.asin,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQxMGYxZGIxODE2MzAwMTRjOGZmYTMiLCJpYXQiOjE2OTg3NjI1MjUsImV4cCI6MTY5OTk3MjEyNX0.cBG6OiejXP19ZwyPvk7RXVi_UWAkQKtHNRNikqfd8tM",
            },
          }
        );
        console.log(response);
        if (response.ok) {
          let comments = await response.json();
          // setState({
          //   comments: comments,
          //   isLoading: false,
          //   isError: false,
          // });
          setcomments(comments);
          setisLoading(false);
          setisError(false);
        } else {
          setisLoading(false);
          setisError(true);
        }
      } catch (error) {
        console.log(error);
        //  const  setState = () => {{ isLoading: false, isError: true }};

        setisLoading(true);

        setisLoading(false);
      }
    }
  };

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
