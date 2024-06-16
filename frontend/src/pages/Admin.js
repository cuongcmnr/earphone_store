import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function Admin() {
  const session = Cookies.get('session');
  const [products, setProducts] = useState([]);
  const [views, setViews] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5002/api/admin/products', { 
      method: 'GET',
      headers: {'Session': session}
    })
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));

    fetch('http://127.0.0.1:5002/api/admin/views', { 
      method: 'GET',
      headers: {'Session': session}
    })
      .then(response => response.json())
      .then(data => setViews(data))
      .catch(error => console.error('Error fetching views:', error));
  }, []);

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
      <h1>Admin Portal</h1>
      <ul>
        {products.map(product => (
          <li key={product.Id}>
            {product.Name}
            <button onClick={() => handleDelete(product.Id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Views</h2>
      <ul>
        {views.map(view => (
          <li key={view.Id}>
            Page: {view.Page}, Views: {view.Count}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
