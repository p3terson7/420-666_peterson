import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getUserById } from "../../services/userService";
import { Client } from "../../model/user";
import "./ClientHome.css";
import '../../components/MessagingMenu/Messaging.css';
import {getUserId} from "../../services/authService";

export const ClientHome = () => {
    const [client, setClient] = useState<Client | null>(null);
    const currentUserId= getUserId();

    useEffect(() => {
        getUserById(parseInt(currentUserId!)).then((response: { data: any; }) => {
            setClient(response.data);
        });
    }, [currentUserId]);

    const backgroundColor = () => {
        if (client?.colorCode) {
            return client.colorCode;
        } else {
            return "#9b59b6";
        }
    }

    return (
        <Container fluid className="background-home-client">
            <div className="client-info">
                <h1 className="page-title" style={{color: backgroundColor(), width: "500px"}}>Welcome, {client?.firstName}</h1>
                {client && (
                    <div className="info-sheet">
                        <p><strong>Name:</strong> {client.firstName} {client.lastName}</p>
                        <p><strong>Email:</strong> {client.email}</p>
                        <p><strong>Address:</strong> {client.address}</p>
                        <p><strong>Phone:</strong> {client.phone}</p>
                    </div>
                )}
            </div>
        </Container>
    );
};
