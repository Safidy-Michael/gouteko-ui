import React, { useState } from 'react';
import Pagination from '../Pagination';
import { FaEllipsisV, FaEdit, FaEye, FaTrash } from 'react-icons/fa';

const UserList = ({ users, onEdit, onDelete, onShow }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const startIndex = currentPage * pageSize;
  const paginatedUsers = users.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(users.length / pageSize);

  return (
    <div className="py-4 px-2 md:px-6">
      <table className="min-w-full border-collapse bg-white shadow-md rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            {['USER NAME', 'EMAIL', 'ROLE', 'IMAGE', 'ACTIONS'].map(header => (
              <th key={header} className="text-center border-b border-gray-300 p-4 text-gray-700 font-semibold text-sm">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500 italic">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          ) : (
            paginatedUsers.map(user => (
              <UserRow
                key={user.id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
                onShow={onShow}
              />
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-center mt-6">
        <Pagination
          currentPage={currentPage}
          totalItems={users.length}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

const UserRow = ({ user, onEdit, onDelete, onShow }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="text-center border-b border-gray-200 p-4 whitespace-nowrap font-medium text-gray-800">
        {user.firstName} {user.lastName}
      </td>
      <td className="text-center border-b border-gray-200 p-4 whitespace-nowrap text-gray-600">{user.email}</td>
      <td className="text-center border-b border-gray-200 p-4 whitespace-nowrap text-gray-600">{user.role}</td>
      <td className="text-center border-b border-gray-200 p-4">
        <img
          alt={`${user.firstName} ${user.lastName}`}
          src={user.imageBase64 || 'https://via.placeholder.com/150'}
          className="inline-block h-12 w-12 rounded-full object-cover mx-auto"
          onError={e => { e.target.src = 'https://via.placeholder.com/150'; }}
        />
      </td>
      <td className="text-center border-b border-gray-200 p-4 relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Actions menu"
          className="bg-transparent text-gray-600 hover:text-gray-900 py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <FaEllipsisV size={18} />
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-20">
            <button onClick={() => { onEdit(user); setIsMenuOpen(false); }} className="flex items-center gap-2 p-2 w-full hover:bg-gray-100 text-gray-700 text-sm">
              <FaEdit /> Edit
            </button>
            <button onClick={() => { onShow(user.id); setIsMenuOpen(false); }} className="flex items-center gap-2 p-2 w-full hover:bg-gray-100 text-gray-700 text-sm">
              <FaEye /> Show
            </button>
            <button onClick={() => { onDelete(user.id); setIsMenuOpen(false); }} className="flex items-center gap-2 p-2 w-full hover:bg-gray-100 text-red-600 text-sm">
              <FaTrash /> Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default UserList;
