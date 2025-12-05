const FileInput = ({ label, error, onChange, className = "" }) => {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <div className="w-full mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={`block w-full text-sm file:mr-4 file:py-2 file:px-4 
          file:rounded-lg file:border-0 cursor-pointer
          file:bg-blue-600 file:text-white hover:file:bg-blue-700
          ${className}`}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FileInput;
