import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Timer from '../../components/Timer';
import { MdLogout} from 'react-icons/md';
import { useNavigate } from '@tanstack/react-router';
import { logout, updateUser,changePassword as changePass, getMysession, loggoutAllMySessions } from '../../Api/authApi';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../app/hooks/useAuth';
import UpdateUser from '../../components/UpdateUser';
import ChangePassword from '../../components/ChangePassword';
import { formatError } from '../../utils/formatError';
import SessionCard from '../../components/SessionCard';

const DashboardPage: React.FC = () => {
    const {handleLogout:localLoggout}=useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    // logout mutation
    const {mutate,isPending}=useMutation({
        mutationFn:logout,
        onSuccess:()=>{
            toast.success('Logged out successfully');
            localLoggout();
            navigate({to:'/login'});
        },
        onError:(err:unknown)=>{
            formatError(err);
        }   
    });

    // update mutation
    const {mutate:update,isPending:isLoading}=useMutation({
        mutationFn:updateUser,
        onSuccess:()=>{
          toast.success('update successfully');
          handleLogout();
        //   navigate({to:'/'});
        },
        onError:(err:unknown)=>{
          formatError(err);
        }
      });
    // change password mutation
    const {mutate:change , isPaused:isLoadingChange}=useMutation({
        mutationFn:changePass,
        onSuccess:()=>{
          toast.success('Password changed successfully');
        },
        onError:(err:unknown)=>{
          formatError(err);
        }
    });
    // get all user sesiions
    const {data:sessions,
        isLoading:LoadingSession,
        isError}=useQuery({
        queryKey:['sessions'],
        queryFn:getMysession,
        
    });
    // log out all sessions
    const {mutate:loggOutAll}=useMutation({
        mutationFn:loggoutAllMySessions,
        onSuccess:()=>{
            toast.success('Logged out from all successfully');
            queryClient.invalidateQueries({queryKey:['sessions']});
        },
        onError:(err:unknown)=>{
            formatError(err);
        }
    });

    // handle logout
    const handleLogout = async () => {
        console.log('Logout');
        mutate();
    }
    const handleLogoutAll = async () => {
        console.log('Logout all');
        loggOutAll();
    };
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
                        <Card.Header as="h5"><MdLogout  /> Log out</Card.Header>
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
                    <UpdateUser update={update} isPending={isLoading}  />
                </Col>
            </Row>
            <Row>
                <Col className='mt-4'>
                    <ChangePassword changePassword={change} isPending={isLoadingChange}/>
                </Col>
            </Row>
            <Row>
                <Col className='mt-4'>
                    {LoadingSession ? <p>Loading...</p>:isError ?
                    (<p>Something went wrong</p>)
                     :<SessionCard    sessions={sessions!} loggOutAll={handleLogoutAll} />
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default DashboardPage;