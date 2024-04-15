import React, { useEffect, useState } from 'react';
import { messaging } from "./firebase"; // Make sure you import messaging correctly
import { getToken } from "firebase/messaging";
import axios from "axios";
import toast from 'react-hot-toast';

function Notification() {
    const [token, setToken] = useState(null);

    async function requestPermission() {
        try {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                const newToken = await getToken(messaging, { vapidKey: "BOiHJOdgnKQB3FdDSSuK5kY8yPw6lBhLYNpUxvUovc4Zv5eIwNFnir_V3g7WRyEN9baMRbR4Ll5BcPdQBYCt3Fo" });
                setToken(newToken);
                if (!localStorage.getItem("token")) {

                    await axios.post(SERVER_URL + '/user/add-notification-token', {
                        FCMToken: newToken,
                    }, {
                        headers: {
                            'x-access-token': localStorage.getItem("token")
                        }
                    });
                }
            } else if (permission === "denied") {
                toast.error("You have denied the permission");
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        }
    }

    useEffect(() => {
        requestPermission();
    }, []);

    console.log(token);

    return (
        <div>
            Token: {token}
        </div>
    );
}

export default Notification;
