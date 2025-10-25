
function Pagination({ currentPage, totalPages, onPageChange, maxButtons = 5 }){

    const getPageNumbers = () => {
        const pages = [];
        const half = Math.floor(maxButtons / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, currentPage + half);

        // Adjust the edge pages if less than maxButtons
        if (end - start + 1 < maxButtons) {
            if (start === 1) {
                end = Math.min(totalPages, start + maxButtons - 1);
            } else if (end === totalPages) {
                start = Math.max(1, end - maxButtons + 1);
            }
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
    <div className="pagination">
        <button
            className="btn btn-prev"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
        >
            Prev
        </button>

        {/* first page must be always visible*/}
        {pageNumbers[0] > 1 && (
            <>
            <button
                className={currentPage=== 1 ? "btn selected" : "btn"}
                onClick={() => onPageChange(1)}
            >
            1
            </button>
            {pageNumbers[0] > 2 && <span>...</span>}
            </>
        )}

        {pageNumbers.map((num) => (
            <button
                key={num}
                className={currentPage==num ? "btn selected" : "btn"}
                onClick={() => onPageChange(num)}
            >
                {num}
            </button>
        ))}
        
        {/* last page must be always visible*/}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
            <>
                {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <span >...</span>}
                <button
                    className={currentPage == totalPages ? "btn selected" : "btn"}
                    onClick={() => onPageChange(totalPages)}
                >
                    {totalPages}
                </button>
            </>
        )}

        <button
            className="btn btn-next"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
        >
            Next
        </button>
    </div>);
};

export default Pagination;
