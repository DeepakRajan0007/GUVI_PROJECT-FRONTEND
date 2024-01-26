import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import "../css/home.css";

const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();

    const hasBirthdayOccurred =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!hasBirthdayOccurred) {
        age--;
    }

    return age;
};

function Home() {
    const location = useLocation();
    const [userDetails, setUserDetails] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedGender, setUpdatedGender] = useState("");
    const [updatedDob, setUpdatedDob] = useState("");
    const [updatedEmail, setUpdatedEmail] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${location.state.email}`);
                setUserDetails(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, [location.state.email]);

    const handleUpdateFields = async () => {
        try {
            
            await axios.put(`${process.env.BACKEND_URL}/user/${location.state.email}`, {
                name: updatedName,
                gender: updatedGender,
                dob: updatedDob,
                email: updatedEmail,
            });

            
            const response = await axios.get(`${process.env.BACKEND_URL}/user/${location.state.email}`);
            setUserDetails(response.data);

            
            setUpdatedName("");
            setUpdatedGender("");
            setUpdatedDob("");
            setUpdatedEmail("");
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating user details:", error);
        }
    };

    return (
        <div className="Profile">
            <h1>Profile Page</h1>
            {userDetails && <h2 className="name">Hi {userDetails.Name} welcome</h2>}
            <h1 className="heading">Your Details are::</h1>
            {userDetails && <h3 className="gender">Gender: {userDetails.gender}</h3>}
            {userDetails && <h3 className="email">Email: {userDetails.email}</h3>}
            {userDetails && (
                <h3 className="dob">Date of Birth: {new Date(userDetails.Dob).toLocaleDateString()}</h3>
            )}
            {userDetails && <h3 className="age">Age: {calculateAge(userDetails.Dob)}</h3>}

            {isEditing ? (
                <div>
                    <input
                        type="text"
                        placeholder="New Name"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="New Gender"
                        value={updatedGender}
                        onChange={(e) => setUpdatedGender(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="New Date of Birth (YYYY-MM-DD)"
                        value={updatedDob}
                        onChange={(e) => setUpdatedDob(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="New Email"
                        value={updatedEmail}
                        onChange={(e) => setUpdatedEmail(e.target.value)}
                    />
                    <button onClick={handleUpdateFields}>Confirm</button>
                </div>
            ) : (
                <button onClick={() => setIsEditing(true)}>Update Fields</button>
            )}

            <Link to="/" className="logoutbutton">
                <button className="logout">Logout</button>
            </Link>
        </div>
    );
}

export default Home;
