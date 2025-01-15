import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import { Box, Button, Checkbox, FormControlLabel, Modal, TextField } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import { default as React, useEffect, useState } from 'react';
import './Course.css';
import './Mappings.css';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Mappings() {
  const [value, setValue] = useState(0);
  const [peo, setPeo] = useState([]);
  const [slo, setSlo] = useState([]);
  const [peo_slo, setPeoSlo] = useState([]);
  const [courses, setCourses] = useState([]);
  const [coursesFlagship, setCoursesFlagship] = useState([]);
  const [assess_plan, setAssessPlan] = useState([]);
  const [qfemap, setQfeMap] = useState([]);
  const [qfestrands, setQfeStrands] = useState([]);
  const [qfeSlo, setQfeSlo] = useState([]);
  const [cloplo, setCloPlo] = useState([]);

  const [editing, setEditing] = useState(null);
  const [currentValue, setCurrentValue] = useState('');
  const [editedValues, setEditedValues] = useState({});

  const [editingQfeMap, setEditingQfeMap] = useState(null); // Stores the entry being edited
const [currentQfeMapValue, setCurrentQfeMapValue] = useState('');

const [editingAssessPlan, setEditingAssessPlan] = useState(null);
const [editingCloPlo, setEditingCloPlo] = useState(null);
const [sloIdLists, setSloIdLists] = useState([]);

const [editingPeo, setEditingPeo] = useState(null);
const [editingSlo, setEditingSlo] = useState(null);
const [hasEdits, setHasEdits] = useState(false);

const [assessLetter, setAssessLetter] = useState(null);




  useEffect(() => {
    fetch('http://localhost:3001/peo').then((response) => response.json()).then((data) => setPeo(data));
    fetch('http://localhost:3001/slo').then((response) => response.json()).then((data) => setSlo(data));
    fetch('http://localhost:3001/peo_slo').then((response) => response.json()).then((data) => setPeoSlo(data));
    fetch('http://localhost:3001/course').then((response) => response.json()).then((data) => setCourses(data));
    fetch('http://localhost:3001/course/flagship').then((response) => response.json()).then((data) => setCoursesFlagship(data));
    fetch('http://localhost:3001/assess_plan').then((response) => response.json()).then((data) => setAssessPlan(data));
    fetch('http://localhost:3001/qfemap').then((response) => response.json()).then((data) => setQfeMap(data));
    fetch('http://localhost:3001/qfestrand').then((response) => response.json()).then((data) => setQfeStrands(data));
    fetch('http://localhost:3001/qfe/slo').then((response) => response.json()).then((data) => setQfeSlo(data));
    fetch('http://localhost:3001/cloplo').then((response) => response.json()).then((data) => setCloPlo(data));
  }, []);

  
const blue = {
  50: '#F0F7FF',
  200: '#A5D8FF',
  400: '#3399FF',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Root = styled('div')(
  ({ theme }) => `
  border-radius: 12px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  overflow: clip;

  table {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    border: none;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    text-align: left;
    padding: 8px;
  }

  `,
);

const CustomTablePagination = styled(TablePagination)(
  ({ theme }) => `
  & .${classes.spacer} {
    display: none;
  }

  & .${classes.toolbar}  {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 4px 0;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.select}{
    font-family: 'IBM Plex Sans', sans-serif;
    padding: 2px 0 2px 4px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    border-radius: 6px; 
    background-color: transparent;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    transition: all 100ms ease;

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:focus {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
      border-color: ${blue[400]};
    }
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.actions} {
    display: flex;
    gap: 6px;
    border: transparent;
    text-align: center;
  }

  & .${classes.actions} > button {
    display: flex;
    align-items: center;
    padding: 0;
    border: transparent;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    transition: all 120ms ease;

    > svg {
      font-size: 22px;
    }

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:focus {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
      border-color: ${blue[400]};
    }

    &:disabled {
      opacity: 0.3;
      &:hover {
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
        background-color: transparent;
      }
    }
  }
  `,
);

  const [modalCourse, setModalCourse] = useState(false);
  const [coursesTab, setCoursesTab] = useState([]);
  const [isAddCourseModalOpen, setAddCourseModalOpen] = useState(false);
  const [isRemoveCourseModalOpen, setRemoveCourseModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [newCourse, setNewCourse] = useState({ course_id: '', course_name: '', course_number: '', isflagship: 'N', cloplo: ''});
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [clos, setClos] = useState([{ text: '', cloplo: '', cloname: 'CLO1' }]);

  const [isAddCloModalOpen, setIsAddCloModalOpen] = useState(false);
  const [newClo, setNewClo] = useState('');

  const [errors, setErrors] = useState({
    courseName: '',
    courseNumber: '',
    clos: [],
  });
  

  const letterToNumber = {
    a: '1',
    b: '2',
    c: '3',
    d: '4',
    e: '5',
    f: '6',
    g: '7',
  };

  const toggleCourse = () => setModalCourse(!modalCourse);

  function getCourses() {
    fetch('http://localhost:3001/course')
      .then(response => response.json())
      .then(data => setCoursesTab(data));
  }

  useEffect(() => {
    getCourses();
  }, []);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - coursesTab.length) : 0;

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handlers for modals
  const handleAddCourseModalOpen = () => setAddCourseModalOpen(true);
  const handleAddCourseModalClose = () => {
    setClos([{ text: '', cloplo: '' }]);
    setErrors({
      courseName: '',
      courseNumber: '',
      clos: [],
    });
    setNewCourse({ course_id: '', course_name: '', course_number: '', isflagship: 'N', cloplo: ''});
    setAddCourseModalOpen(false);
  }
  const handleRemoveCourseModalOpen = () => setRemoveCourseModalOpen(true);
  const handleRemoveCourseModalClose = () => setRemoveCourseModalOpen(false);

  const handleNewCourseChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };
  const handleSOChange = (cloIndex, e) => {
    const { name, checked } = e.target;
    setClos((prevClos) => {
      const newClos = [...prevClos];
      let newCloplo = newClos[cloIndex].cloplo.split('');
      

      if (checked) {
        newCloplo.push(letterToNumber[name]);
      } else {
        newCloplo = newCloplo.filter((num) => num !== letterToNumber[name]);
      }

      newCloplo.sort();
      newClos[cloIndex].cloplo = newCloplo.join('');
      return newClos;
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { courseName: '', courseNumber: '', clos: [] };
  
    if (!newCourse.course_name) {
      newErrors.courseName = 'Course name is required';
      valid = false;
    }
  
    if (!newCourse.course_number) {
      newErrors.courseNumber = 'Course number is required';
      valid = false;
    }
  
    const closErrors = clos.map((clo) => (clo.text ? '' : 'CLO text is required'));
    if (closErrors.includes('CLO text is required')) {
      valid = false;
    }
    newErrors.clos = closErrors;
  
    setErrors(newErrors);
    return valid;
  };
  


  const handleFlagshipChange = (e) => {
    setNewCourse((prev) => ({ ...prev, isflagship: e.target.checked ? 'Y' : 'N' }));
  };

    const handleAddClo = () => {
      const lastClo = clos[clos.length - 1];
      if (!lastClo.text) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          clos: [...prevErrors.clos, 'CLO text is required'],
        }));
        return;
      }
    
      setClos((prevClos) => [...prevClos, { text: '', cloplo: '', cloname: clos.length }]);
      setErrors((prevErrors) => ({
        ...prevErrors,
        clos: [...prevErrors.clos, ''],
      }));
      setIsAddCloModalOpen(false);
    };

  const handleOpenAddCloModal = () => {
    setIsAddCloModalOpen(true);
  };

  const handleCloseAddCloModal = () => {
    setIsAddCloModalOpen(false);
    setNewClo('');
  };

  const handleAddCourse = () => {
    if (!validateForm()) {
      return;
    }
    
    console.log(newCourse);
    const course_num = newCourse.course_number;
    const name = newCourse.course_name;
    const flag = newCourse.isflagship;
    
    const newCourseBody = { course_num, name, flag };
    console.log(newCourseBody);
    
    fetch('http://localhost:3001/add_course', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCourseBody),
    })
    .then((response) => response.json())
    .then((newCourse) => {
      console.log('New course added:', newCourse);
      const course_id = newCourse.course_id;
  
      const cloPromises = clos.map((clo) => {
        const clo_description = clo.text;
        const cloplo = clo.cloplo;
        const clo_name = clo.cloname;
        const newCloBody = { course_id, clo_description, clo_name };
        
        return fetch('http://localhost:3001/add_clo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCloBody),
        })
        .then((response) => response.json())
        .then((newClo) => {
          console.log('New CLO added:', newClo);
          const clo_id = newClo.clo_id;
          const cloploBody = { clo_id, cloplo };
          return fetch('http://localhost:3001/add_cloplo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(cloploBody),
          })
          .then((response) => response.json())
          .then((newCloPlo) => {
            console.log('cloplo added: ', newCloPlo);
          })
        });
      });
  
      return Promise.all(cloPromises);
    })
    .then(() => {
      fetch('http://localhost:3001/course')
        .then((response) => response.json())
        .then((data) => setCoursesTab(data));

      fetch('http://localhost:3001/cloplo')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCloPlo(data);
    });
      
      setNewCourse({ course_id: '', course_name: '', course_number: '', isflagship: 'N', cloplo: '' });
      setClos([{ text: '', cloplo: '', cloname: 'CLO1' }]);
      handleAddCourseModalClose();
    })
    .catch((error) => console.error('Error adding course:', error));
  };
  

  const handleCourseSelectionChange = (course_id) => {
    setSelectedCourses((prev) =>
      prev.includes(course_id)
        ? prev.filter((id) => id !== course_id)
        : [...prev, course_id]
    );
  };

  const handleRemoveCourses = () => {
    fetch('http://localhost:3001/remove_courses', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ course_ids: selectedCourses }),
    })
      .then(() => {
        setCoursesTab((prev) => prev.filter((course) => !selectedCourses.includes(course.course_id)));
        setSelectedCourses([]);
        handleRemoveCourseModalClose();
      })
      .catch((error) => console.error('Error removing courses:', error));
  };

  const handleEditModeToggle = () => setEditMode((prev) => !prev);

  const handleCourseEditChange = (course_id, field, value) => {
    setCoursesTab((prev) =>
      prev.map((course) =>
        course.course_id === course_id ? { ...course, [field]: value } : course
      )
    );
  };

  const handleCourseEditSave = (updatedCourse) => {
    fetch(`http://localhost:3001/update_course`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCourse),
    })
      .then((response) => response.json())
      .then(() => {
        setCoursesTab((prev) =>
          prev.map((course) =>
            course.course_id === updatedCourse.course_id ? updatedCourse : course
          )
        );
      })
      .catch((error) => console.error('Error updating course:', error));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEditButtonClick = () => {
    setEditing(true);
  };

  const handleEditPeoButtonClick = () => {
    setEditingPeo(true);
  };

  const handleEditSloButtonClick = () => {
    setEditingSlo(true);
  };

  const handleEditQfeMapButtonClick = () => {
    setEditingQfeMap(true);
  };

  const handleEditAssessPlanButtonClick = () => {
    setEditingAssessPlan(true);
  }

  const handleEditCloPloButtonClick = () => {
    setEditingCloPlo(true);
  }
  
  const handleQfeMapConfirm = () => {
    setHasEdits(false);
    const qfeMapToUpdate = [...qfemap];
  
    // Save changes to the server
    Object.keys(editedValues).forEach((key) => {
      const [qfe_id, peo_slo_id] = key.split('-');
      const value = editedValues[key];

      const updated_qfe_map = { qfe_id, peo_slo_id}
      console.log(updated_qfe_map);

      fetch(`http://localhost:3001/update_qfe_map`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updated_qfe_map),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update');
          }
          fetch('http://localhost:3001/qfemap').then((response) => response.json()).then((data) => setQfeMap(data));
          return response.json();
        })
        .catch((error) => {
          console.error('Error updating data:', error);
          alert('Failed to update data. Please try again.');
        });
      });
    setEditedValues({});
  };
  
  const handleQfeMapCancel = () => {
    setEditingQfeMap(false);
    setEditedValues({});
  };

  const handlePeoCancel = () => {
    setEditingPeo(false);
    setEditedValues({});
  };

  const handleSloCancel = () => {
    setEditingSlo(false);
    setEditedValues({});
  };

  const handleAssessPlanCancel = () => {
    setEditingAssessPlan(false);
    setEditedValues({});
  };

  const handleCloPloCancel = () => {
    setEditingCloPlo(false);
    setEditedValues({});
    setSloIdLists({});
  };
  
  
  const handleInputChange = (e, slo_letter, peo_id) => {
    setHasEdits(true);
    const { value } = e.target;
    if (value === 'X') {
      Object.keys(editedValues).forEach((key) => {
        const [slo_letter_edit, peo_id_edit] = key.split('-');
        if(slo_letter_edit == slo_letter){
          delete editedValues[key];
        }
      });
      setEditedValues((prev) => ({
        ...prev,
        [`${slo_letter}-${peo_id}`]: value,
      }));
    }
  };

  const handlePeoInputChange = (e, peo_id, field) => {
    setHasEdits(true);
    const { value } = e.target;
    
      setEditedValues((prev) => ({
        ...prev,
        [`${peo_id}-${field}`]: value,
      }));
  };

  const handleSloInputChange = (e, slo_id, field) => {
    setHasEdits(true);
    const { value } = e.target;

    setEditedValues((prev) => ({
      ...prev,
      [`${slo_id}-${field}`]: value,
    }));
  };

  const handleQfeMapInputChange = (e, qfe_id, peo_slo_id) => {
    setHasEdits(true);
    const { value } = e.target;
    if (value === 'X') {
      Object.keys(editedValues).forEach((key) => {
        const [qfe_id_edited, peo_slo_id_edited] = key.split('-');
        if(qfe_id_edited == qfe_id){
          delete editedValues[key];
        }
      });
      setEditedValues((prev) => ({
        ...prev,
        [`${qfe_id}-${peo_slo_id}`]: value,
      }));
    }
  };

  const handleAssessPlanInputChange = (e, assess_plan_id, slo_id, course_id, assess_letter) => {
    setHasEdits(true);
    const { value } = e.target;
    if (value === 'I' || value === 'M' || value === 'R' || value === '') {
      setEditedValues((prev) => ({
        ...prev,
        [`${assess_plan_id}-${slo_id}-${course_id}`]: value,
      }));
      setAssessLetter(value);
    }
    console.log(editedValues);
  }
  const handleCloPloInputChange = (e, clo_plo_id, slo_id, slo_id_list) => {
    setHasEdits(true);
    const { value } = e.target;
  
    if (value === 'X' || value === '') {
      // Update editedValues
      setEditedValues((prev) => ({
        ...prev,
        [`${clo_plo_id}-${slo_id}`]: value,
      }));
  
      // Update slo_id_list dynamically
      // setSloIdLists((prev) => {
      //   const prevList = (prev[clo_plo_id] || '').split('').map(Number);
      //   let newList;
  
      //   if (value === 'X') {
      //     newList = [...new Set([...prevList, slo_id])];
      //   } else {
      //     newList = prevList.filter(id => id !== slo_id);
      //   }

      //   console.log(prev);
  
      //   return {
      //     ...prev,
      //     [clo_plo_id]: newList.join(''),
      //   };
      // });
    }
  };
  
  

  const handleCloPloConfirm = () => {
    setHasEdits(false);
    Object.keys(editedValues).forEach((key) => {
      const clo_plo_id = key;
      const value = editedValues[key];
      console.log(value);
      console.log(editedValues);

      const slo_id_list_number = sloIdLists[clo_plo_id];

      const update_clo_plo = { clo_plo_id, slo_id_list_number };


      fetch('http://localhost:3001/update_clo_plo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(update_clo_plo),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update');
        }
        return response.json();
      })
      .then(() => {
        // Re-fetch assess plan data
        return fetch('http://localhost:3001/cloplo');
      })
      .then((response) => response.json())
      .then((data) => setCloPlo(data))
      .catch((error) => {
        console.error('Error updating data:', error);
        alert('Failed to update data. Please try again.');
      });
    })
    setEditing(false);
    setEditedValues({});
  }

  const handleAssessPlanConfirm = () => {
    setHasEdits(false);
    Object.keys(editedValues).forEach((key) => {
      const [assess_plan_id, slo_id, course_id] = key.split('-');
      const value = editedValues[key];
      console.log(assess_plan_id);
  
      // Initialize flag for existence check
      let assess_plan_exists = false;
  
      // Check if the assess plan exists
      assess_plan.forEach((item) => {
        if (item.assess_plan_id == assess_plan_id) {
          assess_plan_exists = true;
        }
      });
  
  
      if (value === '' && assess_plan_exists) {
        // Handle delete
        const delete_assess_plan = { assess_plan_id };
        fetch('http://localhost:3001/delete_assess_plan', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(delete_assess_plan),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to delete');
            }
            return response.json();
          })
          .then(() => {
            // Re-fetch assess plan data
            return fetch('http://localhost:3001/assess_plan');
          })
          .then((response) => response.json())
          .then((data) => setAssessPlan(data))
          .catch((error) => {
            console.error('Error updating data:', error);
            alert('Failed to update data. Please try again.');
          });
      } else if (assess_plan_exists) {
        // Handle update
        const update_assess_plan = { assess_plan_id, value };
        fetch('http://localhost:3001/update_assess_plan', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(update_assess_plan),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to update');
            }
            console.log('went well');
            return response.json();
          })
          .then(() => {
            // Re-fetch assess plan data
            return fetch('http://localhost:3001/assess_plan');
          })
          .then((response) => response.json())
          .then((data) => setAssessPlan(data))
          .catch((error) => {
            console.error('Error updating data:', error);
            alert('Failed to update data. Please try again.');
          });
      } else {
        // Handle add
        const add_assess_plan = { assess_plan_id, slo_id, course_id, value };
        fetch('http://localhost:3001/add_assess_plan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(add_assess_plan),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to add');
            }
            return response.json();
          })
          .then(() => {
            // Re-fetch assess plan data
            return fetch('http://localhost:3001/assess_plan');
          })
          .then((response) => response.json())
          .then((data) => setAssessPlan(data))
          .catch((error) => {
            console.error('Error updating data:', error);
            alert('Failed to update data. Please try again.');
          });
      }
    });
    setEditing(false);
    setEditedValues({});
  };
  

  const handleConfirm = () => {
    setHasEdits(false);
    const newPeoSlo = [...peo_slo]; // Copy current peoSlo state
    const sloLetterToX = {}; // Track where the 'X' is for each slo_letter
    const errorMessages = [];
  
    // Collect all the new 'X' entries
    Object.keys(editedValues).forEach((key) => {
      const [slo_letter, peo_id] = key.split('-');
      const value = editedValues[key];

      const updated_peo_slo = { slo_letter, peo_id}

      fetch(`http://localhost:3001/update_peo_slo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updated_peo_slo),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update');
          }
          fetch('http://localhost:3001/peo_slo').then((response) => response.json()).then((data) => setPeoSlo(data));
          return response.json();
        })
        .catch((error) => {
          console.error('Error updating data:', error);
          alert('Failed to update data. Please try again.');
        });
      });
  
    setEditing(false);
    setEditedValues({});
  };
  
  const handlePeoConfirm = () => {
    setHasEdits(false);
    const peo_to_update = [...peo];

    // Save changes to the server
    Object.keys(editedValues).forEach((key) => {
      const [peo_id, field] = key.split('-');
      const value = editedValues[key];

      if (value === ''){
        return alert("field cannot be left empty.");
      }

      const updated_peo = { peo_id, field, value }

      fetch(`http://localhost:3001/update_peo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updated_peo),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update');
          }
          fetch('http://localhost:3001/peo').then((response) => response.json()).then((data) => setPeo(data));
          return response.json();
        })
        .catch((error) => {
          console.error('Error updating data:', error);
          alert('Failed to update data. Please try again.');
        });
    });

    setEditingPeo(false);
    setEditedValues({});
  };


  const handleSloConfirm = () => {
    setHasEdits(false);
    const slo_to_update = [...slo];

    // Save changes to the server
    Object.keys(editedValues).forEach((key) => {
      const [slo_id, field] = key.split('-');
      const value = editedValues[key];

      if (value === ''){
        return alert("field cannot be left empty.");
      }

      const updated_slo = { slo_id, field, value }

      fetch(`http://localhost:3001/update_slo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updated_slo),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update');
          }
          fetch('http://localhost:3001/slo').then((response) => response.json()).then((data) => setSlo(data));
          return response.json();
        })
        .catch((error) => {
          console.error('Error updating data:', error);
          alert('Failed to update data. Please try again.');
        });
    });

    setEditingSlo(false);
    setEditedValues({});
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedValues({});
  };


  const renderPeoSloCell = (slo_letter, peo_id) => {
    const entry = peo_slo.find(
      (ps) => ps.slo_letter === slo_letter && ps.peo_id === peo_id
    );
    const cellValue = entry ? 'X' : '';

    if (editing) {
      const editedValue = editedValues[`${slo_letter}-${peo_id}`];
      const color = editedValue ? 'red' : 'black';
      return (
        <input
          type="text"
          value={editedValue !== undefined ? editedValue : cellValue}
          onChange={(e) => handleInputChange(e, slo_letter, peo_id)}
          style={{ width: '100%', border: 'none', textAlign: 'center', color: color}}
        />
      );
    }

    return cellValue;
  };

  const renderPeoCell = (peoItem, field) => {

    const cellValue = peoItem[field];
  
    if (editingPeo) {
      const editedValue = editedValues[`${peoItem.peo_id}-${field}`];
      return (
        <textarea
          type="text"
          value={editedValue !== undefined ? editedValue : cellValue}
          onChange={(e) => handlePeoInputChange(e, peoItem.peo_id, field)}
          size={cellValue.length}
        />
      );
    }
    return cellValue;
  };

  const renderSloCell = (sloItem, field) => {

    const cellValue = sloItem[field];
  
    if (editingSlo) {
      const editedValue = editedValues[`${sloItem.slo_id}-${field}`];
      return (
        <textarea
          type="text"
          value={editedValue !== undefined ? editedValue : cellValue}
          onChange={(e) => handleSloInputChange(e, sloItem.slo_id, field)}
        />
      );
    }
    return cellValue;
  };
  

  
  const renderQfeMapCell = (entry, peo_slo_id) => {
    const isMapped = entry.peo_slo_id === peo_slo_id;
    const cellValue = isMapped ? 'X' : '';

    if (editingQfeMap) {
      const editedValue = editedValues[`${entry.qfe_id}-${peo_slo_id}`]
      const color = editedValue ? 'red' : 'black';
      return (
        <input
          type="text"
          value={editedValue !== undefined ? editedValue : cellValue}
          onChange={(e) => handleQfeMapInputChange(e, entry.qfe_id, peo_slo_id)}
          style={{color: color}}
        />
      );
    }

    return cellValue;
    
  };

  const renderCloPloCell = (entry, slo_id, slo_id_list) => {
    const sloIdsArray = slo_id_list.toString().split('');
    const isXPresent = sloIdsArray.includes(slo_id.toString());
    const cellValue = isXPresent ? 'X' : '';

    if (editingCloPlo) {
      const editedValue = editedValues[`${entry.clo_plo_id}-${slo_id}`];
      return (
        <input
          type="text"
          value={editedValue !== undefined ? editedValue : cellValue}
          onChange={(e) => handleCloPloInputChange(e, entry.clo_plo_id, slo_id, slo_id_list)}
        />
      );
    }

    return cellValue;
  };
  
  
  

  const renderAssessPlanCell = (entry, slo_id, course_id) => {
    const cellValue = entry ? entry.assess_letter : '';
  
    if (editingAssessPlan) {
      const assessPlanId = entry ? entry.assess_plan_id : 'new'; // Use 'new' or another placeholder if entry is undefined
      const editedValue = editedValues[`${assessPlanId}-${slo_id}-${course_id}`];
      if (editedValue){
        console.log(editedValue);
      }
      return (
        <select
          value={editedValue !== undefined ? editedValue : cellValue}
          onChange={(e) => handleAssessPlanInputChange(e, assessPlanId, slo_id, course_id, e.target.value)}
        >
          <option value=""> </option>
          <option value="I">I</option>
          <option value="M">M</option>
          <option value="R">R</option>
        </select>
      );
    }
    return cellValue;
  };


  const groupSloByPeo = () => {
    const grouped = {};
    qfeSlo.forEach((item) => {
      const { slo_letter, peo_id } = item;
      if (!grouped[peo_id]) {
        grouped[peo_id] = [];
      }
      grouped[peo_id].push(slo_letter);
    });
    return grouped;
  };

  const groupedSlo = groupSloByPeo();

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="PEOs" {...a11yProps(0)} />
          <Tab label="SLOs" {...a11yProps(1)} />
          <Tab label="PEO > SLO" {...a11yProps(2)} />
          <Tab label="QFE Mappings" {...a11yProps(3)} />
          <Tab label="Assessment Plan" {...a11yProps(4)} />
          <Tab label="CLOs > PLOs" {...a11yProps(5)} />
          <Tab label="Courses" {...a11yProps(6)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <table>
    <thead>
      <tr>
        <th>PEO #</th>
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {peo.map((peoItem) => (
        <tr key={peoItem.peo_id}>
          <td>{peoItem.peo_id}</td>
          <td>{renderPeoCell(peoItem, 'peo_name')}</td>
          <td>{renderPeoCell(peoItem, 'peo_description')}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <Button onClick={handleEditPeoButtonClick}>Edit</Button>
        {editingPeo && (
          <div>
            <Button onClick={handlePeoConfirm} disabled={!hasEdits}>Confirm</Button>
            <Button onClick={handlePeoCancel}>Cancel</Button>
          </div>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <table className='sloTable'>
          <thead>
            <tr>
              <th>Student Learning Outcome</th>
              <th>Short Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {slo.map((row) => (
              <tr key={row.slo_id}>
                <td>{row.slo_id}</td>
                <td>{renderSloCell(row, 'slo_name')}</td>
                <td>{renderSloCell(row, 'slo_description')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button onClick={handleEditSloButtonClick}>Edit</Button>
        {editingSlo && (
          <div>
            <Button onClick={handleSloConfirm} disabled={!hasEdits}>Confirm</Button>
            <Button onClick={handleSloCancel}>Cancel</Button>
          </div>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Button onClick={handleEditButtonClick}>Edit</Button>
        {editing && (
          <div>
            <Button onClick={handleConfirm} disabled={!hasEdits}>Confirm</Button>
            <Button onClick={handleCancel}>Exit Edit mode</Button>
          </div>
        )}
        <table className='peosloTable'>
          <thead>
            <tr>
              <th>SLO #</th>
              {peo.map((peo) => (
                <th key={peo.peo_id}>PEO {peo.peo_id}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slo.map((slo) => (
              <tr key={slo.slo_letter}>
                <td>{slo.slo_letter}</td>
                {peo.map((peo) => (
                  <td key={peo.peo_id}>
                    {renderPeoSloCell(slo.slo_letter, peo.peo_id)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
      <Button onClick={handleEditQfeMapButtonClick}>Edit</Button>
        {editingQfeMap && (
          <div>
            <Button onClick={handleQfeMapConfirm} disabled={!hasEdits}>Confirm</Button>
            <Button onClick={handleQfeMapCancel}>Exit Edit mode</Button>
          </div>
        )}
        <table className='peosloTable'>
          <thead>
            <tr>
              <th className='firstcol'>National Standards of Learning Outcomes for Bachelor Program</th>
              <th className='secondcol' colSpan={7} rowSpan={2}>Program Title: Bachelor in Computing Security</th>
            </tr>
            <tr>
              <th className='firstcol'>(QFEmirates Level 7)</th>
            </tr>
            <tr>
              <th>Strand #</th>
              {peo.map((peoRow) => (
                <th key={peoRow.peo_id} colSpan={Object.keys(groupedSlo[peoRow.peo_id] || {}).length || 1}>PEO {peoRow.peo_id}: {peoRow.peo_name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {qfestrands.map((qfeStrandRow) => (
              <React.Fragment key={qfeStrandRow.strand_number}>
                <tr>
                  <th>Strand {qfeStrandRow.strand_number}: {qfeStrandRow.short_name}</th>
                  {peo.map((peoRow) => (
                    (groupedSlo[peoRow.peo_id] || []).map((slo_letter, index) => (
                      <th key={index}>{slo_letter}</th>
                    ))
                  ))}
                </tr>
                {qfemap.filter((qfemapRow) => qfemapRow.strand_number === qfeStrandRow.strand_number).map((filteredQfeMapRow) => (
                  <tr key={filteredQfeMapRow.qfe_id}>
                    <td>{filteredQfeMapRow.description}</td>
                    {peo.map((peoRow) => (
                      (groupedSlo[peoRow.peo_id] || []).map((slo_letter, index) => {
                        const matchingPeoSlo = peo_slo.find(
                          (ps) => ps.slo_letter === slo_letter && ps.peo_id === peoRow.peo_id
                        );
                        return (
                          <td key={index}>
                            {renderQfeMapCell(filteredQfeMapRow, matchingPeoSlo ? matchingPeoSlo.peo_slo_id : null)}
                          </td>
                        );
                      })
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
  <Button onClick={handleEditAssessPlanButtonClick}>Edit</Button>
  {editingAssessPlan && (
    <div>
      <Button onClick={handleAssessPlanConfirm} disabled={!hasEdits}>Confirm</Button>
      <Button onClick={handleAssessPlanCancel}>Exit Edit mode</Button>
    </div>
  )}
  <table className='peosloTable'>
    <thead>
      <tr>
        <th>Student Outcome</th>
        {coursesFlagship.map((row) => (
          <th key={row.course_id}>
            {row.course_number}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {slo.map((sloRow) => (
        <tr key={sloRow.slo_id}>
          <td>{sloRow.slo_letter}</td>
          {coursesFlagship.map((course_row) => {

            const matchingEntry = assess_plan.find((ap) => {
              return ap.slo_id === sloRow.slo_id && ap.course_id === course_row.course_id;
            });

            const blueCell = matchingEntry ? 'blue-cell' : '';
            return (
              <td key={`${sloRow.slo_id}-${course_row.course_id}`} className={blueCell}>
                {renderAssessPlanCell(matchingEntry, sloRow.slo_id, course_row.course_id)}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
</CustomTabPanel>

<CustomTabPanel value={value} index={5}>
      <Button onClick={handleEditCloPloButtonClick}>Edit</Button>
      {editingCloPlo && (
        <div>
          <Button onClick={handleCloPloConfirm} disabled={!hasEdits}>Confirm</Button>
          <Button onClick={handleCloPloCancel}>Cancel</Button>
        </div>
      )}
      <table className='peosloTable'>
        <thead>
          <tr>
            <th>Course #</th>
            <th colSpan={8}>CSEC Student Outcomes</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((courseRow) => (
            <React.Fragment key={courseRow.course_id}>
              <tr>
                <th colSpan={2}>{courseRow.course_number} {courseRow.course_name}</th>
                {slo.map((sloRow) => (
                  <th key={`${courseRow.course_id}-${sloRow.slo_id}`}>{sloRow.slo_letter}</th>
                ))}
              </tr>
              {cloplo.filter(clo => clo.course_id === courseRow.course_id).map((cloploRow) => (
                <React.Fragment key={cloploRow.clo_plo_id}>
                  <tr>
                    <td colSpan={2}>{cloploRow.clo_description}</td>
                    {slo.map((sloRow) => (
                      <td key={`${cloploRow.clo_plo_id}-${sloRow.slo_id}`}>
                        {renderCloPloCell(cloploRow, sloRow.slo_id, cloploRow.slo_id_list)}
                      </td>
                    ))}
                  </tr>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </CustomTabPanel>

      <CustomTabPanel value={value} index={6}>
      <Button onClick={handleAddCourseModalOpen}>Add Course</Button>
      <Button onClick={handleRemoveCourseModalOpen} disabled={!selectedCourses.length}>Remove Selected Courses</Button>
      <Button onClick={handleEditModeToggle}>{isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}</Button>

      <Modal open={isAddCourseModalOpen} onClose={handleAddCourseModalClose} className='modalStyle'>
        <Box sx={{ padding: 2, backgroundColor: 'white', margin: 'auto', marginTop: '10%', width: 400 }}>
          <h2>Add Course</h2>
          <TextField label="Course Number" name="course_number" value={newCourse.course_number} onChange={handleNewCourseChange} fullWidth required error={!!errors.courseNumber} helperText={errors.courseNumber} />
          <TextField label="Course Name" name="course_name" value={newCourse.course_name} onChange={handleNewCourseChange} fullWidth required error={!!errors.courseName} helperText={errors.courseName}/>
          
          <FormControlLabel
          control={<Checkbox name="isflagship" checked={newCourse.isflagship === 'Y'} onChange={handleFlagshipChange} />}
          label="Flagship"
        />

        <Button onClick={handleOpenAddCloModal}>Add CLO</Button>
        <Modal open={isAddCloModalOpen} onClose={handleCloseAddCloModal}>
        <Box sx={{ padding: 2, backgroundColor: 'white', margin: 'auto', marginTop: '10%', width: 300 }}>
          <h2>Add CLO</h2>
          <TextField label="CLO" value={newClo} onChange={(e) => setNewClo(e.target.value)} fullWidth required error={!!errors.clos[0]} helperText={errors.clos[0]}/>
          <Button onClick={handleAddClo}>Done</Button>
          <Button onClick={handleCloseAddCloModal}>Cancel</Button>
        </Box>
      </Modal>
      {clos.map((clo, index) => (
  <div key={index} className="clo-section">
    <TextField
      label={`CLO ${index + 1}`}
      value={clo.text}
      onChange={(e) => {
        const { value } = e.target;
        setClos((prev) => {
          const newClos = [...prev];
          newClos[index].text = value;
          newClos[index].cloname = 'CLO'+(index+1);
          return newClos;
        });
      }}
      fullWidth
      margin="normal"
      required
      error={!!errors.clos[index]} helperText={errors.clos[index]}
    />
    <div className="so-checkboxes">
      {['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((so) => (
        <FormControlLabel
          key={so}
          control={
            <Checkbox
              name={so}
              checked={clo.cloplo.includes(letterToNumber[so])}
              onChange={(e) => handleSOChange(index, e)}
              color="primary"
            />
          }
          label={so.toUpperCase()}
        />
      ))}
    </div>
  </div>
))}

        <br/>
          <Button onClick={handleAddCourse}>Add</Button>
          <Button onClick={handleAddCourseModalClose}>Cancel</Button>
        </Box>
      </Modal>

      <Modal open={isRemoveCourseModalOpen} onClose={handleRemoveCourseModalClose}>
        <Box sx={{ padding: 2, backgroundColor: 'white', margin: 'auto', marginTop: '10%', width: 400 }}>
          <h2>Remove Selected Courses</h2>
          <Button onClick={handleRemoveCourses}>Confirm</Button>
          <Button onClick={handleRemoveCourseModalClose}>Cancel</Button>
        </Box>
      </Modal>

      <hr />
        <table aria-label="custom pagination table" className='courseTable'>
          <thead>
            <tr>
              <th className='first'>Select</th>
              <th className='first'>Course #</th>
              <th className='second'>Course Name</th>
              <th className='third'>Flagship?</th>
              {isEditMode && <th className='third'>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? coursesTab.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : coursesTab
            ).map((row) => (
              <tr key={row.course_id}>
                <td className='first'>
                  <Checkbox checked={selectedCourses.includes(row.course_id)} onChange={() => handleCourseSelectionChange(row.course_id)} />
                </td>
                <td className='first' style={{ width: 120 }}>
                  {isEditMode ? (
                    <TextField fullWidth value={row.course_number} onChange={(e) => handleCourseEditChange(row.course_id, 'course_number', e.target.value)} />
                  ) : (
                    row.course_number
                  )}
                </td>
                <td className='second' style={{ width: 200 }} align="right">
                  {isEditMode ? (
                    <TextField fullWidth value={row.course_name} onChange={(e) => handleCourseEditChange(row.course_id, 'course_name', e.target.value)} />
                  ) : (
                    row.course_name
                  )}
                </td>
                <td className='third' style={{ width: 120 }} align="right">
                  {isEditMode ? (
                    <Checkbox checked={row.isflagship === 'Y' ? true : false} onChange={(e) => handleCourseEditChange(row.course_id, 'isflagship', e.target.checked)} />
                  ) : (
                    row.isflagship == 'Y' ? 'Yes' : 'No'
                  )}
                </td>
                {isEditMode && (
                  <td className='third'>
                    <Button onClick={() => handleCourseEditSave(row)}>Save</Button>
                  </td>
                )}
              </tr>
            ))}

            {emptyRows > 0 && (
              <tr style={{ height: 34 * emptyRows }}>
                <td colSpan={5} aria-hidden />
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <CustomTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={5}
                count={coursesTab.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    'aria-label': 'rows per page',
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                    slots: {
                      firstPageIcon: FirstPageRoundedIcon,
                      lastPageIcon: LastPageRoundedIcon,
                      nextPageIcon: ChevronRightRoundedIcon,
                      backPageIcon: ChevronLeftRoundedIcon,
                    },
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </tr>
          </tfoot>
        </table>
      </CustomTabPanel>
    </Box>
  );
}
