import React, { memo } from "react";
import Button from "../ui/Button";

const Pagination = ({ page, totalPages, onPrev, onNext }) => {
  return (
    <div className="flex justify-center gap-3 mt-6">

      {/* Prev */}
      <Button
        variant="secondary"
        disabled={page === 1}
        onClick={onPrev}
      >
        Prev
      </Button>

      {/* Page Display */}
      <span className="px-4 py-2 bg-white shadow rounded">
        {page} / {totalPages}
      </span>

      {/* Next */}
      <Button
        variant="secondary"
        disabled={page === totalPages}
        onClick={onNext}
      >
        Next
      </Button>

    </div>
  );
};

export default memo(Pagination);
