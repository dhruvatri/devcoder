import React from 'react';
import './ProfileHeader.css';

interface ProfileHeaderProps {
    name: string;
    photo: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, photo }) => {
    return (
        <div className="profile-header">
            <img src={photo} alt="Profile" className="profile-photo" />
            <h1>Welcome, {name}</h1>
        </div>
    );
};

export default ProfileHeader;
