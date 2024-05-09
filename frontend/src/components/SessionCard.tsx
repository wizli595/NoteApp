import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Session } from '@prisma/client';
import { RiComputerLine } from "react-icons/ri";

interface SessionCardProps {
    sessions: Session[];
}

const SessionCard: React.FC<SessionCardProps> = ({ sessions }) => {
    return (
        <Card>
            <Card.Header>Sessions</Card.Header>
            <ListGroup variant="flush">
                {sessions.map((session) => (
                    <ListGroup.Item key={session.id}>
                        <h5>
                            <RiComputerLine />
                            {session.userAgent}
                        </h5>
                        {/* <p>{(session.createdAt}</p> */}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card>
    );
};

export default SessionCard;