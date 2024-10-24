import React from 'react';

const UserList = ({ users, onEdit, onDelete, onShow }) => {
    return (
        <div className=" flex w-96 flex-col rounded-lg border border-slate-200 bg-white shadow-sm absolute top-4 right-8">
            <nav className="flex min-w-[240px] flex-col gap-1 p-1.5">
                {users.map(user => (
                    <div key={user.id} className="text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 mb-4">
                        <div className="mr-4 grid place-items-center">
                            <img
                                alt={`${user.firstName} ${user.lastName}`}
                                src={user.imageBase64 || 'https://via.placeholder.com/150'}
                                className="relative inline-block h-12 w-12 !rounded-full object-cover object-center"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} 
                            />
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h6 className="text-slate-800 font-medium">
                                {user.firstName} {user.lastName}
                            </h6>
                            <p className="text-slate-500 text-sm">
                                {user.email}
                            </p>
                            <div className="mt-2 flex justify-end">
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
                            </div>
                        </div>
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default UserList;
