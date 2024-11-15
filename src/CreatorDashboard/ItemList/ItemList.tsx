import React, { useEffect, useState } from 'react';
import './ItemList.css';

interface Item {
    title: string;
    description: string;
    level?: string;
    topic?: string;
    language?: string;
}

interface ItemListProps {
    type: 'Problem' | 'Course';
}

const ItemList: React.FC<ItemListProps> = ({ type }) => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(`${type.toLowerCase()}Data`) || '[]');
        setItems(data);
    }, [type]);

    return (
        <div>
            <h3>{type} List</h3>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                        {type === "Problem" && (
                            <>
                                <p>Level: {item.level}</p>
                                <p>Topic: {item.topic}</p>
                            </>
                        )}
                        {type === "Course" && <p>Language: {item.language}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
