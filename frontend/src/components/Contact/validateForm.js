export default function validateForm(formData) {
  const errors = {};
  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email address is invalid";
  }
  if (!formData.company.trim()) {
    errors.company = "Company name is required";
  }
  if (!formData.need) {
    errors.need = "Need is required";
  }
  if (!formData.description.trim()) {
    errors.description = "Project description is required";
  }
  if (formData.budget === "SELECT ONE") {
    errors.budget = "Budget is required";
  }
  if (!formData.timeline.trim()) {
    errors.timeline = "Timeline is required";
  }
  if (!formData.findMe.trim()) {
    errors.findMe = "How you found me is required";
  }
  return errors;
}
