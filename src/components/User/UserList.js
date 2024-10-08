import React from 'react';

const UserList = ({ users, onEdit, onDelete, onShow }) => {
    return (
        <div className="d-flex justify-content-end" style={{ height: '100vh' }}>
        <ul className="list-unstyled position-absolute top-0 end-0 mt-4 me-5 custom-margin">
            {users.map(user => (
                <li key={user.id} className="top0 mb-4">
                        {user.firstName} {user.lastName} - {user.email}
                         
                    <button
                        onClick={() => onEdit(user)}
                        className="btn btn-outline-danger bg-danger text-white px-2 me-2 py-1 rounded">
                        Edit
                    </button>   
                    <button
                        onClick={() => {
                            if (user.id) { 
                                onShow(user.id); 
                            } else {
                                console.error("User ID is null or undefined");
                            }
                        }}
                        className="btn btn-outline-danger bg-danger text-white px-2 me-2 py-1 rounded">
                        Show
                    </button>
                    <button
                        onClick={() => onDelete(user.id)}
                        className="btn btn-outline-danger bg-danger text-white px-2 me-2 py-1 rounded">
                        Delete
                    </button>
                </li>
            ))}
        </ul>
        </div>

    );
};

export default UserList;
