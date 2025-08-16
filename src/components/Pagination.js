
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const prevPage = () => {
        if (currentPage > 0) {  
            onPageChange(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages - 1) {  
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="pagination" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button onClick={prevPage} disabled={currentPage === 0}>
                &lt; Page Précédente
            </button>
            <span>{`Page ${currentPage + 1} sur ${totalPages}`}</span> {}
            <button onClick={nextPage} disabled={currentPage === totalPages - 1}>
                Page Suivante &gt;
            </button>
        </div>
    );
};

export default Pagination;
