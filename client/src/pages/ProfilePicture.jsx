import { useState, React, useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import welcome from "../email-welcome.svg"

function ProfilePicture() {
    const { userId } = useParams();
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [image, setImage] = useState();

    const onImageChange = async (e) => {
        e.preventDefault()
        setImage(e.target.files[0]);
        const fd = new FormData();
        fd.append("image", e.target.files[0]);
        await axios
            .post("http://localhost:5000/upload/",
                fd,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
            .then((res) => {
                setImage(res.data.image)
                console.log(image)
            });
    };


    if (!formData) return <p>Chargement en cours</p>

    return (
        <>
            <div class="flex justify-left h-screen text-left bg-white">
                <div class="w-1/2 basis ">
                    <form class="bg-white rounded px-8 pb-8 mb-4 mx-auto pt-10">
                        <h1 class="my-2 text-2xl font-bold text-blue-500">Profile picture</h1>
                        <img src="" className="rounded-xl" width="400" height={400} />
                        <label>
                            Profile picture
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                type="file" name="pp" onChange={onImageChange} ></input>
                     
                        <button
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Update profile picture
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
}

export default ProfilePicture;
