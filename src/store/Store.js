import { configureStore } from '@reduxjs/toolkit';
import authApi from './api/authApi';
import examsApi from './api/examsApi';
import { levelsApi } from './api/levelsApi';
import { subjectsApi } from './api/subjectsApi';
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
import authSlice from './slices/authSlice';
import categorySlice from './slices/categorySlice';
import examSlice from './slices/examSlice';
import franchiseSlice from './slices/franchiseSlice';
import questionSlice from './slices/questionSlice';
import subjectSlice from './slices/subjectSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [examsApi.reducerPath]: examsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [levelsApi.reducerPath]: levelsApi.reducer,
    [subjectsApi.reducerPath]: subjectsApi.reducer,
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
    auth: authSlice,
    exams: examSlice,
    user: userSlice,
    subject: subjectSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      examsApi.middleware,
      userApi.middleware,
      levelsApi.middleware,
      subjectsApi.middleware,
    ),
});
