import './adminDashboard.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {

    const navigate = useNavigate();

    const [allBookings, setAllBookings] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/allBookedList")
            .then((res) => setAllBookings(res.data))
            .catch((error)=>{
                console.log("All booking list error",error)
            })
    }, []);

    function logout() {
        navigate("/");
    }

    return (

        <div className="admin-dashboard">

            {/* Header */}

            <header className="admin-header">

                <div className="admin-title">

                    <div className="admin-icon">
                        ✂️
                    </div>

                    <div>
                        <h1>Beauty Salon</h1>
                        <p>Admin Dashboard</p>
                    </div>

                </div>

                <button
                    className="admin-logout"
                    onClick={logout}
                >
                    Logout
                </button>

            </header>


            {/* Main Content */}

            <main className="admin-content">

                <div className="booking-heading">

                    <div>
                        <h2>All Bookings</h2>
                        <p>
                            View all salon appointments
                        </p>
                    </div>

                    <div className="booking-count">
                        <span>{allBookings.length}</span>
                        <small>Total Bookings</small>
                    </div>

                </div>


                {/* Booking Table */}

                <div className="booking-table-container">

                    {allBookings.length === 0 ? (

                        <div className="no-bookings">
                            <div className="empty-icon">
                                📅
                            </div>

                            <h3>No Bookings Found</h3>

                            <p>
                                There are currently no salon appointments.
                            </p>
                        </div>

                    ) : (

                        <table className="admin-booking-table">

                            <thead>

                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Service</th>
                                    <th>Booked On</th>
                                    <th>Booking Date</th>
                                </tr>

                            </thead>

                            <tbody>

                                {allBookings.map((booking, index) => (

                                    <tr key={booking.id}>

                                        <td>
                                            {index + 1}
                                        </td>

                                        <td>
                                            <strong>
                                                {booking.name}
                                            </strong>
                                        </td>

                                        <td>
                                            {booking.phone}
                                        </td>

                                        <td>
                                            <span className="service-badge">
                                                {booking.service}
                                            </span>
                                        </td>

                                        <td>
                                            {booking.booked_date}
                                        </td>

                                        <td>
                                            {booking.reg_date}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    )}

                </div>

            </main>

        </div>
    );
}

export default AdminDashboard;