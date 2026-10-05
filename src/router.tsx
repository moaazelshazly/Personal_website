import { createBrowserRouter } from 'react-router';
import { RootLayout } from './pages/RootLayout';
import { HomePage, homeLoader } from './pages/HomePage';
import { ProjectsPage, projectsLoader } from './pages/ProjectsPage';
import { ProjectDetailPage, projectDetailLoader } from './pages/ProjectDetailPage';
import { SkillsPage, skillsLoader } from './pages/SkillsPage';
import { ExperiencePage, experienceLoader } from './pages/ExperiencePage';
import { AboutPage, aboutLoader } from './pages/AboutPage';
import { ContactPage, contactLoader } from './pages/ContactPage';
import { ErrorPage } from './pages/ErrorPage';
import { contactAction } from './actions/contactAction';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
          loader: homeLoader,
          action: contactAction,
        },
        {
          path: 'projects',
          element: <ProjectsPage />,
          loader: projectsLoader,
        },
        {
          path: 'projects/:projectId',
          element: <ProjectDetailPage />,
          loader: projectDetailLoader,
        },
        {
          path: 'skills',
          element: <SkillsPage />,
          loader: skillsLoader,
        },
        {
          path: 'experience',
          element: <ExperiencePage />,
          loader: experienceLoader,
        },
        {
          path: 'about',
          element: <AboutPage />,
          loader: aboutLoader,
        },
        {
          path: 'contact',
          element: <ContactPage />,
          loader: contactLoader,
          action: contactAction,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);
