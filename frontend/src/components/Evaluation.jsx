import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './Evaluation.css';

const Evaluation = ({ username, insId }) => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedTerm] = useState('2245'); // FOR SEMESTER IDENTIFICATION NUMBER
    const [message, setMessage] = useState('');
    const [submitEvalModal, setSubmitEvalModal] = useState(false);
    const [courseModals, setCourseModals] = useState({});
    const [headers, setHeaders] = useState([]);
    const [unfilteredHeaders, setUnfilteredHeaders] = useState([]);
    const [data, setData] = useState([]);
    const [selectedAssignments, setSelectedAssignments] = useState(['', '', '']);
    const [results, setResults] = useState([null, null, null]);
    const [cloOptions, setCloOptions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeCLOIndex, setActiveCLOIndex] = useState(null);
    const [tempSelectedCLO, setTempSelectedCLO] = useState('');
    const [selectedCLOs, setSelectedCLOs] = useState(['', '', '']);
    const [classGPA, setClassGPA] = useState(null);
    const [enrollmentNumber, setEnrollmentNumber] = useState(null);
    const [withdrawals, setWithdrawals] = useState(null);
    const [uploadError, setUploadError] = useState(''); // State to track errors during file upload
    const [learningBarriers, setLearningBarriers] = useState('');
    const [modifications, setModifications] = useState('');
    const [innovationJourney, setInnovationJourney] = useState('');
    const [notesActions, setNotesActions] = useState('');
    const [courseId, setCourseId] = useState('');
    const [courseNumber, setCourseNumber] = useState('');
    const [flagship, setFlagship] = useState(false);
    const [selectedCloIds, setSelectedCloIds] = useState(['', '', '']);

    const [evaldata, setEvalData] = useState({
        assignmentName: '',
        grades: [], // Array to hold the grade data
        // ... other state variables for GPA, enrollment, etc.
      });
      const [isManualEntry, setIsManualEntry] = useState(true); // True if manual entry mode
      const [isCsvEntry, setIsCsvEntry] = useState(true);
      const [customAssignment, setCustomAssignment] = useState('');



    useEffect(() => {
        const fetchCourses = async () => {
            console.log('Fetching courses for logged-in Instructor:', username);
            try {
                const response = await axios.get(`http://localhost:3001/api/faculty/${username}/courses?term=${selectedTerm}`);
                setCourses(response.data);
                console.log(response.data);
            } catch (error) {
                setMessage('Error fetching courses');
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [username, selectedTerm]);

    // useEffect(() => {
    //     const fetchTerm = async () => {
    //         try{
    //             const response = await axios.get(`http://localhost:3001/term`)
    //         }
    //     }
    // })

    const toggleSubmitEvalModal = () => setSubmitEvalModal(!submitEvalModal);

    const toggleCourseModal = (courseCode) => {
        setSelectedAssignments(['', '', '']);
        setMessage('');
        setHeaders([]);
        setUnfilteredHeaders([]);
        setData([]);
        setResults([null, null, null]);
        setCloOptions([]);
        setTempSelectedCLO('');
        setSelectedCLOs(['', '', '']);
        setClassGPA(null);
        setEnrollmentNumber(null);
        setWithdrawals(null);
        setUploadError('');
        setLearningBarriers('');
        setModifications('');
        setNotesActions('');
        setInnovationJourney('');
        setFlagship(false);
        setIsCsvEntry(true);
        setIsManualEntry(true);
        setCourseModals(prev => ({
            ...prev,
            [courseCode]: !prev[courseCode]
        }));
    
        const selected = courses.find(course => course.code === courseCode);
        setSelectedCourse(selected);
    
        const courseNumber = selected ? selected.code.substring(0, 8) : null;
        setCourseNumber(courseNumber);
        console.log(selected);
    
        fetch('http://localhost:3001/course/course_number', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ courseNumber })
        })
        .then(response => response.json())
        .then(courseData => {
            console.log(courseData);

            const newFlagship = courseData[0].isflagship == 'Y' ? true : false;
            const newCourseId = courseData[0].course_id;
            setCourseNumber(selected.code);
            setCourseId(newCourseId);
            setFlagship(newFlagship);
            console.log(flagship);
    
            return fetch('http://localhost:3001/clo/course', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ courseId: courseData[0].course_id })
            });
        })
        .then(response => response.json())
        .then(data => setCloOptions(data))
        .catch(error => console.error('Error fetching CLO options:', error));
    };

    const parseCSV = (rows) => {
        // Assuming rows is an array of arrays where each sub-array represents a row
        console.log(rows);
        const headers = rows[0]; // The first row should contain the headers
        
        // Find indices of the relevant columns
        const finalGradeNumeratorIndex = headers.indexOf('Calculated Final Grade Numerator');
        const finalGradeDenominatorIndex = headers.indexOf('Calculated Final Grade Denominator');
    
        if (finalGradeNumeratorIndex === -1 || finalGradeDenominatorIndex === -1) {
            console.error("Required headers not found in CSV.");
            return;
        }
    
        let totalGPA = 0;
        let enrollmentCount = 0;
    
        rows.slice(1).forEach(row => {
            const numerator = parseFloat(row[finalGradeNumeratorIndex]);
            const denominator = parseFloat(row[finalGradeDenominatorIndex]);
    
            if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
                totalGPA += numerator / denominator * 4;
                enrollmentCount++;
            }
        });
    
        console.log('Total GPA:', totalGPA);
        console.log('Enrollment Count:', enrollmentCount);
    
        const averageGPA = totalGPA / enrollmentCount;
        const roundedGPA = parseFloat(averageGPA.toFixed(2));
        setClassGPA(roundedGPA);
        setEnrollmentNumber(enrollmentCount);
        setWithdrawals(0);
    };
    


    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = (e) => {
            const csvData = e.target.result;
            const rows = csvData.split('\n').map(row => row.split(','));
    
            // Check if the required headers are present
            const headers = rows[0];
            const finalGradeNumeratorIndex = headers.indexOf('Calculated Final Grade Numerator');
            const finalGradeDenominatorIndex = headers.indexOf('Calculated Final Grade Denominator');
    
            if (finalGradeNumeratorIndex === -1 || finalGradeDenominatorIndex === -1) {
                // Set error message if required headers are missing
                setUploadError('Incorrect file. Please upload the correct gradebook for the course.');
                return;
            }
    
            // Clear any previous error messages if the file is valid
            setUploadError('');
    
            // Call the parseCSV function with the parsed rows
            parseCSV(rows);
    
            // Process headers for filtering and display purposes
            const processedHeaders = rows[0].slice(2, -3).map(header => {
                const cleanedHeader = header.split(' Points Grade')[0];
                return cleanedHeader;
            }).filter(header => !header.toLowerCase().includes('denominator') && !header.toLowerCase().includes('numerator'));
    
            const unfilteredHeaders = rows[0].slice(2, -3).map(header => {
                const parts = header.split(' Points Grade');
                const cleanedHeader = parts[0];
    
                // Extract MaxPoints from the header
                const maxPointsMatch = header.match(/MaxPoints:(\d+)/);
                const maxPoints = maxPointsMatch ? parseFloat(maxPointsMatch[1]) : 1;
    
                return { cleanedHeader, maxPoints };
            });
    
            setHeaders(processedHeaders);
            setUnfilteredHeaders(unfilteredHeaders);
            setData(rows.slice(1)); // Save the rest of the data
            setIsManualEntry(false);
        };
    
        reader.readAsText(file);
    };
    
    
    

    const handleAssignmentChange = (index) => (event) => {
        const value = event.target.value;
    
        if (isCsvEntry) {
            const newSelectedAssignments = [...selectedAssignments];
            newSelectedAssignments[index] = value; // Update only the selected row's assignment
            setSelectedAssignments(newSelectedAssignments);
        } else if (isManualEntry) {
            const newSelectedAssignments = [...selectedAssignments];
            newSelectedAssignments[index] = value; // Update for manual entry
            setSelectedAssignments(newSelectedAssignments);
            console.log(selectedAssignments);
        }
    };
    
    

    const handleCalculateClick = (index) => {
        calculateStatistics(selectedAssignments[index], index);
    };
    
    const calculateStatistics = (assignment, index) => {
        if (!assignment || !data.length) return;
    
        const assignmentIndex = unfilteredHeaders.findIndex(header => header.cleanedHeader === assignment);
        if (assignmentIndex === -1) return;
    
        const maxPoints = unfilteredHeaders[assignmentIndex].maxPoints;
        
        let countAbove60 = 0;
        let count60to70 = 0;
        let count70to80 = 0;
        let count80to90 = 0;
        let count90to100 = 0;
        let sum = 0;
        let validRows = 0;
    
        data.forEach(row => {
            const assignmentValue = parseFloat(row[assignmentIndex + 2]);
            if (!isNaN(assignmentValue) && maxPoints !== 0) {
                const percentage = (assignmentValue / maxPoints) * 100;
                sum += percentage;
                validRows++;
    
                if (percentage >= 90) count90to100++;
                else if (percentage >= 80) count80to90++;
                else if (percentage >= 70) count70to80++;
                else if (percentage >= 60) count60to70++;
                if (percentage > 60) countAbove60++;
            }
        });
    
        const mean = validRows > 0 ? (sum / validRows).toFixed(2) : 0;
    
        const newResult = {
            above60: ((countAbove60 / validRows) * 100).toFixed(2),
            count60to70: ((count60to70 / validRows) * 100).toFixed(2),
            count70to80: ((count70to80 / validRows) * 100).toFixed(2),
            count80to90: ((count80to90 / validRows) * 100).toFixed(2),
            count90to100: ((count90to100 / validRows) * 100).toFixed(2),
            mean,
            numberOfStudents: validRows,
        };
    
        // Update the specific result in the results array
        const updatedResults = [...results];
        updatedResults[index] = newResult;
        setResults(updatedResults);
        console.log(updatedResults);
    };
    
    

    const handleGradesInputChange = (index, field) => (event) => {
        const newResults = [...results];
        newResults[index] = {
            ...newResults[index],
            [field]: parseFloat(event.target.value),
        };
        setResults(newResults);
    };

    const handleInputChange = (field) => (event) => {
        const value = parseFloat(event.target.value);
            if (field === 'classGPA') {
                setClassGPA(value);
            } else if (field === 'enrollmentNumber') {
                setEnrollmentNumber(value);
            } else if (field === 'withdrawals') {
                setWithdrawals(value);
            }
    };

    const handleTextInputChange = (field) => (event) => {
        const value = event.target.value;

        if (field === 'modifications') {
            setModifications(value);
        } else if (field === 'learningBarriers') {
            setLearningBarriers(value);
        } else if (field === 'notesActions') {
            setNotesActions(value);
        } else if (field === 'innovationJourney') {
            setInnovationJourney(value);
        }

    }

    const openCLOModal = (index) => {
        setActiveCLOIndex(index);
        setTempSelectedCLO(selectedCLOs[index]);
        setIsModalOpen(true);
    };

    const closeCLOModal = () => {
        setIsModalOpen(false);
    };

    const selectCLO = () => {
        const [cloPart, valuePart] = tempSelectedCLO.split(',').map(part => part.trim());
    
        // Now you have 'CLO1' in cloPart and '70' in valuePart
        // console.log(cloPart); // Outputs: 'CLO1'
        // console.log(valuePart); // Outputs: '70'
    
        const newSelectedCLOs = [...selectedCLOs];
        newSelectedCLOs[activeCLOIndex] = cloPart; // Use only the CLO part
        setSelectedCLOs(newSelectedCLOs);
        const newSelectedCloIds = [...selectedCloIds];
        newSelectedCloIds[activeCLOIndex] = valuePart;
        setSelectedCloIds(newSelectedCloIds);
        
        // You can now use valuePart separately if needed
        closeCLOModal();
    };
    
    const backToManual = () => {
        setIsManualEntry(true);
        setIsCsvEntry(false);
        setResults([null, null, null]);
        setCustomAssignment('');
        setSelectedAssignments(['', '', '']);

        console.log(classGPA);
    }

    const backToCsv = () => {
        setIsCsvEntry(true);
        setIsManualEntry(false);
        setResults([null, null, null]);
        setCustomAssignment('');
        setSelectedAssignments(['', '', '']);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Handling form submission...');
    
        // Validate the form
        // if (!selectedCourse) {
        //     setMessage('Please select a course.');
        //     console.log('passed course validation');
        //     return;
        // }

        // Validate table fields

        if(flagship){
            for (let i = 0; i < results.length; i++) {
                if (!results[i]) {
                    setMessage(`Please calculate the statistics for assignment row ${i + 1}.`);
                    console.log('passed');
                    return;
                }
                for(let j = 0; j < Object.values(results[i]).length; j++){
                    if(Object.values(results[i])[j] > 100.00){
                        setMessage(`Please enter valid statistics for assignment row ${i + 1}.`);
                        return;
                    }
                }
        
                if (Object.values(results[i]).some(val => val === null || val === '')) {
                    setMessage(`Please complete all fields for ${i + 1}.`);
                    return;
                }

                if(selectedCloIds[i] === ''){
                    setMessage(`Please choose the CLOs for the assignment row ${i + 1}.`);
                    return;
                }
            }
        }
        if (!enrollmentNumber || enrollmentNumber <= 0) {
            setMessage('Enrollment number must be greater than 0.');
            return;
        } else if(enrollmentNumber > 100){
            setMessage('Enrollment number cannot exceed 100');
            return;
        }
        if (!classGPA || classGPA <= 0) {
            setMessage('Class GPA must be greater than 0.');
            return;
        } else if(classGPA > 4){
            setMessage('Class GPA must be less than 4.');
            return;
        }
        if (withdrawals === null || withdrawals < 0) {
            setMessage('Please provide a valid number of withdrawals.');
            return;
        } else if(withdrawals > enrollmentNumber) {
            setMessage('Withdrawals cannot be more than enrollment number');
            return;
        }
        if (!learningBarriers) {
            setLearningBarriers('N/A');
        }
        if (!modifications) {
            setModifications('N/A');
        }
        if (!notesActions) {
            setNotesActions('N/A');
        }
        if (!innovationJourney) {
            setInnovationJourney('N/A');
        }

        const classBody = { termId: 13, courseId: courseId, insId: insId, className: courseNumber }
        console.log(classBody);

        fetch('http://localhost:3001/class/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(classBody),
        })
        .then((response) => { return response.json()})
        .then((newClass) => {
            console.log(newClass);
            const carBody = { classId: newClass.class_id, enrollment: enrollmentNumber, withdrawal: withdrawals, classGPA: classGPA, learningBarriers: learningBarriers, modifications: modifications, notesActions: notesActions, innovationJourney: innovationJourney, course_result: 'N/A'};
            console.log(carBody);
            return fetch('http://localhost:3001/car/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(carBody),
            })
            .then((response) => {response.json()})
            .then((newCar) => {
                console.log(newCar);
                console.log(selectedCloIds);
                if(flagship){
                    const evalDataPromises = results.map((result, index) => {
                        const evaldataBody = { classId: newClass.class_id, cloId: selectedCloIds[index], course_assignment: selectedAssignments[index], percent_below_60: result['above60'], mean: result['mean'], between_60_70: result['count60to70'], between_70_80: result['count70to80'], between_80_90: result['count80to90'], between_90_100: result['count90to100'], num_students: result['numberOfStudents']}

                        console.log(evaldataBody);
                        return fetch('http://localhost:3001/evaldata/add', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(evaldataBody),
                        })
                        .then((response) => response.json())
                        .catch(error => console.error('Error inserting into evaldata:', error))
                    })
                    return Promise.all(evalDataPromises);
                }
            })
            .catch(error => console.error('Error inserting into car:', error))
        })
        .catch(error => console.error('Error inserting into class:', error));
    };
    
    

    return (
        <>
            <div id='eval'>
                <h3>Evaluation</h3>
                <hr />
            </div>
            <div className='evalButtons'>
                <Button color="danger" onClick={toggleSubmitEvalModal}>
                    Submit Evaluation
                </Button>
                <Modal isOpen={submitEvalModal} toggle={toggleSubmitEvalModal}>
                    <ModalHeader toggle={toggleSubmitEvalModal}>Submit Evaluation</ModalHeader>
                    <ModalBody>
                        <h2>Courses Information</h2>
                        <div>
                            {courses.length > 0 ? (
                                courses.map(course => (
                                    <div key={course.code}>
                                        <Button color="primary" onClick={() => toggleCourseModal(course.code)}>
                                            {course.code} - {course.name}
                                        </Button>
                                        <Modal isOpen={courseModals[course.code]} toggle={() => toggleCourseModal(course.code)} className='modal-lg-custom'>
                                        <form onSubmit={handleSubmit}>
                                            <ModalHeader toggle={() => toggleCourseModal(course.code)}>
                                                {course.code} - {course.name}
                                            </ModalHeader>
                                            <ModalBody className='modal-body-custom'>
                                            {flagship && (
                                                <div>
                                                    <input type="file" accept=".csv" onChange={handleFileUpload} />
                                                    {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>} {/* Display error message if present */}

                                                    <table style={{ borderCollapse: 'collapse', width: '100%' }} className='custom-table'>
                                                        <thead>
                                                            <tr>
                                                                <th style={{ textAlign: 'center', padding: '10px', minWidth: '100px' }}>CLO#</th>
                                                                <th style={{ textAlign: 'center', padding: '10px', minWidth: '100px' }}>Course Assignment</th>
                                                                <th style={{ textAlign: 'left', padding: '10px', minWidth: '100px' }}>Percent&gt;60%</th>
                                                                <th style={{ textAlign: 'center', padding: '10px', minWidth: '100px' }}>Mean</th>
                                                                <th style={{ textAlign: 'left', padding: '10px', minWidth: '120px' }}>60&lt;Grade&lt;70</th>
                                                                <th style={{ textAlign: 'left', padding: '10px', minWidth: '120px' }}>70&lt;Grade&lt;80</th>
                                                                <th style={{ textAlign: 'left', padding: '10px', minWidth: '120px' }}>80&lt;Grade&lt;90</th>
                                                                <th style={{ textAlign: 'left', padding: '10px', minWidth: '120px' }}>90&lt;Grade&lt;100</th>
                                                                <th style={{ textAlign: 'center', padding: '10px', minWidth: '100px' }}>Number of Students</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {[0, 1, 2].map(index => (
                                                                <tr key={index}>
                                                                    <td style={{ padding: '10px' }}>
                                                                        <button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            openCLOModal(index);
                                                                        }}>
                                                                            {selectedCLOs[index] ? selectedCLOs[index] : 'Select CLO'}
                                                                        </button>
                                                                    </td>
                                                                    <td style={{ padding: '10px' }}>
                                                                        {isManualEntry ? (
                                                                            <>
                                                                                <input
                                                                                    type='text'
                                                                                    value={selectedAssignments[index]}
                                                                                    onChange={handleAssignmentChange(index)}
                                                                                />
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <select value={selectedAssignments[index]} onChange={handleAssignmentChange(index)}>
                                                                                    <option value="">Select Assignment</option>
                                                                                    {headers.map((header, i) => (
                                                                                        <option key={i} value={header}>
                                                                                            {header}
                                                                                        </option>
                                                                                    ))}
                                                                                    <option value="other">Other</option>
                                                                                </select>
                                                                                {selectedAssignments[index] === 'other' && (
                                                                                    <input 
                                                                                        type='text'
                                                                                        value={customAssignment}
                                                                                        onChange={(e) => setCustomAssignment(e.target.value)}
                                                                                    />
                                                                                )}
                                                                                {selectedAssignments[index] !== 'other' && (
                                                                                    <button onClick={(e) => {
                                                                                        e.preventDefault();
                                                                                        handleCalculateClick(index);
                                                                                    }} disabled={!selectedAssignments[index]}>
                                                                                        Calculate
                                                                                    </button>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </td>
                                                                    {['above60', 'mean', 'count60to70', 'count70to80', 'count80to90', 'count90to100', 'numberOfStudents'].map((field, colIndex) => (
                                                                        <td key={colIndex} style={{ textAlign: 'center', padding: '10px' }}>
                                                                            <input
                                                                                type="number"
                                                                                step="0.01"
                                                                                value={
                                                                                    results[index]?.[field] !== undefined
                                                                                        ? results[index][field]
                                                                                        : ''
                                                                                }
                                                                                onChange={(e) => {
                                                                                    let value = parseFloat(e.target.value);
                                                                                    // Enforce the limit of 100 except for "numberOfStudents"
                                                                                    if (field !== 'numberOfStudents') {
                                                                                        value = Math.min(value, 100);
                                                                                    }
                                                                                    handleGradesInputChange(index, field)(e, value);
                                                                                }}
                                                                                onBlur={(e) => {
                                                                                    let value = parseFloat(e.target.value);
                                                                                    if (!isNaN(value)) {
                                                                                        // Format the value to two decimal places on blur
                                                                                        value = parseFloat(value.toFixed(2));
                                                                                        handleGradesInputChange(index, field)(e, value);
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </td>
                                                                    ))}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    {!isManualEntry && (
                                                        <div>
                                                            <button onClick={(e) => {
                                                                e.preventDefault();
                                                                backToManual();
                                                            }}>Back to Manual Mode</button>
                                                        </div>
                                                    )}
                                                    {!isCsvEntry && (
                                                        <button onClick={(e) => {
                                                            e.preventDefault();
                                                            backToCsv();
                                                        }}>Back to CSV Mode</button>
                                                    )}
                                                </div>
                                            )}

                    <div>
                        <div>
                            <label for='enrollmentNumber'>Enrollment Number:</label>
                            <input type='number' step={1} value={isCsvEntry ? enrollmentNumber : ''} onChange={handleInputChange('enrollmentNumber')} required />
                        </div>
                        <div>
                            <label for='withdrawals'>Number of Withdrawals</label>
                            <input type='number' step={1} value={withdrawals !== null ? withdrawals : ''} onChange={handleInputChange('withdrawals')} required />
                        </div>
                        <div>
                            <label for='classgpa'>Class GPA:</label>
                            <input type='number' step={0.01} value={isCsvEntry ? classGPA : ''} onChange={handleInputChange('classGPA')} required />
                        </div>
                    </div>
                    <div>
                        <label for='learningBarriers'>Learning Barriers &amp; Problem Areas:</label>
                        <textarea rows={4} value={learningBarriers !== null ? learningBarriers : ''} onChange={handleTextInputChange('learningBarriers')}></textarea>
                    </div>
                    <div>
                        <label for='modifications'>Needed Modifications for Enhanced Learning:</label>
                        <textarea rows={4} value={modifications !== null ? modifications : ''} onChange={handleTextInputChange('modifications')}></textarea>
                    </div>
                    <div>
                        <label for='notesActions'>Notes & Actions for Future Course Offering:</label>
                        <textarea rows={4} value={notesActions !== null ? notesActions : ''} onChange={handleTextInputChange('notesActions')}></textarea>
                    </div>
                    <div>
                        <label for='innovationJourney'>Innovation Journey:</label>
                        <textarea rows={4} value={innovationJourney !== null ? innovationJourney : ''} onChange={handleTextInputChange('innovationJourney')}></textarea>
                    </div>
                <CLOModal
                isOpen={isModalOpen}
                onClose={closeCLOModal}
                onSelectCLO={selectCLO}
                cloOptions={cloOptions}
                tempSelectedCLO={tempSelectedCLO}
                setTempSelectedCLO={setTempSelectedCLO}
            />
                                            </ModalBody>
                                            <ModalFooter>
                                            {message && <p>{message}</p>}
                                                <Button color="secondary" onClick={(e) => {
                                                    e.preventDefault();
                                                    toggleCourseModal(course.code);
                                                }}>
                                                    Close
                                                </Button>
                                                <Button type="submit" color="primary">
                                                    Submit
                                                </Button>
                                            </ModalFooter>
                                            </form>
                                        </Modal>
                                    </div>
                                ))
                            ) : (
                                <p>Fetching Courses Information ...</p>
                            )}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggleSubmitEvalModal}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
};


const CLOModal = ({ isOpen, onClose, onSelectCLO, cloOptions, tempSelectedCLO, setTempSelectedCLO }) => {
    if (!isOpen) return null;

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <h2>Select CLO</h2>
                <select
                    value={tempSelectedCLO}
                    onChange={(e) => setTempSelectedCLO(e.target.value)}
                    style={{ width: '100%', marginBottom: '20px' }}
                >
                    <option value="">Choose a CLO</option>
                    {cloOptions.map((clo, index) => (
                        <option key={index} value={clo.clo_name+','+clo.clo_id}>
                            {clo.clo_name} - {clo.clo_description}
                        </option>
                    ))}
                </select>
                <button onClick={(e) => {
                    e.preventDefault();
                    onSelectCLO();
                }} style={{ marginRight: '10px' }}>Done</button>
                <button onClick={(e) => {
                    e.preventDefault();
                    onClose();
                }}>Cancel</button>
            </div>
        </div>
    );
};

const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
        textAlign: 'center'
    },
};

export default Evaluation;
