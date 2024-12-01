import React, { useState } from 'react';

function FormValidation() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fname) newErrors.fname = 'First name is required';
    if (!formData.lname) newErrors.lname = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.cpassword)
      newErrors.cpassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            value={formData.fname}
            onChange={handleChange}
          />
          {errors.fname && <span style={{ color: 'red' }}>{errors.fname}</span>}
        </div>

        <div>
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            value={formData.lname}
            onChange={handleChange}
          />
          {errors.lname && <span style={{ color: 'red' }}>{errors.lname}</span>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
        </div>

        <div>
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            id="cpassword"
            value={formData.cpassword}
            onChange={handleChange}
          />
          {errors.cpassword && <span style={{ color: 'red' }}>{errors.cpassword}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default FormValidation;
