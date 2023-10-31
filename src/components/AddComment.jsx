import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

// class AddComment extends Component {
//   state = {
//     comment: {
//       comment: "",
//       rate: 1,
//       elementId: this.props.asin,
//     },
//   };
const AddComment = (props) => {
  const [comment, setcomment] = useState({
    comment: "",
    rate: 1,
    elementId: props.asin,
  });

  useEffect(() => {
    sendComment();
    DidUpdate();
  });

  const DidUpdate = async (prevProps) => {
    if (prevProps.asin !== props.asin) {
      // setcomment({
      //   comment: {
      //   comment: {...comment},
      //   elementId: props.asin,
      //   }
      // }),
      setcomment({
        comment: {
          comment: "",
          rate: 1,
          elementId: props.asin,
        },
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments",
        {
          method: "POST",
          body: JSON.stringify(comment),
          headers: {
            "Content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQxMGYxZGIxODE2MzAwMTRjOGZmYTMiLCJpYXQiOjE2OTg3NjI1MjUsImV4cCI6MTY5OTk3MjEyNX0.cBG6OiejXP19ZwyPvk7RXVi_UWAkQKtHNRNikqfd8tM",
          },
        }
      );
      if (response.ok) {
        alert("Recensione inviata!");
        setcomment({
          comment: {
            comment: "",
            rate: 1,
            elementId: props.asin,
          },
        });
      } else {
        throw new Error("Qualcosa è andato storto");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="my-3">
      <Form onSubmit={sendComment}>
        <Form.Group className="mb-2">
          <Form.Label>Recensione</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci qui il testo"
            value={comment.comment}
            onChange={(e) =>
              setcomment({
                comment: {
                  ...comment,
                  comment: e.target.value,
                },
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Valutazione</Form.Label>
          <Form.Control
            as="select"
            value={comment.rate}
            onChange={(e) =>
              setcomment({
                comment: {
                  ...comment,
                  rate: e.target.value,
                },
              })
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Invia
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
