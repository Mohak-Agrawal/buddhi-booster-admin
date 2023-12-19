import { configureStore } from '@reduxjs/toolkit';
import examsApi from './api/examsApi';
import BlogReducer from './apps/blog/BlogSlice';
import ChatsReducer from './apps/chat/ChatSlice';
import ContactsReducer from './apps/contacts/ContactSlice';
import EcommerceReducer from './apps/eCommerce/EcommerceSlice';
import EmailReducer from './apps/email/EmailSlice';
import NotesReducer from './apps/notes/NotesSlice';
import TicketReducer from './apps/tickets/TicketSlice';
import UserProfileReducer from './apps/userProfile/UserProfileSlice';
import CustomizerReducer from './customizer/CustomizerSlice';
import categorySlice from './reducers/categorySlice';
import examSlice from './reducers/examSlice';
import franchiseSlice from './reducers/franchiseSlice';
import questionSlice from './reducers/questionSlice';
import subjectSlice from './reducers/subjectSlice';

export const store = configureStore({
  reducer: {
    [examsApi.reducerPath]: examsApi.reducer,
    customizer: CustomizerReducer,
    chatReducer: ChatsReducer,
    emailReducer: EmailReducer,
    notesReducer: NotesReducer,
    contactsReducer: ContactsReducer,
    ticketReducer: TicketReducer,
    ecommerceReducer: EcommerceReducer,
    userpostsReducer: UserProfileReducer,
    blogReducer: BlogReducer,
    category: categorySlice,
    question: questionSlice,
    subjects: subjectSlice,
    franchises: franchiseSlice,
    exams: examSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(examsApi.middleware),
});

export default store;
