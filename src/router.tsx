import { createBrowserRouter } from 'react-router';
import { RootLayout } from './pages/RootLayout';
import { HomePage, homeLoader } from './pages/HomePage';
import { ErrorPage } from './pages/ErrorPage';
import { contactAction } from './actions/contactAction';
import { WelcomeHydrateFallback } from './components/WelcomeHydrateFallback';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      HydrateFallback: WelcomeHydrateFallback,
      children: [
        {
          index: true,
          element: <HomePage />,
          loader: homeLoader,
          action: contactAction,
        },
        {
          path: 'projects',
          lazy: async () => {
            const { ProjectsPage, projectsLoader } = await import('./pages/ProjectsPage');
            return { Component: ProjectsPage, loader: projectsLoader };
          },
        },
        {
          path: 'projects/:projectId',
          lazy: async () => {
            const { ProjectDetailPage, projectDetailLoader } = await import('./pages/ProjectDetailPage');
            return { Component: ProjectDetailPage, loader: projectDetailLoader };
          },
        },
        {
          path: 'skills',
          lazy: async () => {
            const { SkillsPage, skillsLoader } = await import('./pages/SkillsPage');
            return { Component: SkillsPage, loader: skillsLoader };
          },
        },
        {
          path: 'experience',
          lazy: async () => {
            const { ExperiencePage, experienceLoader } = await import('./pages/ExperiencePage');
            return { Component: ExperiencePage, loader: experienceLoader };
          },
        },
        {
          path: 'about',
          lazy: async () => {
            const { AboutPage, aboutLoader } = await import('./pages/AboutPage');
            return { Component: AboutPage, loader: aboutLoader };
          },
        },
        {
          path: 'contact',
          lazy: async () => {
            const { ContactPage, contactLoader } = await import('./pages/ContactPage');
            return { Component: ContactPage, loader: contactLoader };
          },
          action: contactAction,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);
