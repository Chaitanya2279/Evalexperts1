import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import * as React from 'react';
import User from './User';

function CustomTabPanelAdmin(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ height: '100%', overflowY: 'auto' }} // Add scrolling here
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanelAdmin.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Admin() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}> {/* Full viewport height */}
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: 200 }} // Adjust width as needed
      >
        <Tab label="Evaluation Data" {...a11yProps(0)} />
        <Tab label="Metric Data" {...a11yProps(1)} />
        <Tab label="Evaluation" {...a11yProps(2)} />
        <Tab label="Action Plan" {...a11yProps(3)} />
        <Tab label="Course Improvement Tools" {...a11yProps(4)} />
        <Tab label="Generate Car Summaries" {...a11yProps(5)} />
        <Tab label="Users" {...a11yProps(6)} />
      </Tabs>
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}> {/* Ensure container doesn't overflow */}
        <CustomTabPanelAdmin value={value} index={0}>
          Evaluation Data will be shown here based on the term
        </CustomTabPanelAdmin>
        <CustomTabPanelAdmin value={value} index={1}>
          Metric data will be shown here based on the term and also should be able to edit
        </CustomTabPanelAdmin>
        <CustomTabPanelAdmin value={value} index={2}>
          Evaluation
        </CustomTabPanelAdmin>
        <CustomTabPanelAdmin value={value} index={3}>
          Action plan data will be shown here and also should be able to edit
        </CustomTabPanelAdmin>
        <CustomTabPanelAdmin value={value} index={4}>
          Course improvement data will be shown here
        </CustomTabPanelAdmin>
        <CustomTabPanelAdmin value={value} index={5}>
          steps to generate a car summary for the whole term will be shown here
        </CustomTabPanelAdmin>
        <CustomTabPanelAdmin value={value} index={6}>
          <User />
        </CustomTabPanelAdmin>
      </Box>
    </Box>
  );
}
