document.addEventListener("DOMContentLoaded", function () {
    // Get the button element
    const checkUserBtn = document.getElementById("checkUserBtn");

    // Add a click event listener to the button
    checkUserBtn.addEventListener("click", function () {
        // Call the /profile endpoint to check if the user is signed in
        fetch("/profile")
            .then(response => {
                if (response.ok) {
                    console.log(response);

                    // If the response is OK, user is signed in; go to the dashboard
                    window.location.href = "/dashboard";
                } else {
                    console.log(response);

                    window.location.href = "/register";
                }
            })
            .catch(error => {
                console.error("Error checking login status:", error);
                // In case of error, assume not signed in and redirect to sign in page
                window.location.href = "/register";
            });
    });
});