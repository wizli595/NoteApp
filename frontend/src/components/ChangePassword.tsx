import { UseMutateFunction } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaLock ,FaKey } from 'react-icons/fa';

export type Password ={
    password:string;
    newPassword:string;
}
type Props = {
    changePassword: UseMutateFunction<void, unknown, Password, unknown>;
    isPending: boolean;
}
type PasswordData={
    password:string;
    newPassword:string;
    confirmPassword:string;
};

const ChangePassword = ({changePassword,isPending}: Props) => {

    const [passwordData,setPasswordData]=useState<PasswordData>({password:'',newPassword:'',confirmPassword:''});
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        setPasswordData(prevState=>({
            ...prevState,
            [name]:value
        }));
    };
    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const {password,newPassword,confirmPassword}=passwordData;
        if(newPassword!==confirmPassword){
            toast.error('Password do not match');
            return;
        }
        changePassword({password,newPassword});
    };
  return (
    <>
     <Card>
        <Card.Header as="h5"><FaLock /> update password</Card.Header>
        <Card.Body>
            
            <Card.Text>
                You can change your password from here
            </Card.Text>    
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label><FaKey/> current Password</Form.Label>
                    <Form.Control 
                        type="password"
                        name="password"
                        placeholder="Enter your current password"
                        value={passwordData.password}
                        onChange={handleChange}
                        />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicNewPassword">
                    <Form.Label> <FaKey/> New Password</Form.Label>
                    <Form.Control 
                        type="password"
                        name="newPassword"
                        placeholder="Enter your new password"
                        value={passwordData.newPassword}
                        onChange={handleChange}
                        />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label><FaKey/> Confirm Password</Form.Label>
                    <Form.Control 
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your new password"
                        value={passwordData.confirmPassword}
                        onChange={handleChange}
                        />
                </Form.Group>
                <Button 
                    variant="primary" 
                    type="submit"
                    disabled={isPending}
                    >
                    {isPending?'Changing password...':'Change Password'}   
                </Button>
            </Form>
        </Card.Body>
     </Card>
    
    </>
  )
}

export default ChangePassword;