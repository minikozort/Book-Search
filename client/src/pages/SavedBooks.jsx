import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries'; // Import the GET_ME query
import { REMOVE_BOOK } from '../utils/mutations'; // Import the REMOVE_BOOK mutation
import { removeBookId } from '../utils/localStorage'; // Local storage utility
import Auth from '../utils/auth'; // Authorization utility

const SavedBooks = () => {
  // Use Apollo Client's useQuery hook to fetch user data
  const { data, loading, error } = useQuery(GET_ME, {
    context: {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    },
  });

  // Use Apollo Client's useMutation hook to handle book deletion
  const [removeBook] = useMutation(REMOVE_BOOK);

  // Check if the data is still loading
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // Handle query errors
  if (error) {
    console.error(error);
    return <h2>Something went wrong while fetching data.</h2>;
  }

  // Extract user data from the query result
  const userData = data?.me || { savedBooks: [] };

  // Function to handle book deletion
  const handleDeleteBook = async (bookId) => {
    try {
      const { data } = await removeBook({
        variables: { book : bookId }, // Correct the variable name here
        context: {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        },
      });
console.log(data);
      // Update local storage if the mutation was successful
      if (data) {
        removeBookId(bookId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container fluid className="text-light bg-dark p-5"> {/* Use Container here */}
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Container>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => (
            <Col md="4" key={book.bookId}>
              <Card border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
