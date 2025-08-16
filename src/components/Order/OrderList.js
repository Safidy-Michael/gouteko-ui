import React, { useEffect, useState, useCallback } from 'react';
import { FaEllipsisV, FaEye, FaFilter } from 'react-icons/fa';
import { getPaginationArg } from '../../api/orderApi';
import Pagination from '../Pagination';

const OrderList = ({ searchTerm, onShowDetails }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(10);


    const fetchOrders = useCallback(async (page = currentPage) => {
        setLoading(true);
        try {
            const { content} = await getPaginationArg(page, pageSize);
            setOrders(content || []);
        } catch (error) {
            console.error('Erreur lors de la récupération des commandes:', error);
            setError('Erreur lors de la récupération des commandes.');
        } finally {
            setLoading(false);
        }
    }, [currentPage, pageSize]);

    useEffect(() => {
        fetchOrders();
    }, [currentPage, fetchOrders]);

    const handleFilter = async () => {
        setLoading(true);
        try {
            const { content } = await getPaginationArg(currentPage, pageSize);
            const filtered = content.filter(order => {
                const orderDate = new Date(order.orderDate);
                const start = startDate ? new Date(startDate) : null;
                const end = endDate ? new Date(endDate) : null;
                return (!start || orderDate >= start) && (!end || orderDate <= end);
            });
            setOrders(filtered);
        } catch (error) {
            console.error('Erreur lors du filtrage des commandes:', error);
            setError('Erreur lors du filtrage des commandes.');
        } finally {
            setLoading(false);
        }
    };

    const resetFilter = () => {
        setStartDate('');
        setEndDate('');
        setCurrentPage(0);
        fetchOrders(0);
    };

    const toggleFilter = () => setShowFilter(!showFilter);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

  
    const filteredOrders = orders.filter(order =>
        (order.userName || '').toLowerCase().includes(searchTerm.toLowerCase())
    );


    const startIndex = currentPage * pageSize;
    const paginatedOrders = filteredOrders.slice(startIndex, startIndex + pageSize);
    const totalPages = Math.ceil(filteredOrders.length / pageSize);

    return (
        <div className="py-4">
            <table className="min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="text-center border-b p-4">USER NAME</th>
                        <th className="text-center border-b p-4 flex items-center justify-center">
                            ORDER DATE
                            <button onClick={toggleFilter} className="ml-2">
                                <FaFilter />
                            </button>
                        </th>
                        <th className="text-center border-b p-4">TOTAL AMOUNT</th>
                        <th className="text-center border-b p-4">ACTIONS</th>
                    </tr>
                    {showFilter && (
                        <tr>
                            <th colSpan="4" className="p-4 text-center">
                                <div className="flex justify-center mb-4">
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="border p-2 rounded mr-2"
                                    />
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="border p-2 rounded mr-2"
                                    />
                                    <button
                                        onClick={handleFilter}
                                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                    >
                                        Filtrer
                                    </button>
                                    <button
                                        onClick={resetFilter}
                                        className="bg-gray-500 text-white px-4 py-2 rounded"
                                    >
                                        Réinitialiser
                                    </button>
                                </div>
                            </th>
                        </tr>
                    )}
                </thead>
                <tbody>
                    {paginatedOrders.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="text-center py-6 text-gray-500 italic">
                                Aucun order trouvé.
                            </td>
                        </tr>
                    ) : (
                        paginatedOrders.map(order => (
                            <OrderRow key={order.id} order={order} onShowDetails={onShowDetails} />
                        ))
                    )}
                </tbody>
            </table>

            <div className="flex justify-center mt-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredOrders.length}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

const OrderRow = ({ order, onShowDetails }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <tr>
            <td className="text-center border-b p-4">{order.userName}</td>
            <td className="text-center border-b p-4">{order.orderDate}</td>
            <td className="text-center border-b p-4">{order.totalAmount} ar</td>
            <td className="text-center border-b p-4 relative">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="bg-transparent text-black py-1 px-2 rounded focus:outline-none"
                >
                    <FaEllipsisV />
                </button>
                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10">
                        <button
                            onClick={() => {
                                onShowDetails(order.id);
                                setIsMenuOpen(false);
                            }}
                            className="flex items-center p-2 hover:bg-gray-200 w-full text-left"
                        >
                            <FaEye className="mr-1" /> Show
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
};

export default OrderList;
