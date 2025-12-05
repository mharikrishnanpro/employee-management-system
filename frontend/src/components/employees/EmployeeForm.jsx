import { useState, useEffect } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import FileInput from "../ui/FileInput";
import Button from "../ui/Button";
import { validateEmployeeForm } from "../../utils/validators";
import { showError } from "../../utils/toast";

const EmployeeForm = ({ initialValues, isEdit, onSubmit }) => {
  const [form, setForm] = useState(initialValues);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(initialValues?.profileImage || null);

  useEffect(() => {
    setForm(initialValues);
    setPreview(initialValues?.profileImage || null);
  }, [initialValues]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (file) => {
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const submitForm = (e) => {
    e.preventDefault();

    const error = validateEmployeeForm(form);

    if (error) {
      return showError(error);
    }

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("phone", form.phone);
    fd.append("designation", form.designation);
    fd.append("salary", form.salary);

    if (imageFile) {
      fd.append("profileImage", imageFile);
    }

    onSubmit(fd);
  };

  return (
    <form onSubmit={submitForm} className="space-y-4">
      <Input
        label="Name"
        name="name"
        placeholder="Enter name"
        value={form.name}
        onChange={handleChange}
      />

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="Enter email"
        value={form.email}
        onChange={handleChange}
      />

      <Input
        label="Phone"
        name="phone"
        placeholder="Enter phone"
        value={form.phone}
        onChange={handleChange}
      />

      <Select
        label="Designation"
        name="designation"
        value={form.designation}
        onChange={handleChange}
      >
        <option value="">-- Select --</option>
        <option value="HR">HR</option>
        <option value="Developer">Developer</option>
        <option value="Manager">Manager</option>
      </Select>

      <Input
        label="Salary"
        name="salary"
        type="number"
        placeholder="Enter salary"
        value={form.salary}
        onChange={handleChange}
      />

      <FileInput
        label="Profile Image"
        onChange={handleImageChange}
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-24 h-24 mt-2 rounded object-cover"
        />
      )}

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="secondary"
          block
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>

        <Button type="submit" block>
          {isEdit ? "Update Employee" : "Add Employee"}
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;
