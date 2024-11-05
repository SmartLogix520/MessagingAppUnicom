import { useState, useParam } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../App.css";

function ResetEmail() {
  const [formData, setFormData] = useState({
    email: ''
  });
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
    axios
      .put("http://localhost:5000/send-reset-email/",
        {
          email: formData.email,
        }
        )
      .then((res) => {
        window.location.href = "/"
      });
      window.location.href = "/reset-password"
  };

  return (
    <>
      <div className="text-left">
        <form  onClick={handleSubmit}>
          <h1 class="text-center text-3xl mb-10">Please enter reset email</h1>
          <div class="mb-3">
            <label>
              Reset Email
              <input
                 className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Enter name"
                name="email"
                onChange={onFormChange}
              ></input>
            </label>
          </div>
          <div>
          <button className="py-2 px-3 bg-blue-600 mt-3"  type="submit">
              Send reset email
            </button>
           
          </div>
        </form>
      </div>
    </>
  );
}

export default ResetEmail;
