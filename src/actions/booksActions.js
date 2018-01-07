import axios from 'axios';

export function getBooks() {
  return function(dispatch) {
    axios.get("/api/books")
      .then(res => {
        dispatch({ type: "GET_BOOKS", payload: res.data })
      })
      .catch(err =>{
        dispatch({ type: "GET_BOOK_REJECTED", payload: "there was error geting a new book" })
      });
  }
  // return {
  //   type: "GET_BOOK"
  // }
}

export function postBooks(book) {
  return function(dispatch) {
    axios.post("/api/books",book)
      .then(res => {
        dispatch({ type: "POST_BOOK", payload: res.data})
      })
      .catch(err => {
        dispatch({type:"POST_BOOK_REJECTED",payload: "there was error posting a new book"})
      });
  }
  // return {
  //   type: "POST_BOOK",
  //   payload: _id
  // }
}

export function deleteBooks(book) {
  return function (dispatch) {
    axios.delete(`/api/books/${book}`)
      .then(res => {
        dispatch({ type: "DELETE_BOOK", payload: book })
      })
      .catch(err => {
        dispatch({ type: "POST_BOOK_REJECTED", payload: "there was error deleting a new book" })
      });
  }
  // return {
  //   type: "DELETE_BOOK",
  //   payload: book
  // }
}

export function resetButton() {
  return {
    type: "RESET_BOOK",
  }
}
