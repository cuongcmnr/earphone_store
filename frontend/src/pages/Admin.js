import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
function Admin() {
  const session = Cookies.get('session');
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (user && user.Role === 1) {
      fetch('http://127.0.0.1:5002/api/admin/products', { 
        method: 'GET',
        headers: {'Session': session}
    })
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching products:', error));
    } else {
      alert('You are not authorized to view this page');
    }
  }, [user]);

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5002/api/admin/products/${id}`, { 
      method: 'DELETE',
      headers: {'Session': session}
    })
      .then(() => {
        setProducts(products.filter(product => product.Id !== id));
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div>
      <h1>Admin</h1>
      <ul>
        {products.map(product => (
          <li key={product.Id}>
            {product.Name}
            <button onClick={() => handleDelete(product.Id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;