**Centralized Blood Bank Management System**

**Description**

The Centralized Blood Bank Management System is designed to streamline the entire process of blood donation—from donor registration to storage and distribution—through an integrated and digital platform.

This system bridges the gap between blood donors, recipients, and registered blood banks by providing real-time data on:

-   Blood availability
-   Blood requests
-   Nearby registered blood banks

It incorporates key functionalities such as:

-   Blood bank registrations
-   Account management
-   Donor and recipient tracking
-   Blood inventory management

**Installation Instructions**

To run the system on your local machine, follow the steps below:

**A. Prerequisites**

-   **Visual Studio Code** and its recommended extensions installed
-   **MySQL Workbench** installed
-   **Node.js** installed and environment variables configured

**B. Database Setup**

1.  Import the deekshadb1.sql file into MySQL Workbench.
2.  Use the command line to copy or import the database with your MySQL password.
3.  Ensure the MySQL service is running correctly.

**C. Backend Setup**

1.  Open **Command Prompt** and check if Node.js is installed using node -v.
2.  Open **Visual Studio Code**, install Node.js-related extensions.
3.  Open the backend folder of your project.
4.  Run the server using the command:

nginx

CopyEdit

node server.js

**Usage**

1.  **Registration & Login:**
    -   Blood banks and donors register on the portal.
    -   After registration, they can log in and access their profiles.
2.  **Profile Management:**
    -   Blood banks can update their details and manage the blood directory from their dashboard.
    -   Donors can update their donation status and personal details.
3.  **Public Features (Users):**
    -   Users can search for nearby blood banks and check blood availability.
    -   Users can also view donor information for specific blood types.
    -   Users can request blood directly from blood banks or donors. The system sends an email request through the portal.

**Technologies Used**

-   **Frontend:** HTML, CSS, JavaScript
-   **Backend:** Node.js, Express
-   **Database:** MySQL( database:deekshadb1;
user: root;
password: AaBbCcflyhigh123)

**Contributors**

-   **Mentor:** Dr. Roopesh Kumar
-   **Coordinators:** Dr. Deepak Kumar, Dr. Neelam Sharma
-   **Team Members:**
    -   Kritika Bhandari
    -   Deeksha Tiwari
    -   Diksha Rawat
