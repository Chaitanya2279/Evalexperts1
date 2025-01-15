import React, { useEffect, useState } from 'react';

const Testing = () => {
    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);
    const [selectedAssignments, setSelectedAssignments] = useState(['', '', '']);
    const [selectedCLOs, setSelectedCLOs] = useState(['', '', '']);
    const [results, setResults] = useState([null, null, null]);
    const [cloOptions, setCloOptions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeCLOIndex, setActiveCLOIndex] = useState(null);
    const [tempSelectedCLO, setTempSelectedCLO] = useState('');

    const course_id = 22;
    const courseBody = { course_id };

    useEffect(() => {
        // Fetch CLO options from the server
        fetch('http://localhost:3001/clo/course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(courseBody)
        })
            .then(response => response.json())
            .then(data => setCloOptions(data))
            .catch(error => console.error('Error fetching CLO options:', error));
    }, []);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const csvData = e.target.result;
            const rows = csvData.split('\n').map(row => row.split(','));
            const headers = rows[0].slice(2, -3).map(header => header.split(' Points Grade')[0])
                .filter(header => !header.toLowerCase().includes('denominator'));
            setHeaders(headers);
            setData(rows.slice(1)); // Save the rest of the data
        };
        reader.readAsText(file);
    };

    const handleAssignmentChange = (index) => (event) => {
        const newSelectedAssignments = [...selectedAssignments];
        newSelectedAssignments[index] = event.target.value;
        setSelectedAssignments(newSelectedAssignments);
    };

    const calculateStatistics = () => {
        const newResults = selectedAssignments.map((selectedAssignment, i) => {
            if (!selectedAssignment || !data.length) return null;

            const assignmentIndex = headers.indexOf(selectedAssignment) + 2;
            const denominatorIndex = 6;

            let countAbove60 = 0;
            let count60to70 = 0;
            let count70to80 = 0;
            let count80to90 = 0;
            let count90to100 = 0;
            let sum = 0;
            let validRows = 0;

            data.forEach(row => {
                const assignmentValue = parseFloat(row[assignmentIndex]);
                const denominatorValue = parseFloat(row[denominatorIndex]);
                if (!isNaN(assignmentValue) && !isNaN(denominatorValue) && denominatorValue !== 0) {
                    const percentage = (assignmentValue / denominatorValue) * 300;
                    sum += percentage;
                    validRows++;

                    if (percentage >= 90) count90to100++;
                    else if (percentage >= 80) count80to90++;
                    else if (percentage >= 70) count70to80++;
                    else if (percentage >= 60) count60to70++;
                    if (percentage > 60) countAbove60++;
                }
            });

            const mean = validRows > 0 ? sum / validRows : 0;

            return {
                above60: (countAbove60 / validRows) * 100,
                count60to70: (count60to70 / validRows) * 100,
                count70to80: (count70to80 / validRows) * 100,
                count80to90: (count80to90 / validRows) * 100,
                count90to100: (count90to100 / validRows) * 100,
                mean,
                numberOfStudents: validRows,
            };
        });
        setResults(newResults);
    };

    const handleInputChange = (index, field) => (event) => {
        const newResults = [...results];
        newResults[index] = {
            ...newResults[index],
            [field]: parseFloat(event.target.value),
        };
        setResults(newResults);
    };

    const openCLOModal = (index) => {
        setActiveCLOIndex(index);
        setTempSelectedCLO(selectedCLOs[index]);
        setIsModalOpen(true);
    };

    const closeCLOModal = () => {
        setIsModalOpen(false);
    };

    const selectCLO = () => {
        const newSelectedCLOs = [...selectedCLOs];
        newSelectedCLOs[activeCLOIndex] = tempSelectedCLO;
        setSelectedCLOs(newSelectedCLOs);
        closeCLOModal();
    };

    return (
        <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
            <br /><br />
            {headers.length > 0 && (
                <>
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
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
                                        <button onClick={() => openCLOModal(index)}>
                                            {selectedCLOs[index] ? selectedCLOs[index] : 'Select CLO'}
                                        </button>
                                    </td>
                                    <td style={{ padding: '10px' }}>
                                        <select onChange={handleAssignmentChange(index)} value={selectedAssignments[index]}>
                                            <option value="">Choose an assignment</option>
                                            {headers.map((header, i) => (
                                                <option key={i} value={header}>
                                                    {header}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    {results[index] && (
                                        <>
                                            <td style={{ padding: '5px' }}>
                                                <input
                                                    type="number"
                                                    value={results[index].above60.toFixed(2)}
                                                    onChange={handleInputChange(index, 'above60')}
                                                    style={{ width: '100px' }}
                                                />
                                            </td>
                                            <td style={{ padding: '5px' }}>
                                                <input
                                                    type="number"
                                                    value={results[index].mean.toFixed(2)}
                                                    onChange={handleInputChange(index, 'mean')}
                                                    style={{ width: '100px' }}
                                                />
                                            </td>
                                            <td style={{ padding: '5px' }}>
                                                <input
                                                    type="number"
                                                    value={results[index].count60to70.toFixed(2)}
                                                    onChange={handleInputChange(index, 'count60to70')}
                                                    style={{ width: '100px' }}
                                                />
                                            </td>
                                            <td style={{ padding: '5px' }}>
                                                <input
                                                    type="number"
                                                    value={results[index].count70to80.toFixed(2)}
                                                    onChange={handleInputChange(index, 'count70to80')}
                                                    style={{ width: '100px' }}
                                                />
                                            </td>
                                            <td style={{ padding: '5px' }}>
                                                <input
                                                    type="number"
                                                    value={results[index].count80to90.toFixed(2)}
                                                    onChange={handleInputChange(index, 'count80to90')}
                                                    style={{ width: '100px' }}
                                                />
                                            </td>
                                            <td style={{ padding: '5px' }}>
                                                <input
                                                    type="number"
                                                    value={results[index].count90to100.toFixed(2)}
                                                    onChange={handleInputChange(index, 'count90to100')}
                                                    style={{ width: '100px' }}
                                                />
                                            </td>
                                            <td style={{ padding: '5px' }}>
                                                <input
                                                    type="number"
                                                    value={results[index].numberOfStudents}
                                                    onChange={handleInputChange(index, 'numberOfStudents')}
                                                    style={{ width: '100px' }}
                                                />
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={calculateStatistics}>Calculate</button>
                    <hr />
                    <div>
                        <div>
                            <label for='enrollmentNumber'>Enrollment Number:</label>
                            <input type='number' step={1} required />
                        </div>
                        <div>
                            <label for='withdrawals'>Number of Withdrawals</label>
                            <input type='number' step={1}required />
                        </div>
                        <div>
                            <label for='classgpa'>Class GPA:</label>
                            <input type='number' step={1} required />
                        </div>
                    </div>
                    <div>
                        <label for='learningBarriers'>Learning Barriers &amp; Problem Areas:</label>
                        <textarea rows={4} required></textarea>
                    </div>
                    <div>
                        <label for='modifications'>Needed Modifications for Enhanced Learning:</label>
                        <textarea rows={4} required></textarea>
                    </div>
                    <div>
                        <label for='notesActions'>Notes & Actions for Future Course Offering:</label>
                        <textarea rows={4} required></textarea>
                    </div>
                    <div>
                        <label for='innovationJourney'>Innovation Journey:</label>
                        <textarea rows={4} required></textarea>
                    </div>
                    <div>
                        <label for='result'>Result:</label>
                        <textarea rows={4} required></textarea>
                    </div>
                </>
            )}
            <CLOModal
                isOpen={isModalOpen}
                onClose={closeCLOModal}
                onSelectCLO={selectCLO}
                cloOptions={cloOptions}
                tempSelectedCLO={tempSelectedCLO}
                setTempSelectedCLO={setTempSelectedCLO}
            />
        </div>
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
                        <option key={index} value={clo.clo_name}>
                            {clo.clo_name} - {clo.clo_description}
                        </option>
                    ))}
                </select>
                <button onClick={onSelectCLO} style={{ marginRight: '10px' }}>Done</button>
                <button onClick={onClose}>Cancel</button>
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

export default Testing;
