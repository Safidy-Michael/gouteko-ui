import React, { useState } from 'react';
import { FaEllipsisV, FaEdit, FaTrash, FaFilter } from 'react-icons/fa';
import Pagination from '../Pagination';

const ProductList = ({ products, searchTerm, onEdit, onDelete }) => {
    const [filterCategory, setFilterCategory] = useState("");
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(10);

    const filteredProducts = products.filter(product =>
        (product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterCategory === "" || product.category?.toLowerCase().includes(filterCategory.toLowerCase()))
    );

    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const paginatedProducts = filteredProducts.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
        setFilterCategory("");  
    };

    const resetFilter = () => {
        setFilterCategory("");
        setCurrentPage(0);
    };

    return (
        <div className="py-4">
            <table className="min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="text-center border-b p-4">PRODUCT NAME</th>
                        <th className="text-center border-b p-4">
                            CATEGORY
                            <button onClick={toggleFilterVisibility} className="ml-2 text-blue-500 hover:text-blue-700">
                                <FaFilter />
                            </button>
                        </th>
                        <th className="text-center border-b p-4">AVAILABLE QUANTITY</th>
                        <th className="text-center border-b p-4">PRICE</th>
                        <th className="text-center border-b p-4">ACTIONS</th>
                    </tr>
                    {isFilterVisible && (
                        <tr>
                            <th colSpan="5" className="p-4 text-center">
                                <div className="flex justify-center mb-4">
                                    <input
                                        type="text"
                                        placeholder="Filter by category"
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                        className="border p-2 rounded mr-2"
                                    />
                                    <button onClick={resetFilter} className="bg-gray-500 text-white px-4 py-2 rounded">
                                        Réinitialiser
                                    </button>
                                </div>
                            </th>
                        </tr>
                    )}
                </thead>
                <tbody>
                    {paginatedProducts.map((product) => (
                        <ProductRow key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} />
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

const ProductRow = ({ product, onEdit, onDelete }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <tr>
            <td className="text-center border-b p-4">{product.name}</td>
            <td className="text-center border-b p-4">{product.category}</td>
            <td className="text-center border-b p-4">{product.availableQuantity}</td>
            <td className="text-center border-b p-4">{product.price} ar</td>
            <td className="text-center border-b p-4 relative">
                <button onClick={toggleMenu} className="bg-transparent text-black py-1 px-2 rounded focus:outline-none">
                    <FaEllipsisV />
                </button>
                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10">
                        <button onClick={() => onEdit(product)} className="flex items-center p-2 hover:bg-gray-200 w-full text-left">
                            <FaEdit className="mr-1" /> Edit
                        </button>
                        <button onClick={() => onDelete(product.id)} className="flex items-center p-2 hover:bg-gray-200 w-full text-left">
                            <FaTrash className="mr-1" /> Delete
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
};

export default ProductList;
