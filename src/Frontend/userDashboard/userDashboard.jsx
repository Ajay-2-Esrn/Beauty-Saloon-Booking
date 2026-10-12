import './userDashboard.css';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function UserDashboard() {
    const [activeWindow, setActiveWindow] = useState("Booking")

    const navigate = useNavigate();
    const location = useLocation();

    // Data received from LoginPage
    const name = location.state?.loginName;
    const phone = location.state?.loginPhone;

    // Booking states
    const [service, setService] = useState("");
    const [date, setDate] = useState("");

    const [myBookings, setMyBookings] = useState([])

    function bookService(event) {

        event.preventDefault();
        axios.post('http://localhost:3000/regBookings', {
            name: name,
            phone: phone,
            service: service,
            date: date
        })
            .then((res) => {
                alert(
                    `Booking Successful!\n\n` +
                    `Name: ${name}\n` +
                    `Phone: ${phone}\n` +
                    `Service: ${service}\n` +
                    `Date: ${date}\n`
                );
            })
            .catch((error) => {
                console.log("Booking Failed", error)
                alert("Booking Failed", error)
            })

        // Clear booking form
        setService("");
        setDate("");
    }

    function myBookingList(phone) {
        axios.get('http://localhost:3000/myBookingList', {
            params: { phone: phone }
        })
            .then((res) => {
                console.log("My booked List Displayed")
                setMyBookings(res.data)
            })
            .catch((error) => {
                console.log("My Booked List Error", error)
            })
    }

    function removeMyBook(userId) {
        axios.put('http://localhost:3000/removeMyBook', {
            userId: userId
        })
            .then((res) => {
                alert("Booking Removed")
                setMyBookings((previousBookings) =>
                    previousBookings.filter(
                        (booking) => booking.id !== userId
                    )
                );
                console.log(res.data.message)
            })
            .catch((error) => {
                alert("Failed To Remove")
                console.log(error.data.message)
            })
    }
    function logout() {
        navigate("/");
    }

    return (

        <div className="user-dashboard">

            {/* Header */}

            <div className="dashboard-header">

                <div>
                    <h1>Welcome, {name} 👋</h1>
                    <p>Book your beauty salon appointment</p>
                </div>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>


            {/* User Details */}

            <div className="user-details">

                <h2>Your Details</h2>

                <p>
                    <strong>Name:</strong> {name}
                </p>

                <p>
                    <strong>Phone:</strong> {phone}
                </p>
                <button id='bookBtn' onClick={() => setActiveWindow("Booking")}>Booking Now</button>
                <button id='MyBookingBtn' onClick={() => {
                    setActiveWindow("myBookings")
                    myBookingList(phone)
                }}>My Bookings</button>

            </div>


            {/* Booking Section */}

            <div className="booking-container">
                {activeWindow == "Booking" ? (
                    <>
                        <h2>Book Salon Service 💇‍♀️</h2>

                        <p className="booking-description">
                            Select a service and choose your preferred date and time.
                        </p>


                        <form
                            className="booking-form"
                            onSubmit={bookService}
                        >

                            {/* Name */}

                            <div className="form-group">

                                <label>Name</label>

                                <input
                                    type="text"
                                    value={name || ""}
                                    readOnly
                                />

                            </div>


                            {/* Phone */}

                            <div className="form-group">

                                <label>Phone Number</label>

                                <input
                                    type="tel"
                                    value={phone || ""}
                                    readOnly
                                />

                            </div>


                            {/* Service */}

                            <div className="form-group">

                                <label>Salon Service</label>

                                <select
                                    value={service}
                                    onChange={(e) =>
                                        setService(e.target.value)
                                    }
                                    required
                                >

                                    <option value="">
                                        -- Select a Service --
                                    </option>

                                    <option value="Haircut & Styling">
                                        Haircut & Styling
                                    </option>

                                    <option value="Hair Coloring">
                                        Hair Coloring
                                    </option>

                                    <option value="Facial">
                                        Facial
                                    </option>

                                    <option value="Manicure">
                                        Manicure
                                    </option>

                                    <option value="Pedicure">
                                        Pedicure
                                    </option>

                                    <option value="Bridal Makeup">
                                        Bridal Makeup
                                    </option>

                                    <option value="Eyebrow Threading">
                                        Eyebrow Threading
                                    </option>

                                    <option value="Hair Spa">
                                        Hair Spa
                                    </option>

                                </select>

                            </div>


                            {/* Date */}

                            <div className="form-group">

                                <label>Booking Date</label>

                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) =>
                                        setDate(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            {/* Button */}

                            <button
                                type="submit"
                                className="book-btn"
                            >
                                Book Appointment
                            </button>

                        </form>
                    </>
                ) : (
                    <>
                        <h2>MY BOOKINGS</h2>
                        <table cellSpacing="20px" >
                            <tbody>
                                <tr>
                                    <th>NAME</th>
                                    <th>PHONE</th>
                                    <th>SERVICE</th>
                                    <th>BOOKED ON</th>
                                    <th>DATE OF BOOKING</th>
                                    <th>ACTION</th>
                                </tr>
                                {
                                    myBookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td>{booking.name}</td>
                                            <td>{booking.phone}</td>
                                            <td>{booking.service}</td>
                                            <td>{booking.booked_date}</td>
                                            <td>{booking.reg_date}</td>
                                            <td><button onClick={() => removeMyBook(booking.id)}>Cancel</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </>
                )}
            </div>

        </div >
    );
}

export default UserDashboard;