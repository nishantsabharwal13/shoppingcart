
export function booksReducers(
  state=
  {
    books:  []
  },action) {
  switch(action.type) {

    case "GET_BOOKS":
      return {...state, books: [...action.payload]}
      break;

    case "POST_BOOK":
    // let books = state.books.concat(action.payload)
    // return {books};
      return { ...state, books: [...state.books, ...action.payload], msg: 'SAVED! Click to continue', style: 'success' }
      break;

    case "POST_BOOK_REJECTED":
      return { ...state, msg: 'please try again', style: 'danger' }
      break;   

    case "UPDATE_BOOK": {
      const currentBookToUpdate = [...state.books];
      const indexToUpdate = currentBookToUpdate.findIndex((book) => book._id === action.payload._id);
      const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        title: action.payload.title
      }

      return {
        books: [...currentBookToDelete.slice(0, indexToDelete), newBookToUpdate,
        ...currentBookToDelete.slice(indexToDelete + 1)]
      }
      break;
    }

    case "DELETE_BOOK":
      const currentBookToDelete = [...state.books];
      const indexToDelete = currentBookToDelete.findIndex((book) => book._id == action.payload);

      return {books : [...currentBookToDelete.slice(0,indexToDelete),
      ...currentBookToDelete.slice(indexToDelete+1)]}
      break;

    case "RESET_BOOK":
      return { ...state, msg: null, style: 'primary' }
      break; 
  }
  return state;
}
