// this component not used anymore.

// import {
//   TablePagination,
//   tablePaginationClasses as classes,
// } from '@mui/base/TablePagination';
// import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
// import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
// import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
// import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
// import { Box, Button, Checkbox, FormControlLabel, Modal, TextField } from '@mui/material';
// import { styled } from '@mui/system';
// import React, { useEffect, useState } from 'react';
// import './Course.css';

// const blue = {
//   50: '#F0F7FF',
//   200: '#A5D8FF',
//   400: '#3399FF',
//   900: '#003A75',
// };

// const grey = {
//   50: '#F3F6F9',
//   100: '#E5EAF2',
//   200: '#DAE2ED',
//   300: '#C7D0DD',
//   400: '#B0B8C4',
//   500: '#9DA8B7',
//   600: '#6B7A90',
//   700: '#434D5B',
//   800: '#303740',
//   900: '#1C2025',
// };

// const Root = styled('div')(
//   ({ theme }) => `
//   border-radius: 12px;
//   border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
//   overflow: clip;

//   table {
//     font-family: 'IBM Plex Sans', sans-serif;
//     font-size: 0.875rem;
//     border-collapse: collapse;
//     border: none;
//     width: 100%;
//   }

//   td,
//   th {
//     border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
//     text-align: left;
//     padding: 8px;
//   }

//   `,
// );

// const CustomTablePagination = styled(TablePagination)(
//   ({ theme }) => `
//   & .${classes.spacer} {
//     display: none;
//   }

//   & .${classes.toolbar}  {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 8px;
//     padding: 4px 0;

//     @media (min-width: 768px) {
//       flex-direction: row;
//       align-items: center;
//     }
//   }

//   & .${classes.selectLabel} {
//     margin: 0;
//   }

//   & .${classes.select}{
//     font-family: 'IBM Plex Sans', sans-serif;
//     padding: 2px 0 2px 4px;
//     border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
//     border-radius: 6px; 
//     background-color: transparent;
//     color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
//     transition: all 100ms ease;

//     &:hover {
//       background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
//       border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
//     }

//     &:focus {
//       outline: 3px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
//       border-color: ${blue[400]};
//     }
//   }

//   & .${classes.displayedRows} {
//     margin: 0;

//     @media (min-width: 768px) {
//       margin-left: auto;
//     }
//   }

//   & .${classes.actions} {
//     display: flex;
//     gap: 6px;
//     border: transparent;
//     text-align: center;
//   }

//   & .${classes.actions} > button {
//     display: flex;
//     align-items: center;
//     padding: 0;
//     border: transparent;
//     border-radius: 50%;
//     background-color: transparent;
//     border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
//     color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
//     transition: all 120ms ease;

//     > svg {
//       font-size: 22px;
//     }

//     &:hover {
//       background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
//       border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
//     }

//     &:focus {
//       outline: 3px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
//       border-color: ${blue[400]};
//     }

//     &:disabled {
//       opacity: 0.3;
//       &:hover {
//         border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
//         background-color: transparent;
//       }
//     }
//   }
//   `,
// );

// const Course = (args) => {
//   const [modalCourse, setModalCourse] = useState(false);
//   const [courses, setCourses] = useState([]);
//   const [isAddCourseModalOpen, setAddCourseModalOpen] = useState(false);
//   const [isRemoveCourseModalOpen, setRemoveCourseModalOpen] = useState(false);
//   const [isEditMode, setEditMode] = useState(false);
//   const [newCourse, setNewCourse] = useState({ course_id: '', course_name: '', course_number: '', isflagship: 'N', cloplo: ''});
//   const [selectedCourses, setSelectedCourses] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [clos, setClos] = useState([{ text: '', cloplo: '', cloname: 'CLO1' }]);

//   const [isAddCloModalOpen, setIsAddCloModalOpen] = useState(false);
//   const [newClo, setNewClo] = useState('');

//   const [errors, setErrors] = useState({
//     courseName: '',
//     courseNumber: '',
//     clos: [],
//   });
  

//   const letterToNumber = {
//     a: '1',
//     b: '2',
//     c: '3',
//     d: '4',
//     e: '5',
//     f: '6',
//     g: '7',
//   };

//   const toggleCourse = () => setModalCourse(!modalCourse);

