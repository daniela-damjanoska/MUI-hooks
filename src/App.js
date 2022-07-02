import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//pages imports
import SignIn from './Pages/SignIn.jsx';
import SignUp from './Pages/SignUp.jsx';
import Blog from './Pages/Blog.jsx';
import NotFound from './Pages/NotFound';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />}></Route>
                <Route path="/SignUp" element={<SignUp />}></Route>
                <Route path="/Blog" element={<Blog />}></Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
