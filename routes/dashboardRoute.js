const router = require('express').Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/dashboard',       authMiddleware, dashboardController.dashboardPage);
router.get("/finddestination", authMiddleware, dashboardController.renderFindDestination);
router.post("/finddestination", authMiddleware, dashboardController.findDestination);


router.get('/details/:packageId', authMiddleware ,  async (req, res) => 
{
    const packageId = req.params.packageId;
    const tourPackage = await dashboardController.fetchTourPackageById(packageId);
    res.render('dashboard/details', { tourPackage });
});

router.post('/details/:packageId', authMiddleware , async (req, res) => 
{
    const { packageId, numberOfPeople } = req.body;
    console.log("we are in the booking part abultabul");  
    console.log(req.body);
    console.log(packageId, numberOfPeople);
    res.json(bookingResult);
});

router.get("/mybookings",authMiddleware , dashboardController.bookTourPackage);


router.get("/PlaneBooking", authMiddleware, dashboardController.renderPlaneBookingPage);
router.get(
  "/TaxiBooking",
  authMiddleware,
  dashboardController.renderTaxiBookingPage
);
router.get("/contact", authMiddleware, dashboardController.rendercontact);
router.post("/contact/submit", dashboardController.submitContactForm);
router.get(
  "/dashboard/contactConfirmation",
  authMiddleware,
  dashboardController.rendercontactConfirmation
);
router.post("/orderTaxi", authMiddleware, dashboardController.findTaxi);
router.get("/orders", authMiddleware, dashboardController.renderOrders);
router.get("/about", authMiddleware, dashboardController.renderabout);

// router.post("/orderTaxi", authMiddleware, (req, res) => 
// {
//   const userId = req.user.id; 
// });
router.get("/userOrders", authMiddleware, dashboardController.renderUserOrders);







module.exports = router; 