//   function getCourses() {
//     fetch('http://localhost:3001/course')
//       .then(response => response.json())
//       .then(data => setCourses(data));
//   }

//   useEffect(() => {
//     getCourses();
//   }, []);

//   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - courses.length) : 0;

//   const handleChangePage = (event, newPage) => setPage(newPage);

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Handlers for modals
//   const handleAddCourseModalOpen = () => setAddCourseModalOpen(true);
//   const handleAddCourseModalClose = () => {
//     setClos([{ text: '', cloplo: '' }]);
//     setErrors({
//       courseName: '',
//       courseNumber: '',
//       clos: [],
//     });
//     setNewCourse({ course_id: '', course_name: '', course_number: '', isflagship: 'N', cloplo: ''});
//     setAddCourseModalOpen(false);
//   }
//   const handleRemoveCourseModalOpen = () => setRemoveCourseModalOpen(true);
//   const handleRemoveCourseModalClose = () => setRemoveCourseModalOpen(false);

//   const handleNewCourseChange = (e) => {
//     const { name, value } = e.target;
//     setNewCourse((prev) => ({ ...prev, [name]: value }));
//   };
//   const handleSOChange = (cloIndex, e) => {
//     const { name, checked } = e.target;
//     setClos((prevClos) => {
//       const newClos = [...prevClos];
//       const newCloplo = newClos[cloIndex].cloplo.split('');

//       if (checked) {
//         newCloplo.push(letterToNumber[name]);
//       } else {
//         newCloplo = newCloplo.filter((num) => num !== letterToNumber[name]);
//       }

//       newCloplo.sort();
//       newClos[cloIndex].cloplo = newCloplo.join('');
//       return newClos;
//     });
//   };

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = { courseName: '', courseNumber: '', clos: [] };
  
//     if (!newCourse.course_name) {
//       newErrors.courseName = 'Course name is required';
//       valid = false;
//     }
  
//     if (!newCourse.course_number) {
//       newErrors.courseNumber = 'Course number is required';
//       valid = false;
//     }
  
//     const closErrors = clos.map((clo) => (clo.text ? '' : 'CLO text is required'));
//     if (closErrors.includes('CLO text is required')) {
//       valid = false;
//     }
//     newErrors.clos = closErrors;
  
//     setErrors(newErrors);
//     return valid;
//   };
  


//   const handleFlagshipChange = (e) => {
//     setNewCourse((prev) => ({ ...prev, isflagship: e.target.checked ? 'Y' : 'N' }));
//   };

//     const handleAddClo = () => {
//       const lastClo = clos[clos.length - 1];
//       if (!lastClo.text) {
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           clos: [...prevErrors.clos, 'CLO text is required'],
//         }));
//         return;
//       }
    
//       setClos((prevClos) => [...prevClos, { text: '', cloplo: '', cloname: clos.length }]);
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         clos: [...prevErrors.clos, ''],
//       }));
//       setIsAddCloModalOpen(false);
//     };

//   const handleOpenAddCloModal = () => {
//     setIsAddCloModalOpen(true);
//   };

//   const handleCloseAddCloModal = () => {
//     setIsAddCloModalOpen(false);
//     setNewClo('');
//   };

//   const handleAddCourse = () => {
//     if (!validateForm()) {
//       return;
//     }
    
//     console.log(newCourse);
//     const course_num = newCourse.course_number;
//     const name = newCourse.course_name;
//     const flag = newCourse.isflagship;
    
//     const newCourseBody = { course_num, name, flag };
//     console.log(newCourseBody);
    
//     fetch('http://localhost:3001/add_course', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newCourseBody),
//     })
//     .then((response) => response.json())
//     .then((newCourse) => {
//       console.log('New course added:', newCourse);
//       const course_id = newCourse.course_id;
  
//       const cloPromises = clos.map((clo) => {
//         const clo_description = clo.text;
//         const cloplo = clo.cloplo;
//         const clo_name = clo.cloname;
//         const newCloBody = { course_id, clo_description, clo_name };
        
//         return fetch('http://localhost:3001/add_clo', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(newCloBody),
//         })
//         .then((response) => response.json())
//         .then((newClo) => {
//           console.log('New CLO added:', newClo);
//           const clo_id = newClo.clo_id;
//           const cloploBody = { clo_id, cloplo };
//           return fetch('http://localhost:3001/add_cloplo', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(cloploBody),
//           })
//           .then((response) => response.json())
//           .then((newCloPlo) => {
//             console.log('cloplo added: ', newCloPlo);
//           })
//         });
//       });
  
