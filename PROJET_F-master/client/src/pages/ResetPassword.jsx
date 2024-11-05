import { useState, useParam } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../App.css";

function ResetPassword() {
  const [formData, setFormData] = useState('');
  let { resetCode } = useParams();

  const onFormChange = (e) => {
    console.log( resetCode )
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password !== formData.passwordConfirm) return;
    axios
      .put("http://localhost:5000/reset-password/",
        {
          new_password: formData.password,
          password_reset_code: formData.resetCode
        }
        )
      .then((res) => {
        window.location.href = "/"
      });
  };

  return (
    <>
      <div className="text-left">
        <form onClick={handleSubmit}>
          <h1 class="text-center text-3xl mb-10">Reset password</h1>
          <div class="mb-3">
            <label>
              New password
              <input
                 className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Enter name"
                name="password"
                onChange={onFormChange}
              ></input>
            </label>
          </div>
          <div class="mb-3">
            <label>
              Confirm password
              <input
                 className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Enter name"
                name="passwordConfirm"
                onChange={onFormChange}
              ></input>
            </label>
          </div>
          <div>
          <button className="py-2 px-3 bg-blue-600 mt-3"  type="submit">
              Reset password
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
