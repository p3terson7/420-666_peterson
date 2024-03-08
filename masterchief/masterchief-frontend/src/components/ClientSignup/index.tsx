import React, { useState } from 'react';
import { clientSignup} from "../../services/signupService"; // Adjust the import path as necessary

const ClientSignupForm = () => {
    const [client, setClient] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        type: 'client',
    });

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setClient(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const response = await clientSignup(client);
            console.log('Signup Success:', response.data);
        } catch (error) {
            console.error('Signup Error:', e.response ? e.response.data : e.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="firstName"
                value={client.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
            />
            <input
                type="text"
                name="lastName"
                value={client.lastName}
                onChange={handleChange}
                placeholder="Last Name"
            />
            <input
                type="email"
                name="email"
                value={client.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                value={client.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <input
                type="text"
                name="address"
                value={client.address}
                onChange={handleChange}
                placeholder="Address"
                required
            />
            <input
                type="text"
                name="phone"
                value={client.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
            />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default ClientSignupForm;
