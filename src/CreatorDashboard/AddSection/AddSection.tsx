import React, { useState } from 'react';
import './AddSection.css';

interface AddSectionProps {
    type: string;
}

const AddSection: React.FC<AddSectionProps> = ({ type }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        console.log("Card clicked");
        setIsExpanded((prev) => !prev);
    };

    return (
        <div className="add-section-card" onClick={handleToggle}>
            <h3 className="add-section-title">Add {type}</h3>
            {isExpanded && (
                <div className="add-section-dropdown">
                    <textarea placeholder={`Enter ${type} description`} />
                    <input type="text" placeholder="Topic" />
                    <select>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                    <button className="submit-button">Add {type}</button>
                </div>
            )}
        </div>
    );
};

export default AddSection;
