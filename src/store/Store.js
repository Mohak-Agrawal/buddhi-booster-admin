import { configureStore } from '@reduxjs/toolkit';
import examsApi from './api/examsApi';
import { levelsApi } from './api/levelsApi';
import userApi from './api/usersApi';
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
import userSlice from './reducers/userSlice';

export const store = configureStore({
  reducer: {
    [examsApi.reducerPath]: examsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [levelsApi.reducerPath]: levelsApi.reducer,
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
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(examsApi.middleware, userApi.middleware, levelsApi.middleware),
});