//       return Promise.all(cloPromises);
//     })
//     .then(() => {
//       fetch('http://localhost:3001/course')
//         .then((response) => response.json())
//         .then((data) => setCourses(data));
      
//       setNewCourse({ course_id: '', course_name: '', course_number: '', isflagship: 'N', cloplo: '' });
//       setClos([{ text: '', cloplo: '', cloname: 'CLO1' }]);
//       handleAddCourseModalClose();
//     })
//     .catch((error) => console.error('Error adding course:', error));
//   };
  

//   const handleCourseSelectionChange = (course_id) => {
//     setSelectedCourses((prev) =>
//       prev.includes(course_id)
//         ? prev.filter((id) => id !== course_id)
//         : [...prev, course_id]
//     );
//   };

//   const handleRemoveCourses = () => {
//     fetch('http://localhost:3001/remove_courses', {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ course_ids: selectedCourses }),
//     })
//       .then(() => {
//         setCourses((prev) => prev.filter((course) => !selectedCourses.includes(course.course_id)));
//         setSelectedCourses([]);
//         handleRemoveCourseModalClose();
//       })
//       .catch((error) => console.error('Error removing courses:', error));
//   };

//   const handleEditModeToggle = () => setEditMode((prev) => !prev);

//   const handleCourseEditChange = (course_id, field, value) => {
//     setCourses((prev) =>
//       prev.map((course) =>
//         course.course_id === course_id ? { ...course, [field]: value } : course
//       )
//     );
//   };

//   const handleCourseEditSave = (updatedCourse) => {
//     fetch(`http://localhost:3001/update_course`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedCourse),
//     })
//       .then((response) => response.json())
//       .then(() => {
//         setCourses((prev) =>
//           prev.map((course) =>
//             course.course_id === updatedCourse.course_id ? updatedCourse : course
//           )
//         );
//       })
//       .catch((error) => console.error('Error updating course:', error));
//   };

//   return (
//     <>
//       <Button onClick={handleAddCourseModalOpen}>Add Course</Button>
//       <Button onClick={handleRemoveCourseModalOpen} disabled={!selectedCourses.length}>Remove Selected Courses</Button>
//       <Button onClick={handleEditModeToggle}>{isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}</Button>

//       <Modal open={isAddCourseModalOpen} onClose={handleAddCourseModalClose} className='modalStyle'>
//         <Box sx={{ padding: 2, backgroundColor: 'white', margin: 'auto', marginTop: '10%', width: 400 }}>
//           <h2>Add Course</h2>
//           <TextField label="Course Number" name="course_number" value={newCourse.course_number} onChange={handleNewCourseChange} fullWidth required error={!!errors.courseNumber} helperText={errors.courseNumber} />
//           <TextField label="Course Name" name="course_name" value={newCourse.course_name} onChange={handleNewCourseChange} fullWidth required error={!!errors.courseName} helperText={errors.courseName}/>
          
//           <FormControlLabel
//           control={<Checkbox name="isflagship" checked={newCourse.isflagship === 'Y'} onChange={handleFlagshipChange} />}
//           label="Flagship"
//         />

//         <Button onClick={handleOpenAddCloModal}>Add CLO</Button>
//         <Modal open={isAddCloModalOpen} onClose={handleCloseAddCloModal}>
//         <Box sx={{ padding: 2, backgroundColor: 'white', margin: 'auto', marginTop: '10%', width: 300 }}>
//           <h2>Add CLO</h2>
//           <TextField label="CLO" value={newClo} onChange={(e) => setNewClo(e.target.value)} fullWidth required error={!!errors.clos[0]} helperText={errors.clos[0]}/>
//           <Button onClick={handleAddClo}>Done</Button>
//           <Button onClick={handleCloseAddCloModal}>Cancel</Button>
//         </Box>
//       </Modal>
//       {clos.map((clo, index) => (
//   <div key={index} className="clo-section">
//     <TextField
//       label={`CLO ${index + 1}`}
//       value={clo.text}
//       onChange={(e) => {
//         const { value } = e.target;
//         setClos((prev) => {
//           const newClos = [...prev];
//           newClos[index].text = value;
//           newClos[index].cloname = 'CLO'+(index+1);
//           return newClos;
//         });
//       }}
//       fullWidth
//       margin="normal"
//       required
//       error={!!errors.clos[index]} helperText={errors.clos[index]}
//     />
//     <div className="so-checkboxes">
//       {['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((so) => (
//         <FormControlLabel
//           key={so}
//           control={
//             <Checkbox
//               name={so}
//               checked={clo.cloplo.includes(letterToNumber[so])}
//               onChange={(e) => handleSOChange(index, e)}
//               color="primary"
//             />
//           }
//           label={so.toUpperCase()}
//         />
//       ))}
//     </div>
//   </div>
// ))}

