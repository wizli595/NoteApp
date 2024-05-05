import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Timer from '../../components/Timer';
import { MdLogout} from 'react-icons/md';
import { useNavigate } from '@tanstack/react-router';
import { logout, updateUser,changePassword as changePass } from '../../Api/authApi';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../app/hooks/useAuth';
import UpdateUser from '../../components/UpdateUser';
import ChangePassword from '../../components/ChangePassword';
import { ErrorResponse } from '../LoginPage';
import axios from 'axios';

const DashboardPage: React.FC = () => {
    const {handleLogout:localLoggout}=useAuth();
    const navigate = useNavigate();

    // logout mutation
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

    // update mutation
    const {mutate:update,isPending:isLoading}=useMutation({
        mutationFn:updateUser,
        onSuccess:()=>{
          toast.success('update successfully');
          navigate({to:'/'});
        },
        onError:(err:unknown)=>{
          console.error(err);
          toast.error('An unexpected error occurred');
        }
      });
    // change password mutation
    const {mutate:change , isPaused:isLoadingChange}=useMutation({
        mutationFn:changePass,
        onSuccess:()=>{
          toast.success('Password changed successfully');
        },
        onError:(err:unknown)=>{
          if (axios.isAxiosError(err)) {
            const errorData = err.response?.data as ErrorResponse;
            const serverMessage = errorData.message || "Something went wrong!";
            toast.error(serverMessage);
        } else {
            console.error("Unexpected error:", err);
            toast.error("An unexpected error occurred");
        }
        }
    });

    // handle logout
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
            <Row>
                <Col className='mt-4'>
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
            <Row>
                <Col className='mt-4'>
                    <UpdateUser update={update} loggout={handleLogout} isPending={isLoading}  />
                </Col>
            </Row>
            <Row>
                <Col className='mt-4'>
                    <ChangePassword changePassword={change} isPending={isLoadingChange}/>
                </Col>
            </Row>
        </Container>
    );
};

export default DashboardPage;