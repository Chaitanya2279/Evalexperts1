const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'evalexpertsDB',
    password: 'tiger',
    port: 5432,
});

//get all data from our database
const getTerms = async () => {
    try {
      return await new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM term", (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        });
      });
    } catch (error_1) {
      console.error(error_1);
      throw new Error("Internal server error");
    };
  };

const getCourses = async () => {
  try{
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * from course where discontinued = 'N'", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve (results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1){
    console.error(error_1);
    throw new Error("Internal server error");
  };
};

const getFlagshipCourses = async () => {
  try{
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * from course where isflagship = 'Y'", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve (results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1){
    console.error(error_1);
    throw new Error("Internal server error");
  };
};

const getUsers = async () => {
  try{
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * from instructor", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve (results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1){
    console.error(error_1);
    throw new Error("Internal server error");
  };
};

const getPeo = async () => {
  try{
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * from peo ORDER BY peo_id", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve (results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1){
    console.error(error_1);
    throw new Error("Internal server error");
  };
};

const getQfe_Slo = async () => {
  try{
    return await new Promise(function (resolve, reject) {
      pool.query("select ps.peo_slo_id, s.slo_letter, ps.peo_id from peo_slo ps JOIN slo s ON ps.slo_id = s.slo_id ORDER BY ps.peo_id, ps.slo_id", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve (results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1){
    console.error(error_1);
    throw new Error("Internal server error");
  };
};



const getSlo = async () => {
  try{
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * from slo ORDER BY slo_letter", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve (results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1){
    console.error(error_1);
    throw new Error("Internal server error");
  };
};

const getPeo_Slo = async () => {
  try{
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT ps.peo_slo_id, s.slo_letter, ps.peo_id from peo_slo ps JOIN slo s ON ps.slo_id = s.slo_id", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve (results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1){
    console.error(error_1);
    throw new Error("Internal server error");
  };
};

const getQfe = async () => {
  try{
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * from qfe_map order by qfe_id", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve (results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1){
    console.error(error_1);
    throw new Error("Internal server error");
  };
};

const getQfeStrands = async () => {
  try{
    return await new Promise(function  (resolve, reject) {
      pool.query("select DISTINCT strand_number, short_name from qfe_map ORDER BY strand_number", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve (results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1){
    console.error(error_1);
    throw new Error("Internal server error");
  };
}

const getAssessPlan = async () => {
  try{
    return await new Promise(function (resolve, reject) {
      pool.query("select ap.assess_plan_id, s.slo_id, s.slo_letter, ap.course_id, ap.assess_letter from assess_plan ap JOIN slo s ON s.slo_id = ap.slo_id", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve (results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1){
    console.error(error_1);
    throw new Error("Internal server error");
  };
};

const getClo = async () => {
  try{
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * from clo", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve (results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1){
    console.error(error_1);
    throw new Error("Internal server error");
  };
};


const getCloByCourse = async (course_id) => {
  try {

    const query = {
      text: `
        SELECT * from clo where course_id = $1
      `,
      values: [course_id]
    };

    const result = await pool.query(query);

    if (result.rows.length > 0) {
      return result.rows; // Return the updated SLO object
    } else {
      throw new Error(`clo not found`);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to find clo");
  }
};


const getCourseByCourseNumber = async (course_number) => {
  try {

    const query = {
      text: `
        SELECT * from course where course_number = $1
      `,
      values: [course_number]
    };

    const result = await pool.query(query);

    if (result.rows.length > 0) {
      return result.rows; // Return the updated SLO object
    } else {
      throw new Error(`course not found`);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to find course");
  }
};

const getCloPlo = async () => {
  try{
    return await new Promise(function (resolve, reject) {
      pool.query("select cp.clo_plo_id, c.course_id, c.clo_id, c.clo_description, cp.slo_id_list FROM clo_plo cp JOIN clo c ON c.clo_id = cp.clo_id ORDER BY cp.clo_plo_id", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve (results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1){
    console.error(error_1);
    throw new Error("Internal server error");
  };
};

const updatePeo = async (peoId, updateFields) => {
  try {
    const { field, value } = updateFields;

    if (field === "peo_name") {
      const query = {
        text: `
          UPDATE peo
          SET peo_name = $1
          WHERE peo_id = $2
          RETURNING *
      `,
      values: [value, peoId]
      };

      const result = await pool.query(query);

      if (result.rows.length > 0) {
        return result.rows[0]; // Return the updated PEO object
      } else {
        throw new Error(`PEO with ID ${peoId} not found`);
      }
    }

    else if(field === "peo_description") {
      const query = {
        text: `
          UPDATE peo
          SET peo_description = $1
          WHERE peo_id = $2
          RETURNING *
        `,
        values: [value, peoId]
      };

      const result = await pool.query(query);

      if (result.rows.length > 0) {
        return result.rows[0]; // Return the updated PEO object
      } else {
        throw new Error(`PEO with ID ${peoId} not found`);
      }
    }

  } catch (error) {
    console.error(error);
    throw new Error("Failed to update PEO");
  }
};

const updateSlo = async (sloId, updateFields) => {
  try {
    const { field, value } = updateFields;

    if (field === "slo_name") {
      const query = {
        text: `
          UPDATE slo
          SET slo_name = $1
          WHERE slo_id = $2
          RETURNING *
        `,
        values: [value, sloId]
      };

      const result = await pool.query(query);
      if (result.rows.length > 0) {
        return result.rows[0]; // Return the updated SLO object
      } else {
        throw new Error(`SLO with ID ${sloId} not found`);
      }
    }

    else if(field === "slo_description") {
      const query = {
        text: `
          UPDATE slo
          SET slo_description = $1
          WHERE slo_id = $2
          RETURNING *
        `,
        values: [value, sloId]
      };

      const result = await pool.query(query);
      if (result.rows.length > 0) {
        return result.rows[0]; // Return the updated SLO object
      } else {
        throw new Error(`SLO with ID ${sloId} not found`);
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update SLO");
  }
};

const updatePeoSlo = async (slo_letter, updateFields) => {
  try {
    const { peo_id } = updateFields;

    const query = {
      text: `
        UPDATE peo_slo
        SET peo_id = $1
        WHERE slo_id = (select slo_id from slo WHERE slo_letter = $2)
        RETURNING *
      `,
      values: [peo_id, slo_letter]
    };

    const result = await pool.query(query);

    if (result.rows.length > 0) {
      return result.rows[0]; // Return the updated SLO object
    } else {
      throw new Error(`SLO with ID ${peosloId} not found`);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update SLO");
  }
};


const updateQfeMap = async (qfe_id, updateFields) => {
  try {
    const { peo_slo_id } = updateFields;

    const query = {
      text: `
        UPDATE qfe_map
        SET peo_slo_id = $1
        WHERE qfe_id = $2
        RETURNING *
      `,
      values: [peo_slo_id, qfe_id]
    };

    const result = await pool.query(query);

    if (result.rows.length > 0) {
      return result.rows[0]; // Return the updated SLO object
    } else {
      throw new Error(`qfemap with ID ${qfe_id} not found`);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update qfemap");
  }
};


const updateAssessPlan = async (assess_plan_id, updateFields) => {
  try {
    const { value } = updateFields;

    const query = {
      text: `
        UPDATE assess_plan
        SET assess_letter = $1
        WHERE assess_plan_id = $2
        RETURNING *
      `,
      values: [value, assess_plan_id]
    };

    const result = await pool.query(query);

    if (result.rows.length > 0) {
      return result.rows[0]; // Return the updated SLO object
    } else {
      throw new Error(`assess plan with ID ${assess_plan_id} not found`);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update assess plan");
  }
};


const updateCloPlo = async (clo_plo_id, slo_id_list) => {
  try {

    const query = {
      text: `
        UPDATE clo_plo
        SET slo_id_list = $1
        WHERE clo_plo_id = $2
        RETURNING *
      `,
      values: [slo_id_list, clo_plo_id]
    };

    const result = await pool.query(query);

    if (result.rows.length > 0) {
      return result.rows[0]; // Return the updated SLO object
    } else {
      throw new Error(`assess plan with ID ${clo_plo_id} not found`);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update clo plo");
  }
};


const deleteAssessPlan = async (assess_plan_id) => {
  try {

    const query = {
      text: `
        DELETE FROM assess_plan
        WHERE assess_plan_id = $1
        RETURNING *
      `,
      values: [assess_plan_id]
    };

    const result = await pool.query(query);

    if (result.rows.length > 0) {
      return result.rows[0]; // Return the updated SLO object
    } else {
      throw new Error(`assess plan with ID ${assess_plan_id} not found`);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete assess plan");
  }
};


const addAssessPlan = async (slo_id, course_id, assess_letter) => {
  try {

    const query = {
      text: `
        INSERT INTO assess_plan(slo_id, course_id, assess_letter)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      values: [slo_id, course_id, assess_letter]
    };

    const result = await pool.query(query);

    if (result.rows.length > 0) {
      return result.rows[0]; // Return the updated SLO object
    } else {
      throw new Error(`assess plan could not be added`);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add assess plan");
  }
};

const addCourse = async (course_num, course_name, isflagship) => {
  try {

    const query = {
      text: `
        INSERT INTO course(course_number, course_name, isflagship, discontinued)
        VALUES ($1, $2, $3, 'N')
        RETURNING *
      `,
      values: [course_num, course_name, isflagship]
    };

    const result = await pool.query(query);

    if (result.rows.length > 0) {
      return result.rows[0]; // Return the updated SLO object
    } else {
      throw new Error(`course could not be added`);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add assess plan");
  }
};

const addClo = async (course_id, clo_description, clo_name) => {
  try {

    const query = {
      text: `
        INSERT INTO clo(course_id, clo_description, clo_name)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      values: [course_id, clo_description, clo_name]
    };

    const result = await pool.query(query);

    if (result.rows.length > 0) {
      return result.rows[0]; // Return the updated SLO object
    } else {
      throw new Error(`clo could not be added`);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add clo");
  }
};

const addCloPlo = async (clo_id, cloplo) => {
  try {

    const query = {
      text: `
        INSERT INTO clo_plo(clo_id, slo_id_list)
        VALUES ($1, $2)
        RETURNING *
      `,
      values: [clo_id, cloplo]
    };

    const result = await pool.query(query);

    if (result.rows.length > 0) {
      return result.rows[0]; // Return the updated SLO object
    } else {
      throw new Error(`cloplo could not be added`);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add cloplo");
  }
};

const login = async (username, password) => {
  try {
    const query = {
      text: `
      SELECT ins_name, username, is_admin, ins_id, is_first_login FROM instructor WHERE username = $1 AND password = $2
      `,
      values: [username, password]
    };

    const result = await pool.query(query);
    if (result.rows.length > 0) {
      return result.rows[0]; // Return the updated SLO object
    } else {
      throw new Error(`login failed`);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed login");
  }
}

const addClass = async (termId, courseId, insId, className) => {
  try{
    const query = {
      text: `
      INSERT into class (term_id, course_id, ins_id, class_name)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      values: [termId, courseId, insId, className]
    };

    const result = await pool.query(query);
    if (result.rows.length > 0) {
      return result.rows[0]; // Return the updated SLO object
    } else {
      throw new Error(``);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed login");
  }
}

const addEval = async (classId, cloId, course_assignment, below60, mean, between60_70, between70_80, between80_90, between90_100, num_students) => {
  try{
    const query = {
      text: `
      INSERT into eval_data (class_id, clo_id, course_assignment, percent_below_60, mean, between_60_70, between_70_80, between_80_90, between_90_100, num_students)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
      `,
      values: [classId, cloId, course_assignment, below60, mean, between60_70, between70_80, between80_90, between90_100, num_students]
    };
    console.log(query);
    const result = await pool.query(query);
    if (result.rows.length > 0) {
      return result.rows[0]; // Return the updated SLO object
    } else {
      throw new Error(`login failed`);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed login");
  }
}

const addCar = async (classId, enrollment, withdrawal, classGPA, learningBarriers, modifications, notesActions, innovationJourney, course_result) => {
  try{
    const query = {
      text: `
      INSERT into car (class_id, enrollment, withdrawal, class_gpa, learning_barriers, modifications, notes_actions, innovation_journey, result)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
      `,
      values: [classId, enrollment, withdrawal, classGPA, learningBarriers, modifications, notesActions, innovationJourney, course_result]
    };

    const result = await pool.query(query);
    if (result.rows.length > 0) {
      return result.rows[0]; // Return the updated SLO object
    } else {
      throw new Error(`login failed`);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed login");
  }
}

module.exports = {
    getTerms,
    getCourses,
    getUsers,
    getPeo,
    getSlo,
    getAssessPlan,
    getPeo_Slo,
    getQfe,
    getClo,
    getFlagshipCourses,
    getQfeStrands,
    updatePeo,
    updateSlo,
    getQfe_Slo,
    getCloPlo,
    updatePeoSlo,
    updateQfeMap,
    addAssessPlan,
    deleteAssessPlan,
    updateAssessPlan,
    updateCloPlo,
    addCourse,
    addClo,
    addCloPlo,
    login,
    getCloByCourse,
    getCourseByCourseNumber,
    addCar,
    addClass,
    addEval
};