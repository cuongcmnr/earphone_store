import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
function Admin() {
  const [cookies] = useCookies(['connect.sid']);
  const session = cookies.session;
  const [products, setProducts] = useState([]);
  const [views, setViews] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5002/api/admin/products', { 
      method: 'GET',
      headers: {'Cookie': `connect.sid=${session}`}
    })
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5002/api/admin/products/${id}`, { 
      method: 'DELETE',
      headers: {'Cookie': `connect.sid=${session}`}
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