import React from 'react';
import { useAuth } from '../../app/hooks/useAuth'; 

const ProfilePage: React.FC = () => {
    const { user } = useAuth(); 

    return (
        <div>
            <h1>Welcome, {user?.username}!</h1>
            {/* Add more profile information here */}
        </div>
    );
};

export default ProfilePage;