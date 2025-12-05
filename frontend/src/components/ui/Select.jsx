const Select = ({ label, error, children, className = "", ...props }) => {
  return (
    <div className="w-full mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}

      <select
        {...props}
        className={`w-full px-3 py-2 border rounded-lg outline-none 
          focus:ring-2 focus:ring-blue-500 transition
          ${error ? "border-red-500" : "border-gray-300"}
          ${className}`}
      >
        {children}
      </select>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Select;
