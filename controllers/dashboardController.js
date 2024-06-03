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
    const userId = req.userInfo.email; // Assuming user ID is stored in req.user
    console.log("hey it is in TaxiOrders");
    console.log(userId);
    try {
      const query = "SELECT * FROM taxis WHERE id = $1";
      const { rows: userTaxiOrders } = await pool.query(query, [userId]);
      res.render("userOrders", { taxiOrders: userTaxiOrders });
    } catch (error) {
      console.error("Error fetching user taxi orders:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  renderPlaneBookingPage = (req, res) => {
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

  renderOrders = async (req, res) => {
    const orderQuery = "select * from taxis";
    const id = req.userInfo.email;

    const { rows: taxiOrders } = await pool.query(orderQuery);

    res.render("dashboard/orders.ejs", {
      title: "Orders",
      taxiOrders: taxiOrders,
    });
  };

  renderFindDestination = async (req, res) => {
    try {
      const { userInfo } = req;

      // Perform the query and wait for the result
      const queryResult = await pool.query(
        "SELECT DISTINCT ON (tp.package_id) tp.*, r.rating FROM tour_packages tp JOIN ratings r ON tp.package_id = r.package_id ORDER BY tp.package_id, r.rating DESC"
      );

      // Ensure there are at least three packages
      const p1 = queryResult.rows[0];
      const p2 = queryResult.rows[1];
      const p3 = queryResult.rows[2];
      const p4 = queryResult.rows[3];
      const d1 = 2;
      const d2 = 3;
      const d3 = 3;

      console.log("differenvce");
      console.log(d1);

      // Render the page with the retrieved packages
      res.status(200).render("dashboard/destination.ejs", {
        title: "Find Destination",
        user: userInfo,

        p1,
        p2,
        p3,
        p4,
        d1,
        d2,
        d3,
      });
    } catch (error) {
      console.error("Error fetching tour packages:", error);
      res.status(500).send("Server error");
    }
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

  // findDestination = (req, res) => {
  //   const { location, date, endDate, number } = req.body;

  //   console.log(location, date, number);

  //   if (!date || !endDate)
  //     return res
  //       .status(400)
  //       .json({ error: "Both date and endDate are required" });

  //   const query = {
  //     text: `SELECT tp.package_id, tp.location, tp.tour_date, tp.max_capacity, tp.package_name, tp.description, tp.image_url, tp.map_url , pr.price, pr.currency
  //           FROM tour_packages tp
  //           INNER JOIN pricing pr ON tp.package_id = pr.package_id
  //           WHERE tp.location ILIKE $1 AND tp.tour_date = $2 AND tp.max_capacity >= $3;`,
  //     values: [`%${location}%`, date, number],
  //   };

  //   pool.query(query, (error, result) => {
  //     if (error) {
  //       console.error("Error executing SQL query:", error);
  //       return res.status(500).json({ error: "Internal server error" });
  //     }

  //     let tourPackages = result.rows;

  //     if (tourPackages.length === 0) {
  //       return res.status(404).json({
  //         message: "No tour packages found for the specified criteria",
  //       });
  //     }

  //     res.render("dashboard/destinationSearchResults.ejs", { tourPackages });
  //   });
  // };

  findDestination = (req, res) => {
    const { location, date, endDate, number } = req.body;
    console.log(req.body);

    const query = {
      text: `SELECT tp.package_id, tp.location, tp.tour_date, tp.max_capacity, tp.package_name, tp.description, tp.image_url,  pr.price, pr.currency
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

      const tourPackages = result.rows;

      if (tourPackages.length === 0) {
        return res.status(404).json({
          message: "No tourist packages found for the specified criteria",
        });
      }
      // Format tour_date for each package
      tourPackages.forEach((pkg) => {
        pkg.formatted_tour_date = new Date(pkg.tour_date).toLocaleString(
          "en-US",
          {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }
        );
      });

      console.log(endDate);

      res.render("dashboard/destinationSearchResults.ejs", {
        location,
        date,
        endDate,
        number,
        tourPackages,
      });
    });
  };

  findDestination2 = (req, res) => {
    const { id, location, date,  number } = req.query;

    let orderByClause = "";

    if (id === "low") {
      orderByClause = "ORDER BY pr.price ASC";
    } else if (id === "high") {
      orderByClause = "ORDER BY pr.price DESC";
    }

    const query = {
      text: `
        SELECT tp.package_id, tp.location, tp.tour_date, tp.max_capacity, tp.package_name, tp.description, tp.image_url, pr.price, pr.currency
        FROM tour_packages tp
        JOIN pricing pr ON tp.package_id = pr.package_id
        WHERE tp.location ILIKE $1 AND tp.tour_date = $2   AND tp.max_capacity >= $3
        ${orderByClause};`,
      values: [`%${location}%`, date,  number],
    };

    pool.query(query, (error, result) => {
      if (error) {
        console.error("Error executing SQL query:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      const tourPackages = result.rows;

      if (tourPackages.length === 0) {
        return res.status(404).json({
          message: "No tourist packages found for the specified criteria",
        });
      }

      res.render("dashboard/destinationSearchResults.ejs", {
        location,
        date,
        number,
        tourPackages
      });

      // Redirect to the same route without any query parameters
    });
  };

  fetchTourPackageById = async (packageId) => {
    try {
      const query = 
      `
            SELECT tp.package_id, tp.location, tp.tour_date, tp.max_capacity, tp.package_name, 
                   tp.description, tp.image_url, pr.price, pr.currency
            FROM tour_packages tp
            INNER JOIN pricing pr ON tp.package_id = pr.package_id
            WHERE tp.package_id = $1
        `;
      const { rows } = await pool.query(query, [parseInt(packageId, 10)]);
      return rows[0];
    } catch (error) {
      console.error("Error executing query", error);
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

      const ratingQuery = `SELECT * FROM ratings WHERE user_id = $1`;

      res.render("mybookings.ejs", { bookings: rows });
    } catch (error) {
      console.error("Error fetching data!", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing your request" });
    }
  };

  async submitContactForm(req, res) {
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

  async findTaxi(req, res) {
    try {
      const { name, number, pickupLocation, dropoffLocation, message } =
        req.body;

      const query = {
        text: "INSERT INTO taxis (name, number, pickup_location, dropoff_location, message) VALUES ($1, $2, $3, $4, $5)",
        values: [name, number, pickupLocation, dropoffLocation, message],
      };

      await pool.query(query);

      return "Taxi ordered successfully";
    } catch (error) {
      // Handle any errors
      console.error("Error ordering taxi:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async rateBooking(req, res) {
    const { booking_id, package_id } = req.body;
    const rating = req.body.rating;
    const userMail = req.userInfo.email; // Assuming you have user info from auth middleware
    console.log(req.body);

    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Invalid rating value" });
    }

    try {
      // Check if the user has already rated this booking
      const existingRating = await pool.query(
        "SELECT * FROM Ratings WHERE user_id = $1 AND package_id = $2 and booking_id = $3",
        [userMail, package_id, booking_id]
      );

      if (existingRating.rows.length > 0) {
        return res
          .status(400)
          .json({ error: "You have already rated this booking" });
      }

      // Insert the new rating into the database
      await pool.query(
        "INSERT INTO Ratings (user_id, package_id , rating) VALUES ($1, $2, $3)",
        [userMail, package_id, rating]
      );

      await pool.query(
        "Update bookings set ratings = $1 where package_id = $2 and user_mail = $3 ",
        [rating, package_id, userMail]
      );

      //res.json({ message: "Rating submitted successfully" });
    } catch (error) {
      console.error("Error rating booking:", error);
      res
        .status(500)
        .json({ error: "An error occurred while submitting your rating" });
    }
  }

  // router.get("

  /// done by Dipto 2 june

  renderevents = (req, res) => {
    res.render("dashboard/events.ejs", { title: "Events" });
  };

  rendertoursAttractions = (req, res) => {
    res.render("dashboard/toursAttractions.ejs", {
      title: "Tours & Attractions",
    });
  };

  rendersearchAirTicket = (req, res) => {
    res.render("dashboard/searchAirTicket.ejs", { title: "Search Air Ticket" });
  };

  renderAttractions = async (req, res) => {
    const { country } = req.query;
    console.log("country:", country);

    try {
      const countryName = "England"; // or any other country name
      const query = `
            SELECT attractions.name, attractions.description, attractions.image_url, countries.name AS country_name
            FROM attractions
            JOIN countries ON attractions.country_id = countries.id
            WHERE countries.name = $1;`
            ;

      const attractions = await pool.query(query, [countryName]);

      res.json(attractions.rows);
    } catch (err) {
      console.error("Error fetching attractions:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  getPlaneSearch = async (req, res) => {
    const { location, departureDate, returnDate } = req.query;

    const packages = [
      {
        plane_name: "Boeing 747",
        price: 500,
        guest_number: 4,
        departure_date: "2024-06-01",
        return_date: "2024-06-15",
        location: "Dubai",
        img: "https://scontent.fdac24-1.fna.fbcdn.net/v/t1.15752-9/445805112_1243111426673038_5937597644237062239_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bGRDjorcOoIQ7kNvgFpO6-A&_nc_ht=scontent.fdac24-1.fna&oh=03_Q7cD1QG4YNMhr4jcAoFtoR70zIYh8IKPkbWkU2DF4moUOky8eg&oe=66840F90",
      },
      {
        plane_name: "Airbus A320",
        price: 300,
        guest_number: 2,
        departure_date: "2024-07-01",
        return_date: "2024-07-10",
        location: "England",
        img: "https://scontent.xx.fbcdn.net/v/t1.15752-9/445569611_339370472526068_8955437528749322953_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=4qvlllpQxq4Q7kNvgEAT1TZ&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QFZHb7_z7qgyc4IOTjhTkePl88oQlP1xd-JRpncOhTPsw&oe=66840AED",
      },
    ];

    // Filter packages based on search criteria
    const filteredPackages = packages.filter(
      (pkg) =>
        pkg.location.toLowerCase() === location.toLowerCase() &&
        pkg.departure_date === departureDate &&
        pkg.return_date === returnDate
    );

    res.json(filteredPackages);
  };

  

    // Filter events based on search criteria
    
  events = [
    {
      event_name: "Music Festival",
      price: 50,
      start_date: "2024-06-01",
      end_date: "2024-06-15",
      start_time: "09:00",
      place: "Dubai",
      image:
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjBmZXN0aXZhbHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      event_name: "Art Exhibition",
      price: 30,
      start_date: "2024-07-01",
      end_date: "2024-07-10",
      start_time: "10:00",
      place: "England",
      image:
        "https://www.re-thinkingthefuture.com/architectural-community/a8291-what-is-the-purpose-and-importance-of-an-art-exhibition/attachment/image-2_exhibitions-open-to-people_https-tlmagazine-com/",
    },
    {
      event_name: "Tech Conference",
      price: 100,
      start_date: "2024-08-05",
      end_date: "2024-08-07",
      start_time: "11:00",
      place: "New York",
      image:
        "https://a.storyblok.com/f/188325/1920x1280/41e681c422/alexandre-pellaes-6vajp0pscx0-unsplash-1-1.jpg",
    },
    {
      event_name: "Food Carnival",
      price: 20,
      start_date: "2024-09-10",
      end_date: "2024-09-12",
      start_time: "12:00",
      place: "Paris",
      image:
        "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/10/2/YW1503_mini-corn-dogs_s4x3.jpg.rend.hgtvcom.616.462.suffix/1570025736809.jpeg",
    },

    {
      event_name: "Food Carnival",
      price: 100,
      start_date: "2024-06-01",
      end_date: "2024-06-15",
      start_time: "11:00",
      place: "Dubai",
      image:
        "https://cook.fnr.sndimg.com/content/dam/images/cook/fullset/2011/9/9/0/CCKEL211_Fried-Pickles-with-Buttermilk-Dressing-2_s4x3.jpg.rend.hgtvcom.441.331.suffix/1392789364659.jpeg",
    },
  ];

  getEventSearch = async (req, res) => {
    const { query } = req.query;

    const filteredEvents = this.events.filter(
      (event) =>
        event.event_name.toLowerCase().includes(query.toLowerCase()) ||
        event.place.toLowerCase().includes(query.toLowerCase())
    );

    res.json(filteredEvents);
  };

  getFilter = async (req, res) => {
    const { query, startDate, endDate } = req.query;

    console.log("form=> ", startDate, endDate);
    this.events.map((event) =>
      console.log("mapped=>", event.start_date, event.end_date)
    );

    //  NEED TO CHANGE THIS FILTER CONDITION
    const filteredEvents = this.events.filter(
      (event) =>
        event.event_name.toLowerCase().includes(query.toLowerCase()) ||
        event.place.toLowerCase().includes(query.toLowerCase()) ||
        (event.start_date >= startDate && event.end_date <= endDate)
    );
    // Just this logic

    res.json(filteredEvents);
  };


  async searchAirTickets(req, res) {
    const { location, departureDate, returnDate } = req.query;

    try {
      const query = `
        SELECT * FROM air_tickets
        WHERE location ILIKE $1
        AND departure_date = $2
        AND return_date = $3
      `;
      const values = [`%${location}%`, departureDate, returnDate];
      const { rows } = await pool.query(query, values);

      res.json(rows);
    } catch (error) {
      console.error("Error fetching air tickets:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async findAttractions(req,res){
    const { country } = req.body;
    console.log(country);

    try 
    {
      const query = 
     `
      SELECT *
      FROM tours_attractions
      where location =  $1;
    `;


      const result = await pool.query(query, [country]);

      res.render("dashboard/toursAttractions", {  attractions: result.rows });
      console.log(result.rows);
    } catch (error) {
      console.error("Error fetching attractions:", error);
      res.status(500).send("Internal Server Error");
    }
  }


  
}


module.exports = new DashboardController();
