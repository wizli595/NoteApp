import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Timer from '../../components/Timer';
import { MdLogout} from 'react-icons/md';
import { useNavigate } from '@tanstack/react-router';
import { logout } from '../../Api/authApi';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../app/hooks/useAuth';

const DashboardPage: React.FC = () => {
    const {handleLogout:localLoggout}=useAuth();
    const {mutate,isPending}=useMutation({
        mutationFn:logout,
        onSuccess:()=>{
            toast.success('Logged out successfully');
            navigate({to:'/login'});
        },
        onError:(err:unknown)=>{
            console.error(err);
            toast.error('An unexpected error occurred');
        }
});
    const navigate = useNavigate();
    const handleLogout = async () => {
        console.log('Logout');
        localLoggout();
        mutate();
    }
    return (
        <Container>
            <Row>
                <Col className='mb-4'>
                    <h1>Welcome to the Dashboard</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Timer />
                </Col>
            </Row>
            <Row >
                <Col className='mt-4'>
                    <h2>Dashboard Content</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Header as="h5">Log out</Card.Header>
                        <Card.Body>
                            
                            <Card.Text>
                                You can log out from here
                            </Card.Text>    
                            <Button 
                                variant="danger" 
                                disabled={isPending}
                                onClick={handleLogout}>
                                <MdLogout size={25} /> Log out
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default DashboardPage;