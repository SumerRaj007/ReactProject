import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddProduct from './AddProduct'
import UpdateProduct from './UpdateProduct'
import Login from './Login'
import Register from './Register'
import Protected from './Protected';
import ProductList from './ProductList'
import SearchProduct from './SearchProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          {/* Protected Routes */}
          <Route path="/" element={<Protected cmp={ProductList} />} />
          <Route path="/Add" element={<Protected cmp={AddProduct} />} />
          <Route path="/Update/:id" element={<Protected cmp={UpdateProduct} />} />
          <Route path="/search" element={<Protected cmp={SearchProduct} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
