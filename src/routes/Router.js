import { lazy, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import ExamResultsPage from 'src/pages/ExamResultsPage';
import UserDetailsPage from 'src/pages/UserDetailsPage';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/BlankLayout')));

/* ****Pages***** */
const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));
const Login = Loadable(lazy(() => import('../pages/Login')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Maintenance = Loadable(lazy(() => import('../views/authentication/Maintenance')));

const ExamPaperPage = Loadable(lazy(() => import('src/pages/ExamPaperPage')));
const ExamPage = Loadable(lazy(() => import('src/pages/ExamsPage')));
const FranchisePage = Loadable(lazy(() => import('src/pages/FranchisePage')));
const LecturesPage = Loadable(lazy(() => import('src/pages/LecturesPage')));
const QuestionsPage = Loadable(lazy(() => import('src/pages/QuestionsPage')));
const SubjectPage = Loadable(lazy(() => import('src/pages/SubjectPage')));
const UsersPage = Loadable(lazy(() => import('src/pages/UsersPage')));

const ProtectedRoutes = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const singleLogin = useSelector((state) => state.auth.singleLogin);
  const navigate = useNavigate();

  // Use an effect to navigate based on authentication status
  useEffect(() => {
    if (!(isAuthenticated || singleLogin)) {
      // Use Navigate inside the effect to avoid the warning
      navigate('auth/login');
    } else navigate('dashboard/home');
  }, [isAuthenticated, singleLogin]);

  // Render the Outlet or null based on authentication status
  return isAuthenticated || singleLogin ? <Outlet /> : null;
};

const Router = [
  {
    path: '/',
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/',
        element: <FullLayout />,
        children: [
          { path: '/dashboard/home', exact: true, element: <ModernDash /> },
          { path: '/subjects/:subjectId/*', element: <SubjectPage /> },
          { path: '/dashboard/category-questions/:categoryId', element: <QuestionsPage /> },
          { path: '/dashboard/franchises', element: <FranchisePage /> },
          { path: '/dashboard/exams', element: <ExamPage /> },
          { path: '/dashboard/exam-questions/:examId', element: <ExamPaperPage /> },
          { path: '/dashboard/exam-results/:examId', element: <ExamResultsPage /> },
          { path: '/dashboard/lectures', element: <LecturesPage /> },
          { path: '/dashboard/users', element: <UsersPage /> },
          { path: '/dashboard/userDetails/:userId', element: <UserDetailsPage /> },
          { path: '*', element: <Navigate to="/auth/404" /> },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/404', element: <Error /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
