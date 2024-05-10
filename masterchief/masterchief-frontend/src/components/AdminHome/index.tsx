import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getUserById } from "../../services/userService";
import {Admin} from "../../model/user";
import "../../components/ClientHome/ClientHome.css";
import '../../components/MessagingMenu/Messaging.css';
import {getUserId} from "../../services/authService";

export const AdminHome = () => {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const currentUserId= getUserId();

    useEffect(() => {
        getUserById(parseInt(currentUserId!)).then((response: { data: any; }) => {
            setAdmin(response.data);
        });
    }, [currentUserId]);

    const backgroundColor = () => {
        return "#FF5733";
    }

    return (
        <Container fluid className="background-home-client">
            <div className="client-info">
                {admin && (
                    <>
                        <h1 className="page-title" style={{color: backgroundColor(), width: "500px"}}>Behold, {admin?.firstName} has returned</h1>
                        <div className="info-sheet">
                            <p><strong>Name:</strong> {admin.firstName} {admin.lastName}</p>
                            <p><strong>Email:</strong> {admin.email}</p>
                        </div>
                    </>
                )}
            </div>
        </Container>
    );
};
