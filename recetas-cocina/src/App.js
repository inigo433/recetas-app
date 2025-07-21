import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recetas" element={<RecipeList />} />
          <Route path="/crear" element={<RecipeForm />} />
          <Route path="/editar/:id" element={<RecipeForm editMode />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
