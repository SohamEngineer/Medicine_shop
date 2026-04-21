import React, { useState } from 'react';
import "./contact.css"
function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [messageError, setMessageError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setNameError('');
        setEmailError('');
        setMessageError('');

        let isValid = true;

        if (!name) {
            setNameError('Name is required.');
            isValid = false;
        }

        if (!email) {
            setEmailError('Email is required.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            setEmailError('Invalid email format.');
            isValid = false;
        }

        if (!message) {
            setMessageError('Message is required.');
            isValid = false;
        }

        if (isValid) {
            // Simulate sending the message (replace with actual backend logic)
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);

            setSuccessMessage('Thank you for your message!');
            setName('');
            setEmail('');
            setMessage('');
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="contact-container" style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
            <div className="card-premium" style={{ padding: '40px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2.5rem' }}>Get in Touch</h1>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '40px' }}>
                    Have questions about medicines or your order? Our pharmacists are here to help.
                </p>
                
                <form onSubmit={handleSubmit} className="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="form-group">
                        <label htmlFor="name" style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Name</label>
                        <input className="input-premium" type="text" id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <span className="error" style={{ color: '#ef4444', fontSize: '0.8rem' }}>{nameError}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Email Address</label>
                        <input className="input-premium" type="email" id="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <span className="error" style={{ color: '#ef4444', fontSize: '0.8rem' }}>{emailError}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="message" style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Your Message</label>
                        <textarea className="input-premium" id="message" placeholder="How can we help you?" value={message} onChange={(e) => setMessage(e.target.value)} rows="5" required />
                        <span className="error" style={{ color: '#ef4444', fontSize: '0.8rem' }}>{messageError}</span>
                    </div>

                    <button className="btn-premium btn-primary-p" type="submit" style={{ marginTop: '10px' }}>
                        Send Message
                    </button>
                    
                    {successMessage && (
                        <div style={{ background: '#dcfce7', color: '#166534', padding: '15px', borderRadius: '8px', textAlign: 'center', fontWeight: '500' }}>
                            {successMessage}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Contact;