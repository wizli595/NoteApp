import React from 'react';
import { useAuth } from '../../hooks/useAuth'; // Replace 'path/to/useAuth' with the actual path to your useAuth hook

const ProfilePage: React.FC = () => {
    const { user } = useAuth(); // Assuming the useAuth hook returns an object with a 'username' property

    return (
        <div>
            <h1>Welcome, {user?.username}!</h1>
            {/* Add more profile information here */}
        </div>
    );
};

export default ProfilePage;