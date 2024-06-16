import React, {useEffect} from 'react'
import{MenuList} from '../helpers/MenuList'
import MenuItem from '../components/MenuItem'
import '../styles/Menu.css'

function Menu() {
  useEffect(() => {
    fetch('http://127.0.0.1:5002/api/admin/views/Menu', { 
      method: 'POST',
    })
      .catch(error => console.error('Error updating views:', error));
  }, [])
  return (
    <div className='menu'>
      <h1 className='menuTitle'>Our menu</h1>
      <div children='menuList'>
        {MenuList.map((menuItem, key)=>{
            return <MenuItem
            key={key}
            image={menuItem.image}
            name={menuItem.name}
            price={menuItem.price}
            />
        })}

      </div>
    </div>
  )
}

export default Menu
