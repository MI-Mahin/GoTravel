const pool = require("../config/db");

class DashboardController {
  dashboardPage = async (req, res) => {
    const { userInfo } = req;
    const queryText = "SELECT * FROM users WHERE email = $1";
    const {
      rows: [users],
    } = await pool.query(queryText, [userInfo.email]);
    // Render dashboard with user information retrieved from session or JWT token
    res.status(200).render("dashboard/index.ejs", {
      title: "Dashboard",
      user: userInfo,
      userName: users,
    });
  };

  async renderUserOrders(req, res) {
    const userId = req.user.id; // Assuming user ID is stored in req.user
    try {
      const query = "SELECT * FROM taxis WHERE user_id = $1";
      const { rows: userTaxiOrders } = await pool.query(query, [userId]);
      res.render("userOrders", { taxiOrders: userTaxiOrders });
    } catch (error) {
      console.error("Error fetching user taxi orders:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  renderPlaneBookingPage = (req, res) =>
  {
    res.render("dashboard/PlaneBooking.ejs", { title: "Plane Booking" });
  };

  renderTaxiBookingPage = (req, res) => {

    res.render("dashboard/TaxiBooking.ejs", { title: "Taxi Booking" });
  };

  rendercontact = (req, res) => {
    res.render("dashboard/contact.ejs", { title: "Contact" });
  };

  renderdetails = (req, res) => {
    res.render("dashboard/details.ejs", { title: "Details" });
  };

  rendercontactConfirmation = (req, res) => {
    res.render("dashboard/contactConfirmation.ejs", {
      title: "Contact Confirmation",
    });
  };

  renderabout = (req, res) => {
    res.render("dashboard/about.ejs", { title: "About" });
  };
  
  renderOrders = async (req, res) => 
  {
      const orderQuery = "select * from taxis where user_id = $1";
      const id = req.userInfo.email;

      const { rows: taxiOrders } = await pool.query(orderQuery , [id]);

      res.render("dashboard/orders.ejs", {
        title: "Orders",
        taxiOrders: taxiOrders,
      });
  };
  

  renderFindDestination = (req, res) => {
    const { userInfo } = req;

    res.status(200).render("dashboard/destination.ejs", {
      title: "Find Destination",
      user: userInfo,
    });
  };

  renderFilter = (req, res) => {
    const { popular, priceRange } = req.query;

    let query = "SELECT * FROM tour_packages WHERE 1 = 1";

    // if (rating) {
    //   query += ' AND rating = true';
    // }
    if (popular) {
      query += " AND popular = true";
    }
    if (priceRange === "low_to_high") {
      query += " ORDER BY price ASC";
    } else if (priceRange === "high_to_low") {
      query += " ORDER BY price DESC";
    }

    pool.query(query, (error, result) => {
      if (error) {
        console.error("Error executing SQL query:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      const filteredData = result.rows;

      if (req.headers.accept.includes("text/html")) {
        res.render("destinationSearchResults", { tourPackages: filteredData });
      } else {
        res.status(200).json({ data: filteredData });
      }
    });
  };

  findDestination = (req, res) => 
  {
    const { userInfo } = req;
    const { location, date, endDate, number } = req.body;
    const email = userInfo.email;

    console.log(location, date, number);

    if (!date || !endDate)
      return res
        .status(400)
        .json({ error: "Both date and endDate are required" });

    const query = {
      text: `SELECT tp.package_id, tp.location, tp.tour_date, tp.max_capacity, tp.package_name, tp.description, tp.image_url, tp.duration_days, pr.price, pr.currency
            FROM tour_packages tp
            INNER JOIN pricing pr ON tp.package_id = pr.package_id
            WHERE tp.location ILIKE $1 AND tp.tour_date = $2 AND tp.max_capacity >= $3;`,
      values: [`%${location}%`, date, number],
    };

    pool.query(query, (error, result) => {
      if (error) {
        console.error("Error executing SQL query:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      let tourPackages = result.rows;

      if (tourPackages.length === 0) {
        return res.status(404).json({
          message: "No tour packages found for the specified criteria",
        });
      }

      res.render("dashboard/destinationSearchResults.ejs", { tourPackages });
    });
  };

  fetchTourPackageById = async (packageId) => {
    try {
        const query = `
            SELECT tp.package_id, tp.location, tp.tour_date, tp.max_capacity, tp.package_name, 
                   tp.description, tp.image_url, tp.duration_days, pr.price, pr.currency
            FROM tour_packages tp
            INNER JOIN pricing pr ON tp.package_id = pr.package_id
            WHERE tp.package_id = $1
        `;
        const { rows } = await pool.query(query, [parseInt(packageId, 10)]);
        return rows[0];
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
};

  bookTourPackage = async (req, res) => {
    const { email } = req.userInfo;
    console.log(email);
    try {
      const sql = ` SELECT * from bookings b JOIN tour_packages tp  on b.package_id = tp.package_id
      WHERE  b.user_mail = $1 `;

      const { rows } = await pool.query(sql, [email]);

      res.render("mybookings.ejs", { bookings: rows });
    } catch (error) {
      console.error("Error fetching data!", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing your request" });
    }
  };

  async submitContactForm(req, res) 
  {
    try {
      
      const { fname, lname, email, message } = req.body;

      
      res.render("dashboard/contactConfirmation.ejs", {
        message: "Form submitted successfully!",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      res.render("contactConfirmation", {
        message: "An error occurred. Please try again later.",
      });
    }
  }

   findTaxi = async(req, res) =>
  {
    try 
    {
      console.log(req.body);
      const { name, number, pickupLocation, dropoffLocation, message } = req.body;
      const user_id = req.userInfo.email;

      console.log(name , number , pickupLocation , dropoffLocation , message );
      
      console.log(user_id);
      
      const query = 
      {
        text: "INSERT INTO taxis (name, number, pickup_location, dropoff_location, message , user_id) VALUES ($1, $2, $3, $4, $5 , $6)",
        values: [name, number, pickupLocation, dropoffLocation, message , user_id],
      };

      await pool.query(query);

      return "Taxi ordered successfully";
    } 
    catch (error) 
    {
      console.error("Error ordering taxi:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}


module.exports = new DashboardController();
