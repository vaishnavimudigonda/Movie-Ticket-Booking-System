const Spinner = ({ size = 'md' }) => {
  const sizes = { sm: 'w-5 h-5', md: 'w-10 h-10', lg: 'w-16 h-16' };
  return (
    <div className="flex justify-center items-center py-12">
      <div className={`${sizes[size]} border-4 border-primary border-t-transparent rounded-full animate-spin`} />
    </div>
  );
};

export default Spinner;
