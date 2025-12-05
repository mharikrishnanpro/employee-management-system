const PageHeader = ({ title, children }) => (
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-xl font-semibold">{title}</h1>
    {children}
  </div>
);

export default PageHeader;
