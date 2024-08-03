import { useState } from "react";
import axios from "axios";
import validateForm from "../components/Contact/validateForm.js";

export default function useForm(initialState, url) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(url, formData);
      console.log(response.data);
      alert("Email envoyé avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      alert("Erreur lors de l'envoi de l'email. Veuillez réessayer plus tard.");
    }
  };

  return {
    formData,
    handleChange,
    handleSelect,
    handleSubmit,
    errors,
  };
}
