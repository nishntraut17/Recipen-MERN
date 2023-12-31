import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  AddBlog,
  AddRecipe,
  Blogs,
  Contact,
  DashboardBlogs,
  DashboardRecipes,
  EditBlog,
  EditRecipe,
  Error,
  Home,
  MyBlogs,
  MyRecipes,
  Profile,
  Recipe,
  SavedRecipes,
  SingleBlog,
  SingleRecipe,
  Users,
  SignIn,
  SignUp,
} from "./pages";
import { PageLoading } from "./components";
import { RootLayout, DashboardLayout, RequireAuth } from "./layouts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ROLES from "./common/roles";

function App() {
  return (
    <Router>
      <ToastContainer
        autoClose={5000}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route
              path="/dashboard"
              element={<DashboardLayout />}
            >
              <Route
                path="users"
                element={<Users />}
              />
              <Route
                path="recipes"
                element={<DashboardRecipes />}
              />
              <Route
                path="blogs"
                element={<DashboardBlogs />}
              />
            </Route>
          </Route>

          <Route path="/auth">
            <Route
              path="signin"
              element={<SignIn />}
            />
            <Route
              path="signup"
              element={<SignUp />}
            />
          </Route>

          <Route
            path="/"
            element={<RootLayout />}
          >
            <Route
              index
              element={<Home />}
            />
            <Route path="recipe">
              <Route
                index
                element={<Recipe />}
              />
              <Route
                path=":id"
                element={<SingleRecipe />}
              />
              <Route
                path="saved"
                element={<SavedRecipes />}
              />

              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.ProUser, ROLES.Admin]} />
                }
              >
                <Route
                  path="add"
                  element={<AddRecipe />}
                />
                <Route
                  path="my-recipes"
                  element={<MyRecipes />}
                />
                <Route
                  path="edit/:id"
                  element={<EditRecipe />}
                />
              </Route>
            </Route>
            <Route
              path="contact"
              element={<Contact />}
            />
            <Route path="blog">
              <Route
                index
                element={<Blogs />}
              />
              <Route
                path=":id"
                element={<SingleBlog />}
              />
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.ProUser, ROLES.Admin]} />
                }
              >
                <Route
                  path="add"
                  element={<AddBlog />}
                />
                <Route
                  path="my-blogs"
                  element={<MyBlogs />}
                />
                <Route
                  path="edit/:id"
                  element={<EditBlog />}
                />
              </Route>
            </Route>
            <Route
              element={
                <RequireAuth
                  allowedRoles={[ROLES.ProUser, ROLES.Admin]}
                />
              }
            >
              <Route
                path="profile"
                element={<Profile />}
              />
            </Route>
            <Route
              path="/*"
              element={<Error />}
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
