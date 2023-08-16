import "./App.css";
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from "./components/common/Navbar";
import Signup from './pages/SignupPage'
import Login from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyOtp from "./pages/VerifyOtp";
import AboutPage from "./pages/AboutPage";
import OpenRoute from "./components/core/auth/OpenRoute";
import ContactUs from "./pages/ContactUs";
import Error from "./pages/Error";  
import MyProfile from "./components/core/Dashboard/MyProfile/MyProfile";
import Dashboard from './pages/Dashboard'
import ProtectedRoute from "./components/core/auth/ProtectedRoute";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/Cart";
import SettingsIndex from './components/core/Dashboard/Settings/SettingsIndex'
import AddCourseIndex from "./components/core/Dashboard/AddCourse/AddCourseIndex";
import MyCourses from "./components/core/Dashboard/MyCourses/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/InstructorDashboard/Instructor";

function App() {

  const {user} = useSelector((state) => state.profile)

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex-col font-inter text-white" >
      
      <Navbar/>
      <Routes>
        
        <Route path="/" Component={Home}/>
        <Route path="/about" Component={AboutPage} ></Route>
        <Route path="/contact" Component={ContactUs} ></Route>
        <Route path="/catalog/:catalogName" Component={Catalog} ></Route>
        <Route path="/courses/:courseId" element={<CourseDetails/>} />

        <Route
        element = {
          <ProtectedRoute>
            <ViewCourse/>
          </ProtectedRoute>
        }
        >

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && 
            <Route path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId" 
            element={
              <VideoDetails/>
            } />

          }

        </Route>



        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />


          <Route
            path="login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />


          <Route
            path="forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />  


          <Route
            path="verify-email"
            element={
              <OpenRoute>
                <VerifyOtp />
              </OpenRoute>
            }
          />  


          <Route
            path="updatePassword/:id"
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
          />  


          <Route  element={
            <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute>
          } >

          <Route path="/dashboard/my-profile" element = {<MyProfile/> } />
          <Route path="/dashboard/settings" element = {<SettingsIndex/> } />

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
              </>
            )
          }

          {
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                <Route path="dashboard/add-course" element={<AddCourseIndex />} />
                <Route path="dashboard/my-courses" element={<MyCourses />} />
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>} />
                <Route path='/dashboard/instructor' element={<Instructor/>} />

                </>
              )

          }

        </Route>

        <Route path={'*'} element={<Error/>} ></Route>


        </Routes>
    </div>
  );
}

export default App;
