document.addEventListener('DOMContentLoaded', async function () {
    const topnavLinks = document.querySelectorAll('#topnav ul li a:not(#goBack)');
    const bottomnavLinks = document.querySelectorAll('#bottomnav ul li a:not(#goBack)');
    const sections = document.querySelectorAll('.content-section');
    const sidenavElement = document.getElementById('sidenav');
    const accountBtnTopbar = document.getElementById('accountBtnTopbar');
    const topnav = document.getElementById('topnav');
    const topnavContents = document.querySelectorAll('#topnav > *:not(img.LOGO)');
    const profileBtn = document.getElementById('profile');
    const settingBtn = document.getElementById('setting');
    const logoutBtn = document.getElementById('logout');
    const BackBtn = document.getElementById('Back');
    const profileContent = document.getElementById('ProfileContent');
    const editBtn = document.getElementById("EditBtn");
    const imgEdit = document.getElementById("ImgEdit");
    const saveBtn = document.getElementById("Save");
    const cancelBtn = document.getElementById("Cancel");
    const profileImg = document.getElementById("ProfileImg");
    const nameDisplay = document.getElementById("namedisplay");
    const emailDiv = document.getElementById("email");

    const userID = localStorage.getItem('userID');
    let originalUsername = nameDisplay.innerText;
    let originalEmail = emailDiv.innerText;

    // Redirect to index.html if userID is not found in localStorage
    if (!userID) {
        window.location.href = 'index.html';
        return; // Stop further execution
    }

       
    // Add event listener to logout link
    document.getElementById('logout').addEventListener('click', function() {
        // Remove the userID from localStorage
        localStorage.removeItem('userID');

        // Redirect to index.html
        window.location.href = 'index.html';
    });


    // Function to set active link in navigation
    function setActiveLink(link) {
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
    }
    


    // Event listener for navigation links
    topnavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const activeSection = document.querySelector('.content-section.active');
            const targetSection = document.getElementById(link.getAttribute('data-section'));

            if (activeSection !== targetSection) {
                const isMovingLeft = Array.from(sections).indexOf(targetSection) < Array.from(sections).indexOf(activeSection);

                activeSection.classList.add(isMovingLeft ? 'right-out' : 'left-out');
                targetSection.classList.add(isMovingLeft ? 'left-in' : 'right-in');

                setTimeout(() => {
                    activeSection.classList.remove('active', 'right-out', 'left-out');
                    targetSection.classList.add('active');
                    targetSection.classList.remove('right-in', 'left-in');
                }, 500);

                setActiveLink(link);
            }
        });
    });

    bottomnavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const activeSection = document.querySelector('.content-section.active');
            const targetSection = document.getElementById(link.getAttribute('data-section'));

            if (activeSection !== targetSection) {
                const isMovingLeft = Array.from(sections).indexOf(targetSection) < Array.from(sections).indexOf(activeSection);

                activeSection.classList.add(isMovingLeft ? 'right-out' : 'left-out');
                targetSection.classList.add(isMovingLeft ? 'left-in' : 'right-in');

                setTimeout(() => {
                    activeSection.classList.remove('active', 'right-out', 'left-out');
                    targetSection.classList.add('active');
                    targetSection.classList.remove('right-in', 'left-in');
                }, 500);

                setActiveLink(link);
            }
        });
    });

    // Initial positioning of the sidebar
    sidenavElement.style.right = "-500%";

    // Toggle sidebar visibility on account button click
    accountBtnTopbar.onclick = function () {
        if (sidenavElement.style.right === "-500%") {
            openSidebar();
        } else {
            closeSidebar();
        }
    };

    // Hide or show multiple elements
    function toggleElements(show, elements) {
        elements.forEach(element => {
            element.style.display = show ? "inline-block" : "none";
        });
    }

    // Initially hide all edit-related buttons
    toggleElements(false, [imgEdit, saveBtn, cancelBtn]);

    // Function to open sidebar
    function openSidebar() {
        sidenavElement.style.minWidth = "20%";
        sidenavElement.style.right = "0";
        topnav.style.right = "44%"; // Adjust based on sidebar width
        topnavContents.forEach(content => {
            content.style.transform = "translateX(-4%)"; // Move topbar content along with sidebar
        });
        accountBtnTopbar.classList.add('hide-account-icon'); // Hide the account icon
        profileContent.classList.add('hide-account-icon');
        profileBtn.classList.remove('hide-account-icon');
        settingBtn.classList.remove('hide-account-icon');
        logoutBtn.classList.remove('hide-account-icon');
    }

    // Function to close sidebar
    function closeSidebar() {
        sidenavElement.style.right = "-500%";
        topnav.style.right = "4%"; // Reset position of topnav
        topnavContents.forEach(content => {
            content.style.transform = "translateX(0)"; // Reset position of topbar content
        });
        accountBtnTopbar.classList.remove('hide-account-icon'); // Show the account icon
        profileBtn.classList.remove('hide-account-icon');
        settingBtn.classList.remove('hide-account-icon');
        logoutBtn.classList.remove('hide-account-icon');
    }

    // Close sidebar when clicking outside of it
    document.addEventListener('click', function (e) {
        if (!sidenavElement.contains(e.target) && !accountBtnTopbar.contains(e.target)) {
            closeSidebar();
            accountBtnTopbar.classList.remove('hide-account-icon'); // Show the account icon
            profileBtn.classList.remove('hide-account-icon');
            settingBtn.classList.remove('hide-account-icon');
            logoutBtn.classList.remove('hide-account-icon');
        }
    });

    document.getElementById("profile").addEventListener("click", function () {
        sidenavElement.style.minWidth = "30%";
        profileBtn.classList.add('hide-account-icon');
        settingBtn.classList.add('hide-account-icon');
        logoutBtn.classList.add('hide-account-icon');
        profileContent.classList.remove('hide-account-icon');
        BackBtn.onclick = function () {
            openSidebar();
        };
        // Event listener for Edit button
        editBtn.addEventListener("click", () => {
            toggleElements(true, [imgEdit, saveBtn, cancelBtn]);
            toggleElements(false, [editBtn, BackBtn]);
        });

        // Event listener for Save and Cancel buttons
        [saveBtn, cancelBtn].forEach(button => {
            button.addEventListener("click", () => {
                toggleElements(false, [imgEdit, saveBtn, cancelBtn]);
                toggleElements(true, [editBtn, BackBtn]);
            });
        });
    });

    // Ensure sidebar is hidden on page load or refresh
    document.addEventListener("DOMContentLoaded", function () {
        closeSidebar(); // Ensures the sidebar is hidden on page load
    });


    // Variables to store original values
    let isEditing = false; // Flag to track if editing is in progress
    let intervalId; // Variable to hold the interval ID

    // Function to handle the periodic update
    async function startPopulatingData() {
        try {
            await populateData(); // Initial data population
            setInterval(async () => {
                if (!isEditing) { // Check if editing is not in progress
                    await populateData();
                }
            }, 1000);
        } catch (error) {
            console.error('Error during initialization:', error);
        }
    }

    // Function to stop populating data
    function stopPopulatingData() {
        clearInterval(intervalId); // Clear the interval
        intervalId = null;
    }

    // Call the function to start populating data
    startPopulatingData();

    // Function to toggle editing mode
    function toggleEditingMode(isEditing) {
        const isVisible = isEditing ? "inline-block" : "none";
        const isHidden = isEditing ? "none" : "inline-block";

        // Show or hide edit elements
        imgEdit.style.display = isVisible;
        saveBtn.style.display = isVisible;
        cancelBtn.style.display = isVisible;

        // Hide or show default buttons
        editBtn.style.display = isHidden;

        if (isEditing) {
            // Convert username and email to editable input fields
            nameDisplay.innerHTML = `<input type="text" id="nameInput" value="${originalUsername}" />`;
            emailDiv.innerHTML = `<input type="email" id="emailInput" value="${originalEmail}" />`;
        } else {
            // Restore original view (if cancelled)
            nameDisplay.innerHTML = originalUsername;
            emailDiv.innerHTML = originalEmail;
        }
    }

    // Event listener for Edit button
    editBtn.addEventListener("click", () => {
        toggleEditingMode(true);
        isEditing = true; // Set flag to true when editing starts
        stopPopulatingData(); // Stop data updates
    });

    // Event listener for Cancel button
    cancelBtn.addEventListener("click", () => {
        toggleEditingMode(false);
        isEditing = false; // Reset flag when editing ends
        if (!intervalId) startPopulatingData(); // Resume data updates
    });

    // Event listener for Save button
    saveBtn.addEventListener("click", async () => {
        const nameInput = document.getElementById("nameInput");
        const emailInput = document.getElementById("emailInput");

        const updatedUsername = nameInput.value.trim();
        const updatedEmail = emailInput.value.trim();

        isEditing = false; // Reset flag when editing ends
        if (!intervalId) startPopulatingData(); // Resume data updates

        // Validate inputs
        if (!updatedUsername || !updatedEmail) {
            alert("Username and email cannot be empty!");
            return;
        }

        // Prepare the base64 image string (if any)
        const updatedProfileImg = profileImg.src.includes("data:image") ? profileImg.src.split(',')[1] : null; // Extract base64 part of the data URL

        // Handle API request for saving changes
        try {
            const response = await fetch("http://localhost:8081/updateUserData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID: localStorage.getItem("userID"),
                    username: updatedUsername,
                    email: updatedEmail,
                    profileImg: updatedProfileImg, // Send the base64 string
                }),
            });

            if (!response.ok) throw new Error("Failed to update user data");

            const result = await response.json();

            // Update original values and exit editing mode
            originalUsername = updatedUsername;
            originalEmail = updatedEmail;
            toggleEditingMode(false);

            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error saving profile:", error);
            alert("Failed to save changes. Please try again.");
        }
    });



    // Event listener for image edit
    imgEdit.addEventListener("click", () => {
        // Create a file input element
        const fileInput = document.createElement("input");
        fileInput.type = "file";  // Set the type to file
        fileInput.accept = "image/*";  // Only allow image files

        // Set up the onchange event to handle the file selection
        fileInput.onchange = (event) => {
            const file = event.target.files[0];  // Get the selected file
            if (file) {
                // Create a FileReader to read the selected file
                const reader = new FileReader();

                // On file load, update the profile image with the new file's data URL
                reader.onload = (e) => {
                    // Update the profile image source to display the selected image
                    profileImg.src = e.target.result;  // Set the image preview source
                };

                // Read the file as a data URL (Base64-encoded string)
                reader.readAsDataURL(file);
            }
        };

        // Trigger the file input click event to open the file selection dialog
        fileInput.click();
    });

    // Populate data on the page
    async function populateData() {
        // Retrieve userID and stationID from localStorage
        const userID = localStorage.getItem('userID');
        const stationID = localStorage.getItem('stationID');

        // Check if both userID and stationID are missing
        if (!userID && !stationID) {
            console.error('Missing userID or stationID in localStorage');
            return;
        }

        // Initialize data object to hold the response data
        let data = {};

        // If stationID is provided, fetch station data
        if (stationID) {
            try {
                const response = await fetch(`http://IEVS.com/requestData?stationID=${stationID}`);
                if (!response.ok) throw new Error('Failed to fetch station data from the API');

                // Parse JSON response
                const stationData = await response.json();
                data.station = stationData; // Store station data

                const longitude = stationData.location.longitude || 'N/A';
                const latitude = stationData.location.latitude || 'N/A';
                const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15`;

                // Extract and populate station-related information
                document.getElementById('PayCash').innerText = stationData.cost + ' $';
                document.getElementById('Duration').innerText = stationData.chargeTime;
                document.getElementById('Locate').innerHTML = `<b id="Locate"><a href="${googleMapsUrl}" target="_blank">View on Google Maps</a></b>`;
                document.getElementById('chargeStatus').innerText = stationData.chargeProcess;
            } catch (error) {
                console.error('Error fetching or populating station data:', error);
            }
        }

        // If userID is provided, fetch user data
        if (userID) {
            try {
                const response = await fetch(`http://IEVS.com/requestData?userID=${userID}`);
                if (!response.ok) throw new Error('Failed to fetch user data from the API');

                const userData = await response.json();
                data.user = userData;

                document.getElementById('namedisplay').innerText = data.user.username;
                document.getElementById('email').innerText = data.user.email;
                originalUsername = data.user.username;
                originalEmail = data.user.email;

                // Set profile image
                const profileImg = document.getElementById('ProfileImg');
                originalImage = data.user.profileImg;
                profileImg.src = data.user.profileImg || 'Image/Profileless.jpg'; // Use fallback if profileimg is null or undefined
                profileImg.onerror = () => {
                    profileImg.src = 'Image/Profileless.jpg'; // Fallback image on error
                };

                document.getElementById('Amount').innerText = data.user.wallet + ' $';
            } catch (error) {
                console.error('Error fetching or populating user data:', error);
            }
        }


        // If neither userID nor stationID was found, populate default values
        if (!stationID) {
            document.getElementById('PayCash').innerText = '0 $';
            document.getElementById('Duration').innerText = '0 Hour 0 Minute';
            // document.getElementById('Locate').innerHTML = 'None';
            document.getElementById('chargeStatus').innerText = 'No connection';
        }

    }

    let lastSize = 0;
    let lastData = [];
    
    async function Historical_Data() {
        // Retrieve userID from localStorage
        const userID = localStorage.getItem('userID');
    
        if (!userID) {
            console.error('Missing userID in localStorage');
            return;
        }
    
        try {
            // Request data from the API to get the user's dates
            const response = await fetch(`http://IEVS.com/recordeData?userID=${userID}`);
            if (!response.ok) throw new Error('Failed to fetch user data from the API');
    
            // Parse the JSON response
            const User_Record_Data = await response.json();
    
            // Initialize data object to hold the response data
            let data = {};
            data.date = User_Record_Data;
    
            // Get the dates array from the data
            const dates = data.date.dates;
    
            if (dates && Array.isArray(dates)) {
                const CurrentSize = dates.length;
    
                // Check if the size of the dates array has changed or if the data is different
                if (CurrentSize !== lastSize || !arraysEqual(dates, lastData)) {
                    lastSize = CurrentSize;
                    lastData = [...dates];  // Save the current dates array
    
                    // Clear the previous records
                    const dailyRecordContainer = document.getElementById('daily-record');
                    dailyRecordContainer.innerHTML = '';
    
                    // Loop through each date and fetch the corresponding data
                    for (let i = 0; i < dates.length; i++) {
                        const currentDate = dates[i];
                        const Dateresponse = await fetch(`http://IEVS.com/recordeData?userID=${userID}&date=${currentDate}`);
                        if (!Dateresponse.ok) throw new Error(`Failed to fetch data for date ${currentDate}`);
    
                        const Record_value = await Dateresponse.json();
                        let value = {};
                        value.data = Record_value;
    
                        const Power = value.data.value;
                        const Cost = value.data.cost;
                        const longitude = value.data.location.longitude || 'N/A';
                        const latitude = value.data.location.latitude || 'N/A';
                        const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15`;

                        const dateObj = new Date(currentDate);

                        // Define the month names array
                        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                        // Extract day, month, and year
                        const day = String(dateObj.getDate()).padStart(2, '0'); // Ensures the day is always 2 digits
                        const month = monthNames[dateObj.getMonth()]; // Get the month name
                        const year = dateObj.getFullYear(); // Get the year

                        // Format the date as 'DD MMM YYYY'
                        const formattedDate = `${day} ${month} ${year}`;
    
                        // Create a new daily record element
                        const dailyRecord = document.createElement('div');
                        dailyRecord.id = 'daily';
    
                        // Add the image (Google logo)
                        const img = document.createElement('img');
                        img.src = 'Image/map_Logo.png';
                        img.alt = 'map';
                        img.id = 'location-img';
                        dailyRecord.appendChild(img);
    
                        // Add the record details
                        const recordDetail = document.createElement('div');
                        recordDetail.id = 'record-detail';
    
                        // Date
                        const dateRecord = document.createElement('a');
                        dateRecord.id = 'date-record';
                        dateRecord.textContent = formattedDate;
                        recordDetail.appendChild(dateRecord);
    
                        // Google Maps link
                        const addressLink = document.createElement('a');
                        addressLink.id = 'address';
                        addressLink.href = googleMapsUrl;
                        addressLink.textContent = 'View on Google Maps';
                        recordDetail.appendChild(addressLink);
    
                        // Power
                        const powerRecord = document.createElement('a');
                        powerRecord.id = 'power-record';
                        powerRecord.textContent = `${Power} KWh`;
                        recordDetail.appendChild(powerRecord);
    
                        // Cost
                        const priceRecord = document.createElement('a');
                        priceRecord.id = 'price-record';
                        priceRecord.textContent = `$${Cost}`;
                        recordDetail.appendChild(priceRecord);
    
                        // Append the record details to the daily record
                        dailyRecord.appendChild(recordDetail);
    
                        // Append the daily record to the parent container
                        const dailyRecordContainer = document.getElementById('daily-record');
                        dailyRecordContainer.appendChild(dailyRecord);
                        
                    }
                }
            } else {
                console.error('No valid dates found in the response');
            }
    
        } catch (error) {
            console.error('Error fetching or populating user data:', error);
        }
    }
    
    // Helper function to compare two arrays (used for detecting changes in the dates array)
    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }
    
    Historical_Data();
    // Call the function at an interval
    setInterval(Historical_Data, 1000);

    let lastNotificationSize = 0;
    let lastNotificationData = [];
    
    async function Notification_Data() {
        // Retrieve userID from localStorage
        const userID = localStorage.getItem('userID');
    
        if (!userID) {
            console.error('Missing userID in localStorage');
            return;
        }
    
        try {
            // Request data from the API to get the user's notifications
            const response = await fetch(`http://IEVS.com/getnotifications?userID=${userID}`);
            if (!response.ok) throw new Error('Failed to fetch user data from the API');
    
            // Parse the JSON response (assumes the response is directly an array of notifications)
            const notifications = await response.json();
    
            // Check if notifications exist
            if (notifications.length === 0) {
                console.log('No notifications found');
                return;
            }
    
            // Check if the size of notifications array has changed or if the data is different
            const currentNotificationSize = notifications.length;
            if (currentNotificationSize !== lastNotificationSize || !arraysEqual(notifications, lastNotificationData)) {
                lastNotificationSize = currentNotificationSize;
                lastNotificationData = [...notifications];  // Save the current notifications array
    
                // Clear the previous notifications
                const NotificationContainer = document.getElementById('message-Content');
                NotificationContainer.innerHTML = '';  // Clear previous content
    
                // Loop through the notifications and handle/display them
                notifications.forEach(notification => {
                    const { ID, Date: notificationDate, Message } = notification; // Renaming Date to notificationDate
                    const formattedDate = new Date(notificationDate).toLocaleString(); // Format the date properly
                    console.log('ID', ID);
                    console.log('Formatted Date:', formattedDate);
                    console.log('Message:', Message);
    
                    const NotificastionDate = document.createElement('a');
                    NotificastionDate.id = 'message-date';
                    NotificastionDate.textContent = formattedDate;
    
                    // Create a new daily record element
                    const MessageBox = document.createElement('div');
                    MessageBox.id = 'message-Block';
    
                    // Message
                    const NotificationMessage = document.createElement('a');
                    NotificationMessage.id = 'message';
                    NotificationMessage.textContent = Message;
                    MessageBox.appendChild(NotificationMessage);
    
                    const DeleteNotification = document.createElement('a');
                    DeleteNotification.id = 'delet-message';
    
                    const DeleteIcon = document.createElement('i');
                    DeleteIcon.classList = 'fas fa-trash';
                    DeleteNotification.appendChild(DeleteIcon);
    
                    MessageBox.appendChild(DeleteNotification);
    
                    // Append the daily record to the parent container
                    NotificationContainer.appendChild(NotificastionDate);
                    NotificationContainer.appendChild(MessageBox);
    
                    // Add an event listener to the delete icon
                    DeleteNotification.addEventListener('click', async () => {
                        try {
                            // Send DELETE request to the server to remove the notification
                            const response = await fetch(`http://IEVS.com/deletenotification?userID=${userID}&ID=${ID}`, {
                                method: 'DELETE',
                            });
    
                            // Parse and handle the response
                            const result = await response.json();
                            if (response.ok && result.message === 'Notification deleted successfully') {
                                console.log(`Notification Deleted - ID: ${ID}`);
                                // Remove the notification from the UI
                                NotificationContainer.removeChild(NotificastionDate);
                                NotificationContainer.removeChild(MessageBox);
                            } else {
                                console.error('Error: ', result.message || 'Failed to delete notification');
                            }
                        } catch (error) {
                            console.error('Error deleting notification: ', error);
                        }
                    });
                });
            }
    
        } catch (error) {
            console.error('Error fetching or populating user data:', error);
        }
    }
    
    
    // Helper function to compare two arrays (used for detecting changes in the notifications array)
    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i].Date !== arr2[i].Date || arr1[i].Message !== arr2[i].Message) return false;
        }
        return true;
    }
    
    // Initial call to populate notifications
    Notification_Data();
    
    // Call the function at an interval to refresh notifications every 5 seconds (5000 milliseconds)
    setInterval(Notification_Data, 1000);

});
