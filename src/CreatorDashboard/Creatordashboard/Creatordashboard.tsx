import React, { useEffect, useState } from 'react';
import { auth, db } from '../../utils/firebase';
import { getDoc, doc } from 'firebase/firestore';
import ProfileHeader  from '../ProfileHeader/ProfileHeader';
import AddSection from '../AddSection/AddSection';
import ItemList from '../ItemList/ItemList';
import './CreatorDashboard.css';

const CreatorDashboard: React.FC = () => {
    const [creatorName, setCreatorName] = useState<string>('');
    const [profilePhoto, setProfilePhoto] = useState<string>('');

    useEffect(() => {
        const fetchCreatorData = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setCreatorName(docSnap.data().name);
                    setProfilePhoto(user.photoURL || '');
                }
            }
        };
        fetchCreatorData();
    }, []);

    return (
        <div>
            <ProfileHeader name={creatorName} photo={profilePhoto} />
            <AddSection type="Problem" />
            <ItemList type="Problem" />
            <AddSection type="Course" />
            <ItemList type="Course" />
        </div>
    );
};

export default CreatorDashboard;
