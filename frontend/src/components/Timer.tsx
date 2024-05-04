import { useQuery } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import fetchUserIP from "../Api/ipApi";
import Loader from "./Loader";
import { MdTimer } from 'react-icons/md';


const Timer = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [clockInTime, setClockInTime] = useState('');  
    const {data,isError,error}=useQuery({queryKey:['ip'],queryFn:fetchUserIP})
    useEffect(() => {
        const initialTime = new Date();
        initialTime.setSeconds(initialTime.getSeconds() + 60);
        setClockInTime(formatTime(initialTime));
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    },[]);
    const formatTime = (date:Date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHour = hours % 12 === 0 ? 12 : hours % 12;  
        return `${formattedHour.toString().padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
    };
  return (<>
    <Card>
        <Card.Header as="h5"><MdTimer /> Today's Attendance</Card.Header>
        <Card.Body>
            <Row>
                <Col>
                    <Card.Title>Current IP Address</Card.Title>
                    <Card.Text><Suspense fallback={<Loader />}>
                        {  isError ? <p>{error.message}</p> :data}
                        </Suspense></Card.Text>
                </Col>
                <Col>
                    <Card.Title>Current Time</Card.Title>
                    <Card.Text>{formatTime(currentTime)}</Card.Text>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Card.Title>Clocked In</Card.Title>
                    <Card.Text>{clockInTime}</Card.Text>
                </Col>
                <Col>
                    <Card.Title>Clocked Out</Card.Title>
                    <Card.Text>02:01 pm</Card.Text>
                </Col>
            </Row>
        </Card.Body>
    </Card>
  </>
  )
}
export default Timer;