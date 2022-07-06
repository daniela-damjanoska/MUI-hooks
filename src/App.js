import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

//pages imports
import SignIn from './Pages/SignIn.jsx';
import SignUp from './Pages/SignUp.jsx';
import Blog from './Pages/Blog.jsx';
import NotFound from './Pages/NotFound';

const theme = createTheme({
    palette: {
        primary: {
            light: pink[300],
            main: pink[600],
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<SignIn />}></Route>
                    <Route path="/SignUp" element={<SignUp />}></Route>
                    <Route path="/Blog" element={<Blog />}></Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
