document.addEventListener('DOMContentLoaded', function () {
    // Check if the user is signed in
    fetch('/profile')
        .then(response => {
            // If the response is not OK (e.g., 401 Unauthorized), redirect to the home page
            if (!response.ok) {
                window.location.href = '/';
                throw new Error("User not signed in");
            }
            return response.json();
        })
        .then(data => {

            console.log("User signed in:", data.user);

            return fetch("/user-courses");
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("Courses:", data);

            const recommendations = document.getElementById("courses");
            // Display the courses
            const courses = data.courses;
            const card = document.createElement("article");

            if (courses.length === 0) {
                card.innerHTML = "No courses found.";
                recommendations.appendChild(card);
            }

            for (let i = 0; i < courses.length; i++) {
                card.innerHTML = `
                    <div class="course-header">
                        <h3 class="course-title">${courses[i].course_code}</h3>
                        <p class="course-description">${courses[i].full_title}</p>
                    </div>
                    <div class="course-tail">
                        <div class="course-meta">
                            <span class="rating">confidence ${(courses[i].confidence * 100).toFixed(4)} </span>
                            <span class="duration">Institution ${courses[i].institution}</span>
                        </div>
                        <a class="button" href="#" aria-label="Start JavaScript Fundamentals course">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Start Course
                        </a>
                    </div>
                `;
                card.classList.add("course-card");

                recommendations.appendChild(card.cloneNode(true));
            }

        })

        .catch(error => {
            // In case of any error, also redirect to the home page
            console.error("Error:", error);
            window.location.href = '/';
        });

    // go to home page
    document.getElementById("homeBtn").addEventListener("click", function () {
        window.location.href = '/';
    });

    // logout
    document.getElementById("logoutBtn").addEventListener("click", function () {
        fetch('/logout')
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                window.location.href = '/';
            })
            .catch(error => {
                console.error("Logout error:", error);
                // Even if logout fails, redirect to home
                window.location.href = '/';
            });
    });

});

