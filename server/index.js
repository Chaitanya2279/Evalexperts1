const express = require('express')
const cors = require('cors');
const axios = require('axios');
const app = express()
const bodyParser = require('body-parser');
const port = 3001
const getData = require("./db");
const Pool = require('pg').Pool
const bcrypt = require('bcrypt');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'evalexpertsDB',
    password: 'tiger',
    port: 5432, 
});
app.use(express.json())
// Specify the origin from which requests will be allowed
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all relevant methods
  allowedHeaders: ['Content-Type', 'Access-Control-Allow-Headers'] // Allow specific headers
};



app.use(cors(corsOptions));

app.use(bodyParser.json());

app.post('/api/change-password', async (req, res) => {
  const { username, defaultPassword, newPassword } = req.body;

  // Validate that all fields are provided
  if (!username || !defaultPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
      // Check if the user exists
      const instructor = await pool.query('SELECT * FROM instructor WHERE username = $1', [username]);
      
      if (instructor.rows.length > 0) {
          const user = instructor.rows[0];
          // Compare the provided default password with the stored hashed password
          const match = await bcrypt.compare(defaultPassword, user.password);

          if (match) {
              const hashedPassword = await bcrypt.hash(newPassword, 10);
              /// Update the user's password in the database and set is_first_login to true
              await pool.query('UPDATE instructor SET password = $1, is_first_login = $2 WHERE username = $3', [hashedPassword, true, username]);
              return res.json({ success: true, message: 'Password changed successfully.' });
          } else {
              return res.status(401).json({ success: false, message: 'Old password is incorrect.' });
          }
      } else {
          return res.status(404).json({ success: false, message: 'User not found.' });
      }
  } catch (error) {
      console.error('Error changing password:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// New API endpoint to update is_first_login
app.post('/api/update-first-login', async (req, res) => {
  const { username } = req.body;

  try {
      await pool.query('UPDATE instructor SET is_first_login = $1 WHERE username = $2', [true, username]);
      res.status(200).json({ success: true });
  } catch (error) {
      console.error('Error updating is_first_login:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


app.get('/term', (req, res) => {
  getData.getMerchants()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/course', (req, res) => {
  getData.getCourses()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/course/flagship', (req, res) => {
  getData.getFlagshipCourses()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/users', (req, res) => {
  getData.getUsers()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/peo', (req, res) => {
  getData.getPeo()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// PUT endpoint for updating PEO description or short_name
app.put('/update_peo', async (req, res) => {
  const { peo_id, field, value } = req.body;

  try {
    const updatedPeo = await getData.updatePeo(peo_id, { field, value });
    res.status(200).json(updatedPeo);
  } catch (error) {
    if (error.message.startsWith('PEO with ID')) {
      res.status(404).json({ error: error.message });
    } else {
      console.error('Error updating PEO:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.put('/update_slo', async (req, res) => {
  const { slo_id, field, value} = req.body;

  try {
    const updatedSlo = await getData.updateSlo(slo_id, { field, value });
    res.status(200).json(updatedSlo);
  } catch (error) {
    if (error.message.startsWith('SLO with ID')) {
      res.status(404).json({ error: error.message });
    } else {
      console.error('Error updating SLO:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.put('/update_peo_slo', async (req, res) => {
  const { slo_letter, peo_id } = req.body;

  try {
    const updatedPeoSlo = await getData.updatePeoSlo(slo_letter, { peo_id });
    res.status(200).json(updatedPeoSlo);
  } catch (error) {
    if (error.message.startsWith('SLO with ID')) {
      res.status(404).json({ error: error.message });
    } else {
      console.error('Error updating SLO:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.put('/update_qfe_map', async (req, res) => {
  const { qfe_id, peo_slo_id } = req.body;

  try {
    const updatedQfeMap = await getData.updateQfeMap(qfe_id, { peo_slo_id });
    res.status(200).json(updatedQfeMap);
  } catch (error) {
    if (error.message.startsWith('Qfe with ID')) {
      res.status(404).json({ error: error.message });
    } else {
      console.error('Error updating QFE:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.put('/update_clo_plo', async (req, res) => {
  const { clo_plo_id, slo_id_list_number } = req.body;

  try {
    const updatedCloPlo = await getData.updateCloPlo(clo_plo_id, slo_id_list_number);
    res.status(200).json(updatedCloPlo);
  } catch (error) {
    if (error.message.startsWith('CloPlo with ID')) {
      res.status(404).json({ error: error.message });
    } else {
      console.error('Error updating CloPlo:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.put('/update_assess_plan', async (req, res) => {
  const { assess_plan_id, value } = req.body;
  console.log(req.body);

  try {
    const updatedAssessPlan = await getData.updateAssessPlan(assess_plan_id, { value });
    res.status(200).json(updatedAssessPlan);
  } catch (error) {
    if (error.message.startsWith('Qfe with ID')) {
      res.status(404).json({ error: error.message });
    } else {
      console.error('Error updating QFE:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.post('/add_assess_plan', async (req, res) => {
  const { slo_id, course_id, value } = req.body;

  try {
    const newAssessPlan = await getData.addAssessPlan(slo_id, course_id, value);
    res.status(201).json(newAssessPlan);
  } catch (error) {
    console.error('Error adding assess plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/add_course', async (req, res) => {
  const { course_num, name, flag } = req.body;

  console.log(req.body);

  try {
    const newCourse = await getData.addCourse(course_num, name, flag);
    res.status(201).json(newCourse);
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/add_clo', async (req, res) => {
  const { course_id, clo_description, clo_name } = req.body;

  console.log(req.body);

  try {
    const newClo = await getData.addClo(course_id, clo_description, clo_name);
    res.status(201).json(newClo);
  } catch (error) {
    console.error('Error adding clo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/add_cloplo', async (req, res) => {
  const { clo_id, cloplo } = req.body;

  console.log(req.body);

  try {
    const newCloPlo = await getData.addCloPlo(clo_id, cloplo);
    res.status(201).json(newCloPlo);
  } catch (error) {
    console.error('Error adding cloplo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/delete_assess_plan', async (req, res) => {
  const { assess_plan_id } = req.body;

  try {
    const deletedAssessPlan = await getData.deleteAssessPlan(assess_plan_id);
    if (deletedAssessPlan) {
      res.status(200).json({ message: 'Assess plan deleted successfully' });
    } else {
      res.status(404).json({ error: 'Assess plan not found' });
    }
  } catch (error) {
    console.error('Error deleting assess plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.get('/slo', (req, res) => {
  getData.getSlo()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/qfe/slo', (req, res) => {
  getData.getQfe_Slo()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/peo_slo', (req, res) => {
  getData.getPeo_Slo()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/qfemap', (req, res) => {
  getData.getQfe()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/qfestrand', (req, res) => {
  getData.getQfeStrands()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/assess_plan', (req, res) => {
  getData.getAssessPlan()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/clo', (req, res) => {
  getData.getClo()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/cloplo', (req, res) => {
  getData.getCloPlo()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/clo/course', async (req, res) => {
  const { courseId } = req.body;
  try{
    const cloList = await getData.getCloByCourse(courseId);

    if(cloList) {
      console.log(cloList);
      res.status(200).json(cloList);
    } else{
      res.status(401).json({error: 'invalid course id'});
    }
  }
  catch(error) {
    console.error('error finding clo:', error);
    res.status(500).json({error: 'Internal server error'});
  }
})

app.post('/course/course_number', async (req, res) => {
  const { courseNumber } = req.body;
  try{
    const course = await getData.getCourseByCourseNumber(courseNumber);
    console.log(course);

    if(course) {
      res.status(200).json(course);
    } else{
      res.status(401).json({error: 'invalid course number'});
    }
  }
  catch(error) {
    console.error('error finding course:', error);
    res.status(500).json({error: 'Internal server error'});
  }
})

app.post('/class/add', async (req, res) => {
  const { termId, courseId, insId, className } = req.body;
  try{
    const course = await getData.addClass(termId, courseId, insId, className);
    console.log(course);

    if(course) {
      res.status(200).json(course);
    } else{
      res.status(401).json({error: 'invalid course number'});
    }
  }
  catch(error) {
    console.error('error finding course:', error);
    res.status(500).json({error: 'Internal server error'});
  }
})
app.post('/evaldata/add', async (req, res) => {
  const { 
    classId, 
    cloId, 
    course_assignment, 
    percent_below_60, 
    mean, 
    between_60_70, 
    between_70_80, 
    between_80_90, 
    between_90_100, 
    num_students 
  } = req.body;

  try {

    const course = await getData.addEval(
      classId, 
      cloId, 
      course_assignment, 
      percent_below_60, 
      mean, 
      between_60_70, 
      between_70_80, 
      between_80_90, 
      between_90_100, 
      num_students
    );

    if (course) {
      res.status(200).json(course);
    } else {
      res.status(401).json({ error: 'invalid course number' });
    }
  } catch (error) {
    console.error('error finding course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/car/add', async (req, res) => {
  const { classId, enrollment, withdrawal, classGPA, learningBarriers, modifications, notesActions, innovationJourney, course_result } = req.body;
  try{
    console.log(req.body);
    const course = await getData.addCar(classId, enrollment, withdrawal, classGPA, learningBarriers, modifications, notesActions, innovationJourney, course_result);

    if(course) {
      res.status(200).json(course);
    } else{
      res.status(401).json({error: 'invalid course number'});
    }
  }
  catch(error) {
    console.error('error finding course:', error);
    res.status(500).json({error: 'Internal server error'});
  }
})
// API endpoint to validate login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
      const result = await pool.query('SELECT * FROM instructor WHERE username = $1', [username]);
      if (result.rows.length > 0) {
          const user = result.rows[0];
          // Check if the user has changed their password
          if (!user.is_first_login) {
            return res.status(403).json({ error: 'Please change your default password first before logging in.' });
        }
          const match = await bcrypt.compare(password, user.password);
          if (match) {
            // Update is_first_login to true if it was false
            if (!user.is_first_login) {
              await pool.query('UPDATE instructor SET is_first_login = $1 WHERE username = $2', [true, username]);
            }
              res.status(200).json({
                  success: true,
                  ins_name: user.ins_name,
                  username: user.username,
                  is_admin: user.is_admin,
                  ins_id: user.ins_id,
              });
          } else {
              res.status(401).json({ error: 'Invalid username or password' });
          }
      } else {
          res.status(401).json({ error: 'Invalid username or password' });
      }
  } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/faculty/:username/courses', async (req, res) => {
  const username = req.params.username;
  const term = req.query.term;
  console.log(username);
  const apiKey = 'VRP8wRWPstP4H2XQSA18Qy7s088v5jYhMzOgs3Ka';
  try {
      const response = await axios.get(`http://api.rit.edu/v1/faculty/${username}/courses?term=${term}`, {
          headers: {
              'RITAuthorization': apiKey
          }
      });

      // const courses = response.data.reduce((acc, course) => {
      const courses = Object.values(response.data).reduce((acc, course) => {
        const courseSection = course.section;
        const sectionParts = courseSection.split('-');
        const courseCode = sectionParts.slice(0, 2).join('-');
        const fullCourseCode = `${courseCode}-${sectionParts.slice(2).join('-')}`;

          // Check if the course is already in the accumulator
          if (!acc.some(c => c.code === fullCourseCode)) {
              acc.push({ code: fullCourseCode, section: courseSection });
          }

          return acc;
      }, []);

      res.json(courses);
  } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
  }
});

// app.get('/', (req, res) => {
//     res.status(200).send('Hello World!');
// })

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})