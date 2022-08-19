import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Loan from './pages/Loan';
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import MyPage from "./pages/MyPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Return from "./pages/Return";
import BookManagement from "./pages/BookManagement";
import StudentManagement from "./pages/StudentManagement";
import OverdueList from "./pages/OverdueList";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/loan" element={<Loan />} />
      <Route path="/return" element={<Return />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/book-management" element={<BookManagement/>}/>
      <Route path="/student-management" element={<StudentManagement/>}/>
      <Route path="/overdue-list" element={<OverdueList/>}/>
      <Route path={"*"} element={<NotFound />}/>
    </Routes>
  );
};

export default App;