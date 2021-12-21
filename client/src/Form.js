const Form = ({ label, onSubmit, value, name, onChange }) => {
  return (
    <form onSubmit={onSubmit} className="form-container">
      <label htmlform="index">{label}</label>
      <input
        type="number"
        id="index"
        onChange={onChange}
        name={name}
        value={value}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
