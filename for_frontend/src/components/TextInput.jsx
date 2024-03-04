const TextInput = ({ label, name, placeholder, type="text", formData, handleInputChange }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-xl">{label}</label>
      <input
        type={type} id={name} name={name}
        placeholder={placeholder}
        className="border border-gray-300 rounded-md px-2 py-1 mb-4 text-center"
        style={{ width: '350px' }}
        value={formData[name]}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default TextInput;
