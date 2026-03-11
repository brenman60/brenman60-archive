import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import MainLayout from "./layouts/MainLayout";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import DevPage from "./pages/DevPage";
import ReviewsPage from "./pages/ReviewsPage";
import ArticlePage from "./pages/ArticlePage";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/brenman60-archive",
    element: (
      <>
        <Navbar />
        <MainLayout />
        <Footer />
      </>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "dev",
        element: <DevPage />,
      },
      {
        path: "reviews",
        element: <ReviewsPage />,
      },
      {
        path: "article/:id",
        element: <ArticlePage />,
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ]
  },
]);

const App = () => {
  return ( 
    <RouterProvider router={router} />
  );
};

export default App;
