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
router.get("/finddestination",  dashboardController.renderFindDestination);
router.post("/finddestination", dashboardController.findDestination);
router.get('/PlaneBooking', authMiddleware, renderPlaneBookingPage);
router.get('/TaxiBooking', authMiddleware, renderTaxiBookingPage);
router.get('/contact', authMiddleware, rendercontact);
router.post('/contact/submit', authMiddleware , dashboardController.submitContactForm);
router.get('/dashboard/contactConfirmation', authMiddleware, dashboardController.rendercontactConfirmation);
router.post("/orderTaxi", authMiddleware, dashboardController.findTaxi);
router.get('/orders', authMiddleware, dashboardController.renderOrders);
router.get('/about', authMiddleware, dashboardController.renderabout);
router.get('/mybookings', authMiddleware, dashboardController.bookTourPackage);
router.get('/userOrders', authMiddleware, renderUserOrders);


//eta dipto theke nisi
//->router.get("/toursAttractions", authMiddleware, rendertoursAttractions);


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

    var rating1 = 0 ; // Replace with your logic to fetch the actual rating

    rating1 = await pool.query(
      "SELECT COALESCE(AVG(rating), 0) FROM ratings WHERE package_id =  $1",
      [packageId]
    );
    //console.log(rating.rows[0].coalesce);
    
    let rating = parseFloat(rating1.rows[0].coalesce).toFixed(1);
    console.log(rating);
    res.render("dashboard/details", { tourPackage, rating });
  } catch (error) {
    console.error("Error fetching tour package:", error);
    res.status(500).send("Server error");
  }
});


router.post("/details/:packageId", authMiddleware, async (req, res) => 
{
  try 
  {
    const { numberOfPeople } = req.body;
    const packageId = req.params.packageId;
    const user_mail = req.userInfo.email; // Correctly access user's email
    //const {booking_Id} = req.body;
    console.log(numberOfPeople, packageId, user_mail);

    // Ensure the number of columns matches the number of values
    await pool.query(
      "INSERT INTO Bookings (user_mail, package_id, numberofpeople, booking_date) VALUES ($1, $2, $3, $4)",
      [user_mail, packageId, numberOfPeople, new Date()]
    );

    res.render("dashboard/bookingCompletion");
  } 
  catch (error) 
  {
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


router.post("/mybookings", authMiddleware , dashboardController.rateBooking);

//router.post("/PlaneBooking" , authMiddleware , dashboardController.findPlane);

//router.get("/TaxiBooking", authMiddleware, dashboardController.renderTaxiBookingPage);


router.get(
  "/dashboard/planeSearch",
  authMiddleware,
  dashboardController.getPlaneSearch
);
router.get(
  "/dashboard/eventSearch",
  authMiddleware,
  dashboardController.getEventSearch
);


  //router.get('/attractions', authMiddleware, dashboardController.renderAttractions);
  //router.get('/toursAttractions', authMiddleware, dashboardController.rendertoursAttractions);
  router.get("/events", authMiddleware, dashboardController.renderevents);


  router.get(
    "/searchAirTickets",
    authMiddleware,
    dashboardController.searchAirTickets
  );

  
  router.get("/toursAttractions", async (req, res) => {
    

    var attractions;
    try {
       result = await pool.query("SELECT * FROM tours_attractions");
      //console.log(attractions);
      res.render("dashboard/toursAttractions", { attractions: result.rows });
    } catch (error) {
      console.error("Error fetching attractions:", error);
      res.status(500).send("Internal Server Error");
    }
  });



  router.get(
    "/destination/person",
    dashboardController.findDestination2
  );

  router.post("/attractions", authMiddleware, dashboardController.findAttractions);

  router.get("/events" , authMiddleware, dashboardController.renderevents);

// router.get("/blog/:id", (req, res) => {
  
//   const attraction =  req.params.id ;

//     console.log(attraction);

//     pool.query("SELECT * FROM tours_attractions WHERE attraction_id = $1", [attraction], (error, result) => {
//       if (error) {
//         throw error;
//       }
//       res.render("dashboard/blog", { attraction: result.rows[0] });
//     });
//   res.render("dashboard/blog", { attraction: attraction });
// });

router.get("/blog/:id", (req, res) => {
  const attraction = req.params.id;

  console.log(attraction);

  pool.query(
    "SELECT * FROM tours_attractions WHERE attraction_id = $1",
    [attraction],
    (error, result) => {
      if (error) {
        console.error("Error fetching attraction:", error);
        return res.status(500).send("Internal Server Error");
      }

      if (result.rows.length > 0) {
        res.render("dashboard/blog", { attraction: result.rows[0] });
      } else {
        res.status(404).send("Attraction not found");
      }
    }
  );
});



module.exports = router;