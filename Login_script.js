document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('#topnav ul li a:not(#goBack)');
    const sections = document.querySelectorAll('.content-section');
    const sidenavElement = document.getElementById('sidenav');
    const accountBtnTopbar = document.getElementById('accountBtnTopbar');
    const topnav = document.getElementById('topnav');
    const topnavContents = document.querySelectorAll('#topnav > *:not(img.LOGO)');
    const logo = document.querySelector('#topnav img.LOGO');

    // Function to set active link in navigation
    function setActiveLink(link) {
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
    }

    // Function to set active section based on sectionId
    function setActiveSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            } 
        });
    }

    // Event listener for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
    sidenavElement.style.right = "-40%";

    // Toggle sidebar visibility on account button click
    accountBtnTopbar.onclick = function() {
        if (sidenavElement.style.right === "-40%") {
            openSidebar();
        } else {
            closeSidebar();
        }
    };

    // Function to open sidebar
    function openSidebar() {
        sidenavElement.style.right = "0";
        topnav.style.right = "44%"; // Adjust based on sidebar width
        topnavContents.forEach(content => {
            content.style.transform = "translateX(-4%)"; // Move topbar content along with sidebar
        });
        accountBtnTopbar.classList.add('hide-account-icon'); // Hide the account icon
    }

    // Function to close sidebar
    function closeSidebar() {
        sidenavElement.style.right = "-40%";
        topnav.style.right = "4%"; // Reset position of topnav
        topnavContents.forEach(content => {
            content.style.transform = "translateX(0)"; // Reset position of topbar content
        });
        accountBtnTopbar.classList.remove('hide-account-icon'); // Show the account icon
    }

    // Close sidebar when clicking outside of it
    document.addEventListener('click', function(e) {
        if (!sidenavElement.contains(e.target) && !accountBtnTopbar.contains(e.target)) {
            closeSidebar();
            accountBtnTopbar.classList.remove('hide-account-icon'); // Show the account icon
        }
    }); 

});