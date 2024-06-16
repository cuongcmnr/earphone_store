import React, { useState } from 'react';
import axios from 'axios';
import ContactImg from '../assets/d.jpg';
import '../styles/Contact.css';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5002/api/review/contact', {
        Cusname: name,
        Email: email,
        Feedback: message
      });

      if (response.status === 200) {
        alert('Message sent successfully!');
      } else {
        alert('Failed to send message!');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };
  return (
    <div className="contactContainer">
      <div className="about">
        <div className="aboutBottom">
          <h1>ABOUT US</h1>
          <p>Headphone Vietnam is renowned for its innovative and high-quality headphones, 
            catering to the diverse needs of music enthusiasts across the country. 
            With a rich legacy of technological advancement and a commitment to delivering immersive audio experiences, 
            Sony has established itself as a leading brand in the Vietnamese headphone market. 
            From sleek and stylish designs to cutting-edge noise-canceling technology, 
            Headphone offer unparalleled sound clarity and comfort, 
            making them a popular choice among discerning consumers. 
            Whether it is enjoying your favorite tunes on the go or immersing yourself in the world of gaming, 
            Headphone headphones with comprehensive after-sales support and warranty services, 
            embody a perfect blend of style, performance, and durability, 
            setting new standards in audio excellence in Vietnam.</p>
        </div>
      </div>

      <div className="separator"></div>

      <div className="contact">
        <div className="leftSide" style={{ backgroundImage: `url(${ContactImg})` }}></div>
        <div className="rightSide">
          <h1>Contact us</h1>
          <form id="contact-form" method="POST" onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input name="name" placeholder="Enter full name..." type="text" value={name} onChange={e => setName(e.target.value)} />
            <label htmlFor="email">Email</label>
            <input name="email" placeholder="Enter email..." type="text" value={email} onChange={e => setEmail(e.target.value)} />
            <label htmlFor="message">Message</label>
            <textarea rows="6" placeholder="Enter message..." name="message" required value={message} onChange={e => setMessage(e.target.value)}></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
