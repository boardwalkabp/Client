import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth routes
import HomeView from "./views/HomeView";
import UserRegister from "./components/auth/UserRegister";
import BuilderProtectedRoute from "./utils/BuilderProtectedRoute";
import ViewerProtectedRoute from "./utils/ViewerProtectedRoute";

// Builder routes
import BuilderHome from "./views/BuilderHome";
import BuilderLayout from "./components/layout/BuilderLayout";
import Applications from "./components/builder/applications/index";
import AddApplication from "./components/builder/applications/AddApplication";
import ViewApplication from "./components/builder/applications/ViewApplication";
import EditApplication from "./components/builder/applications/EditApplication";
import DeleteApplication from "./components/builder/applications/DeleteApplication";
import ViewAnsweredApplication from "./components/builder/applications/ViewAnsweredApplication";
import Categories from "./components/builder/categories/index";
import AddCategory from "./components/builder/categories/AddCategory";
import EditCategory from "./components/builder/categories/EditCategory";
import ViewCategory from "./components/builder/categories/ViewCategory";
import DeleteCategory from "./components/builder/categories/DeleteCategory";
import Clients from "./components/builder/clients";
import AddClient from "./components/builder/clients/AddClient";
import EditClient from "./components/builder/clients/EditClient";
import ViewClient from "./components/builder/clients/ViewClient";
import DeleteClient from "./components/builder/clients/DeleteClient";
import Questions from "./components/builder/questions";
import ViewQuestion from "./components/builder/questions/ViewQuestion";
import AddQuestion from "./components/builder/questions/AddQuestion";
import EditQuestion from "./components/builder/questions/EditQuestion";
import DeleteQuestion from "./components/builder/questions/DeleteQuestion";

// Viewer routes
import ViewerHome from "./views/ViewerHome";
import ViewerLayout from "./components/layout/ViewerLayout";
import ClientApplications from "./components/viewer/Applications";
import AnswerApplication from "./components/viewer/AnswerApplication";
import PreviousApplication from "./components/viewer/PreviousApplication";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomeView />} />
        <Route path="/register" exact element={<UserRegister />} />
        <Route path="*" exact element={<h1>404 Not Found</h1>} />

        {/* Builder routes */}
        <Route path="/builder" exact element={<BuilderProtectedRoute />}>
          <Route path="/builder" exact element={<BuilderLayout />}>
            <Route path="/builder/home" exact element={<BuilderHome />} />

            <Route
              path="/builder/applications"
              exact
              element={<Applications />}
            />
            <Route
              path="/builder/applications/add"
              exact
              element={<AddApplication />}
            />
            <Route
              path="/builder/applications/view/:id"
              exact
              element={<ViewApplication />}
            />
            <Route
              path="/builder/applications/edit/:id"
              exact
              element={<EditApplication />}
            />
            <Route
              path="/builder/applications/delete/:id"
              exact
              element={<DeleteApplication />}
            />
            <Route
              path="/builder/applications/answer/:id"
              exact
              element={<ViewAnsweredApplication />}
            />

            <Route path="/builder/categories/" exact element={<Categories />} />
            <Route
              path="/builder/categories/add"
              exact
              element={<AddCategory />}
            />
            <Route
              path="/builder/categories/edit/:id"
              exact
              element={<EditCategory />}
            />
            <Route
              path="/builder/categories/view/:id"
              exact
              element={<ViewCategory />}
            />
            <Route
              path="/builder/categories/delete/:id"
              exact
              element={<DeleteCategory />}
            />

            <Route path="/builder/clients" exact element={<Clients />} />
            <Route path="/builder/clients/add" exact element={<AddClient />} />
            <Route
              path="/builder/clients/edit/:id"
              exact
              element={<EditClient />}
            />
            <Route
              path="/builder/clients/view/:id"
              exact
              element={<ViewClient />}
            />
            <Route
              path="/builder/clients/delete/:id"
              exact
              element={<DeleteClient />}
            />

            <Route path="/builder/questions" exact element={<Questions />} />
            <Route
              path="/builder/questions/add"
              exact
              element={<AddQuestion />}
            />
            <Route
              path="/builder/questions/edit/:id"
              exact
              element={<EditQuestion />}
            />
            <Route
              path="/builder/questions/view/:id"
              exact
              element={<ViewQuestion />}
            />
            <Route
              path="/builder/questions/delete/:id"
              exact
              element={<DeleteQuestion />}
            />
          </Route>
        </Route>

        {/* Viewer routes */}
        <Route path="/" exact element={<ViewerProtectedRoute />}>
          <Route path="/viewer" exact element={<ViewerLayout />}>
            <Route path="/viewer/home" exact element={<ViewerHome />} />
            <Route
              path="/viewer/applications"
              exact
              element={<ClientApplications />}
            />
            <Route
              path="/viewer/applications/answer/:id"
              exact
              element={<AnswerApplication />}
            />
            <Route
              path="/viewer/applications/view/:id"
              exact
              element={<PreviousApplication />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
