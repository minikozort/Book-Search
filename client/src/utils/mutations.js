import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation addBook( $book: BookInput!) {
    addBook( book: $book) {
        _id
        username
        savedBooks{
        bookId
        title
        authors
        description
        image
        }
      }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($book: ID!) {
    removeBook(book: $book) {
        _id
        username
        savedBooks{
        bookId
        title
        authors
        description
        image
        }
      }
  }
`;