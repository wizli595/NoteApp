import React from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { Session } from '@prisma/client';
import { RiComputerLine } from "react-icons/ri";
import UAParser from 'ua-parser-js';
interface SessionCardProps {
    sessions: Session[];
    loggOutAll: () => Promise<void>;
}

const SessionCard: React.FC<SessionCardProps> = ({ sessions,loggOutAll }) => {
    const parser = new UAParser(); // Create a new parser instance

    return (
        <Card className="my-4">
            <Card.Header className="bg-primary text-white">Sessions</Card.Header>
            <ListGroup variant="flush">
                {sessions.map((session) => {
                    const browser = parser.setUA(session.userAgent).getBrowser();
                    const os = parser.getOS();
                    return (
                        <ListGroup.Item key={session.id} className="d-flex align-items-center justify-content-between py-3">
                            <div>
                                <RiComputerLine className="me-2" size="1.5em" />
                                <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                                    {browser.name} {browser.version} on {os.name}
                                </span>
                            </div>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
            <Card.Footer className="d-flex justify-content-center">
                <Button variant="danger" onClick={loggOutAll}>Log out all</Button>
            </Card.Footer>
        </Card>
    );
};

export default SessionCard;