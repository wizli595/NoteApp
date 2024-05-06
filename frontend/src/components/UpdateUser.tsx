import {  UseMutateFunction} from "@tanstack/react-query";
import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { FaUserEdit } from "react-icons/fa";


export interface UpdateInfo {
  email: string;
  username: string;
}
type UpdateUserProps = {
  update: UseMutateFunction<void, unknown, UpdateInfo, unknown>;
  loggout:() => Promise<void>;
  isPending:boolean;
};

const UpdateUser = ({update,isPending,loggout}:UpdateUserProps) => {
  const [updateInfo,setUpdateInfo]=useState<UpdateInfo>({email:'',username:''});
  
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target;
    setUpdateInfo(prevState=>({
      ...prevState,
      [name]:value
    }));
  };
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(updateInfo);
    update(updateInfo);
    loggout();
  };
  return (
    <>
      <Card>
            <Card.Header as="h5"> <FaUserEdit/> update tour credentials</Card.Header>
            <Card.Body>
                <Card.Text>
                    You can update from here
                </Card.Text>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={updateInfo.email} 
                      onChange={handleChange}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                      type="text"
                      name="username" 
                      placeholder="Enter username"
                      value={updateInfo.username}
                      onChange={handleChange}
                      />
                  </Form.Group>
                  <Button 
                    variant="success" 
                    type="submit"
                    disabled={isPending}>
                    Update
                  </Button>
                </Form>    
            </Card.Body>
      </Card>
    </>
  )
}
export default UpdateUser;