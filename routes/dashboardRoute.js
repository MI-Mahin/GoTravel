const express = require('express');
const app = express();
const router = require('express').Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');
const { renderPlaneBookingPage } = require('../controllers/dashboardController');
const { renderTaxiBookingPage } = require('../controllers/dashboardController');
const { rendercontact } = require('../controllers/dashboardController');
const { rendercontactConfirmation } = require('../controllers/dashboardController');
const { renderUserOrders } = require('../controllers/dashboardController');
const { renderabout } = require('../controllers/dashboardController');
const pool = require("../config/db");


router.get('/dashboard', authMiddleware, dashboardController.dashboardPage);
router.get("/finddestination", authMiddleware, dashboardController.renderFindDestination);
router.post("/finddestination", authMiddleware, dashboardController.findDestination);
router.get('/PlaneBooking', authMiddleware, renderPlaneBookingPage);
router.get('/TaxiBooking', authMiddleware, renderTaxiBookingPage);
router.get('/contact', authMiddleware, rendercontact);
router.post('/contact/submit', authMiddleware , dashboardController.submitContactForm);
router.get('/dashboard/contactConfirmation', authMiddleware, dashboardController.rendercontactConfirmation);
router.post('/orderTaxi', authMiddleware , dashboardController.findTaxi);
router.get('/orders', authMiddleware, dashboardController.renderOrders);
router.get('/about', authMiddleware, dashboardController.renderabout);
router.get('/mybookings', authMiddleware, dashboardController.bookTourPackage);
app.get('/userOrders', authMiddleware, renderUserOrders);


router.get("/details/:packageId", async (req, res) => {
  const packageId = req.params.packageId;
  if (isNaN(packageId)) {
    return res.status(400).send("Invalid package ID");
  }

  try {
    const tourPackage = await dashboardController.fetchTourPackageById(
      packageId
    );
    if (!tourPackage) {
      return res.status(404).send("Tour package not found");
    }

    const rating = 2; // Replace with your logic to fetch the actual rating
    res.render("dashboard/details", { tourPackage, rating });
  } catch (error) {
    console.error("Error fetching tour package:", error);
    res.status(500).send("Server error");
  }
});


router.post("/details/:packageId", authMiddleware, async (req, res) => {
  try {
    const { numberOfPeople } = req.body;
    const packageId = req.params.packageId;
    const user_mail = req.userInfo.email; // Correctly access user's email

    console.log(numberOfPeople, packageId, user_mail);

    // Ensure the number of columns matches the number of values
    await pool.query(
      "INSERT INTO Bookings (user_mail, package_id, numberofpeople, booking_date) VALUES ($1, $2, $3, $4)",
      [user_mail, packageId, numberOfPeople, new Date()]
    );

    res.render("dashboard/bookingCompletion");
  } catch (error) {
    console.error("Error booking tour package:", error);
    res
      .status(500)
      .json({ error: "An error occurred while booking the tour package." });
  }
});




router.get(
  "/filter",
  authMiddleware,
  dashboardController.renderFilter
);

module.exports = router;