//         <br/>
//           <Button onClick={handleAddCourse}>Add</Button>
//           <Button onClick={handleAddCourseModalClose}>Cancel</Button>
//         </Box>
//       </Modal>

//       <Modal open={isRemoveCourseModalOpen} onClose={handleRemoveCourseModalClose}>
//         <Box sx={{ padding: 2, backgroundColor: 'white', margin: 'auto', marginTop: '10%', width: 400 }}>
//           <h2>Remove Selected Courses</h2>
//           <Button onClick={handleRemoveCourses}>Confirm</Button>
//           <Button onClick={handleRemoveCourseModalClose}>Cancel</Button>
//         </Box>
//       </Modal>

//       <hr />

//       <Root sx={{ width: 800, maxWidth: '100%' }}>
//         <table aria-label="custom pagination table" className='courseTable'>
//           <thead>
//             <tr>
//               <th className='first'>Select</th>
//               <th className='first'>Course #</th>
//               <th className='second'>Course Name</th>
//               <th className='third'>Flagship?</th>
//               {isEditMode && <th className='third'>Actions</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {(rowsPerPage > 0
//               ? courses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               : courses
//             ).map((row) => (
//               <tr key={row.course_id}>
//                 <td className='first'>
//                   <Checkbox checked={selectedCourses.includes(row.course_id)} onChange={() => handleCourseSelectionChange(row.course_id)} />
//                 </td>
//                 <td className='first' style={{ width: 120 }}>
//                   {isEditMode ? (
//                     <TextField fullWidth value={row.course_number} onChange={(e) => handleCourseEditChange(row.course_id, 'course_number', e.target.value)} />
//                   ) : (
//                     row.course_number
//                   )}
//                 </td>
//                 <td className='second' style={{ width: 200 }} align="right">
//                   {isEditMode ? (
//                     <TextField fullWidth value={row.course_name} onChange={(e) => handleCourseEditChange(row.course_id, 'course_name', e.target.value)} />
//                   ) : (
//                     row.course_name
//                   )}
//                 </td>
//                 <td className='third' style={{ width: 120 }} align="right">
//                   {isEditMode ? (
//                     <Checkbox checked={row.isflagship === 'Y' ? true : false} onChange={(e) => handleCourseEditChange(row.course_id, 'isflagship', e.target.checked)} />
//                   ) : (
//                     row.isflagship == 'Y' ? 'Yes' : 'No'
//                   )}
//                 </td>
//                 {isEditMode && (
//                   <td className='third'>
//                     <Button onClick={() => handleCourseEditSave(row)}>Save</Button>
//                   </td>
//                 )}
//               </tr>
//             ))}

//             {emptyRows > 0 && (
//               <tr style={{ height: 34 * emptyRows }}>
//                 <td colSpan={5} aria-hidden />
//               </tr>
//             )}
//           </tbody>
//           <tfoot>
//             <tr>
//               <CustomTablePagination
//                 rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
//                 colSpan={5}
//                 count={courses.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 slotProps={{
//                   select: {
//                     'aria-label': 'rows per page',
//                   },
//                   actions: {
//                     showFirstButton: true,
//                     showLastButton: true,
//                     slots: {
//                       firstPageIcon: FirstPageRoundedIcon,
//                       lastPageIcon: LastPageRoundedIcon,
//                       nextPageIcon: ChevronRightRoundedIcon,
//                       backPageIcon: ChevronLeftRoundedIcon,
//                     },
//                   },
//                 }}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//               />
//             </tr>
//           </tfoot>
//         </table>
//       </Root>
//     </>
//   );
// };

// export default Course;
