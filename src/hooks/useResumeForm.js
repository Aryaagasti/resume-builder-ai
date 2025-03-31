import { useState } from 'react';

const useResumeForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleArrayChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const addItem = (fieldName, item) => {
    if (item) {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: [...prevData[fieldName], item],
      }));
    }
  };

  const removeItem = (fieldName, index) => {
    setFormData((prevData) => {
      const updatedItems = [...prevData[fieldName]];
      updatedItems.splice(index, 1);
      return { ...prevData, [fieldName]: updatedItems };
    });
  };

  const resetForm = () => setFormData(initialState);

  return {
    formData,
    handleChange,
    handleArrayChange,
    addItem,
    removeItem,
    resetForm,
  };
};

export default useResumeForm;
