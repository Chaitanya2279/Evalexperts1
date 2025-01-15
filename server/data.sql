create table if not exists peo (
	peo_id SERIAL PRIMARY KEY,
	peo_name VARCHAR(50) NOT NULL,
	description VARCHAR(255) NOT NULL
);

INSERT INTO peo (peo_name, description)
VALUES 
('Employability', 'Graduates will be employable in cyber security and cyber forensics professional positions in botht the private and public sectors.'),
('Lifelong Learners', 'Graduates will have appropriate foundational skills to become lifelong learners within their field.'),
('Teamwork', 'Graduates will be prepared to work as team members and to adopt leadership positions as necessary.'),
('Academic Advancement & Contribution', 'Graduates will be prepared for further academic study and will be able to make contributions to the academic disciplines of cyber security and cyber forensics.');

create table if not exists slo (
	slo_id SERIAL PRIMARY KEY,
	slo_letter VARCHAR(1) NOT NULL,
	slo_name VARCHAR(50) NOT NULL,
	slo_description VARCHAR(255) NOT NULL
);

INSERT INTO slo (slo_letter, slo_name, slo_description)
VALUES
('a', 'Problem Solving', 'Analyze a complex cybersecurity problem and apply the theory and principles of cybersecurity.'),
('b', 'System Design', 'Develop software to help solve cybersecurity problems and demonstrate fluency in the development process.'),
('c', 'Communication', 'Write clear technical documents and make effective oral presentations.'),
('d', 'Professional Responsibility & Ethics', 'Assess the ethical considerations that arise in the cybersecurity field.'),
('e', 'Teamwork', 'Work effectively in teams to accomplish a goal'),
('f', 'Secure Systems', 'Apply advanced knowledge of a selected area within the cybersecurity discipline.'),
('g', 'Ethical Security', 'Design solutions that demonstrate understanding of adversarial thinking, threats, and vulnerabilities, and developing defensive strategies.');

create table if not exists peo_slo (
	peo_slo_id SERIAL PRIMARY KEY,
	slo_id INT NOT NULL,
	peo_id INT NOT NULL,
	FOREIGN KEY (slo_id) REFERENCES slo (slo_id),
	FOREIGN KEY (peo_id) REFERENCES peo (peo_id)
);

INSERT INTO peo_slo (slo_id, peo_id)
VALUES
(1, 4),
(2, 1),
(3, 1),
(4, 2),
(5, 3),
(6, 4),
(7, 2);

create table if not exists qfe_map (
	qfe_id SERIAL PRIMARY KEY, 
	strand_number INT NOT NULL, 
	short_name VARCHAR(50) NOT NULL, 
	description VARCHAR(400) NOT NULL, 
	peo_slo_id INT NOT NULL,
	FOREIGN KEY (peo_slo_id) REFERENCES peo_slo (peo_slo_id)
);

INSERT INTO qfe_map (strand_number, short_name, description, peo_slo_id)
VALUES
(1, 'Knowledge', 'Specialized factual and theoretical knowledge and an understanding of the boundaries in a field of work or discipline, encompassing a broad and coherent body of knowledge and concepts, with substantive depth in the underlying principles and theoretical concepts.', 2),
(1, 'Knowledge', 'An understanding of allied knowledge and theories in related fields of work or disciplines and in the case of professional disciplines including related regulations, standards, codes, conventions', 4),
(1, 'Knowledge', 'Understanding of critical approach to the creation and compilation of a systematic and coherent body of knowledge and concepts gained from a range of sources', 6),
(1, 'Knowledge', 'A comprehensive understanding of critical analysis, research systems and methods and evaluative problem-solving techniques', 1),
(1, 'Knowledge', 'Familiarity with sources of current and new research and knowledge with integration of concepts from outside fields', 6);

INSERT INTO qfe_map (strand_number, short_name, description, peo_slo_id)
VALUES
(2, 'Skill', 'Technical, creative and analytical skills appropriate to solving specialized problems using evidentiary and procedural based processes in predictable and new contexts that include devising and sustaining arguments associated with a field of work or discipline', 1),
(2, 'Skill', 'Evaluating, selecting and applying appropriate methods, procedures or techniques in processes of investigation towards identified solutions evaluating and implementing appropriate research tools and strategies associated with the field of work or discipline', 2),
(2, 'Skill', 'Highly developed advanced communication and information technology skills to present, explain and/or critique complex and unpredictable matters', 3);


INSERT INTO qfe_map (strand_number, short_name, description, peo_slo_id)
VALUES
(3, 'Autonomy and Responsibility', 'Can take responsibility for developing innovative and advanced approaches to evaluating and managing complex and unpredictable work procedures and processes, resources or learning', 4),
(3, 'Autonomy and Responsibility', 'Can manage technical, supervisory or design processes in unpredictable, unfamiliar and varying contexts', 3),
(3, 'Autonomy and Responsibility', 'Can work creatively and/or effectively as an individual, in team leadership, managing contexts, across technical or professional activities', 5),
(3, 'Autonomy and Responsibility', 'Can express an internalized, personal view, and accept responsibility to society at large and to socio-cultural norms and relationships', 3);

INSERT INTO qfe_map (strand_number, short_name, description, peo_slo_id)
VALUES
(4, 'Role in context', 'Can function with full autonomy in technical and supervisory contexts and adopt para-professional roles with little guidance', 6),
(4, 'Role in context', 'Can take responsibility for the setting and achievement of group or individual outcomes and for the management and supervision of the work of others or self in the case of a specialization in field of work or discipline', 4),
(4, 'Role in context', 'Can participate in peer relationships with qualified practitioners and lead multiple, complex groups', 5),
(4, 'Role in context', 'Can take responsibility for managing the professional development and direct mentoring of individuals and groups', 5);

INSERT INTO qfe_map (strand_number, short_name, description, peo_slo_id)
VALUES
(5, 'Self-development', 'Can self-evaluate and take responsibility for contributing to professional practice, and undertake regular professional development and/ or further learning can manage learning', 4),
(5, 'Self-development', 'Can manage learning tasks independently and professionally, in complex and sometimes unfamiliar learning contexts', 1),
(5, 'Self-development', 'Can contribute to and observe ethical standard', 6);

create table if not exists course (
	course_id SERIAL PRIMARY KEY,
	course_number VARCHAR(10) NOT NULL,
	course_name VARCHAR(100) NOT NULL,
	isFlagship VARCHAR(1) NOT NULL DEFAULT 'N',
	discontinued VARCHAR(1) NOT NULL DEFAULT 'N'
);

INSERT INTO course (course_number, course_name, isflagship, discontinued)
VALUES
('CSCI-455', 'Principles of Computer Security', 'N', 'N'),
('CSCI-462', 'Introduction to Cryptography', 'Y', 'N'),
('CSEC-140', 'Introduction to Cybersecurity', 'Y', 'N'),
('CSEC-201','Programming for Information Security', 'Y', 'N'),
('CSEC-202', 'Reverse Engineering Fundamentals', 'Y', 'N'),
('CSEC-310', 'Endpoint Security Engineering', 'N', 'N'),
('CSEC-380', 'Principles of Web Application Security', 'N', 'N'),
('CSEC-461', 'Computer System Security', 'Y', 'N'),
('CSEC-462', 'Network Security and Forensics', 'Y', 'N'),
('CSEC-463', 'Sensor Network Security', 'N', 'N'),
('CSEC-464', 'Computer System Forensics', 'N', 'N'),
('CSEC-465', 'Network & System Security Audit', 'N', 'N'),
('CSEC-468', 'Risk Management for Information Security', 'Y', 'N'),
('CSEC-469', 'Wireless Security', 'N', 'N'),
('CSEC-470', 'Covert Communications', 'N', 'N'),
('CSEC-471', 'Penetration Testing Frameworks & Methodologies', 'Y', 'N'),
('CSEC-472', 'Authentication & Security Models', 'N', 'N'),
('CSEC-473', 'Cyber Defense Techniques', 'N', 'N'),
('CSEC-490', 'Capstone in Computing Security', 'Y', 'N'),
('CSEC-520', 'Cyber Analytics and Machine Learning', 'N', 'N'),
('GCIS-123', 'Software Development and Problem Solving I', 'Y', 'N'),
('GCIS-124', 'Software Development and Problem Solving II', 'Y', 'N'),
('ISTE-230', 'Introduction to Database and Data Modelling', 'Y', 'N'),
('NSSA-221', 'System Administration I', 'Y', 'N'),
('NSSA-241', 'Introduction to Routing and Switching', 'N', 'N'),
('NSSA-245', 'Network Services', 'Y', 'N'),
('PUBL-363', 'Cyber Security Policy and Law', 'Y', 'N'),
('CSCI-141', 'Computer Science I', 'Y', 'Y'),
('CSCI-142', 'Computer Science II', 'Y', 'Y'),
('CSEC-101', 'Fundamentals of Computer Security', 'Y', 'Y');


create table if not exists clo (
	clo_id SERIAL PRIMARY KEY,
	course_id INT NOT NULL,
	clo_description VARCHAR(255) NOT NULL,
	clo_name VARCHAR(5) NOT NULL,
	FOREIGN KEY (course_id) REFERENCES course (course_id)
);

INSERT INTO clo (course_id, clo_descriptIon, clo_name)
VALUES
(2, 'Implement and cryptanalyze classical ciphers.', 'CLO1'),
(2, 'Describe modern private-key cryptosystems and ways to cryptanalyze them.', 'CLO2'),
(2, 'Describe modern public-key cryptosystems and ways to cryptanalyze them.', 'CLO3'),
(2, 'Explain the mathematical concepts underlying modern cryptography.', 'CLO4'),
(2, 'Describe the field of cryptography and its relation to security.', 'CLO5'),
(3, 'Apply principles of cybersecurity to analyze the risk associated with many information system types and provide broad recommendations for how to improve security.', 'CLO1'),
(3, 'Discuss the application of basic cryptographic concepts to securing authentication mechanisms, data at rest, and data in transit.', 'CLO2'),
(3, 'Identify non-technical elements that could impact the security of an organization or system.', 'CLO3'),
(3, 'Discuss ethical issues involved in cybersecurity and the impact of cybersecurity on society.', 'CLO4'),
(4, 'Design and implement a protocol programing using sockets in multiple languages.', 'CLO1'),
(4, 'Classify sections and explain how memory can and should be managed programmatically.', 'CLO2'),
(4, 'Describe the compilation process and how high-level code is translated into low-level code.', 'CLO3'),
(4, 'Implement basic programs in a low-level programming language such as x86 assembly.', 'CLO4'),
(4, 'Explain how memory corruption vulnerabilities can be exploited and be able to implement basic memory corruption exploits.', 'CLO5'),
(5, 'Analyze code written in and write code using a variety of low-level programming languages.', 'CLO1'),
(5, 'Identify high-level programming structures in low-level code.', 'CLO2'),
(5, 'Use debuggers to trace code execution and analyze the behavior of unknown executables.', 'CLO3'),
(6, 'Identify threat actor behaviors, threats, vulnerabilities, and discuss defensive strategies.', 'CLO1'),
(6, 'Implement host-based controls to protect hosts and detect incidents.', 'CLO2'),
(6, 'Build, administer, monitor, and defend a computing infrastructure.', 'CLO3'),
(6, 'Assess ethical considerations that arise in the computing security field.', 'CLO4'),
(6, 'Take part effectively in teams to accomplish a goal.', 'CLO5'),
(6, 'Write clear technical documentation, and make effective oral presentations.', 'CLO6'),
(7, 'Explain foundations and history of Web Application Security', 'CLO1'),
(7, 'Demonstrate familiarity with common web application security tools', 'CLO2'),
(7, 'Identify security controls for web application vulnerabilities', 'CLO3'),
(7, 'Demonstrate common vulnerabilities and their remediation methods', 'CLO4'),
(7, 'Analyze current and future defenses and deployment models in terms of their effectiveness and appropriateness', 'CLO5'),
(8, 'Recognize and discuss the phases and progression of a typical attack', 'CLO1'),
(8, 'Recognize and discuss the typical phases that defenders experience', 'CLO2'),
(8, 'Describe common characteristics of vulnerabilities and exploits', 'CLO3'),
(8, 'Describe and discuss various tools and techniques used to defend and attack systems', 'CLO4'),
(9, 'Recognize and discuss network architecture issues affecting security', 'CLO1'),
(9, 'Employ various tools to assess and address network security issues', 'CLO2'),
(9, 'Describe the attributes associated with network security intrusion and discuss techniques for tracking/stopping intruders', 'CLO3'),
(9, 'Describe various network monitoring solutions and issues', 'CLO4'),
(10, 'Synthesize the fundamental networking techniques of wireless sensor networks.', 'CLO1'),
(10, 'Describe various sensor security issues, identify threats, and determine the impact of these threats.', 'CLO2'),
(10, 'Analyze the performance of the link layer security framework for sensor networks.', 'CLO3'),
(10, 'Formulate a research plan based on the identified research topics.', 'CLO4'),
(10, 'Conduct literature search based on the identified research topics.', 'CLO5'),
(10, 'Develop the ability to present their research findings to the class.', 'CLO6'),
(10, 'Develop the ability to write a comprehensive report/paper in a conference paper format based on their research findings.', 'CLO7'),
(11, 'Describe court admissibility of system forensics processes and procedures', 'CLO1'),
(11, 'Describe the basic procedures for incident response.', 'CLO2'),
(11, 'Explain the attributes of various file systems and file recovery processes', 'CLO3'),
(11, 'Obtain the basic skills to uncover hidden evidence such as deleted files, hidden files, cryptographic steganography, etc.', 'CLO4'),
(11, 'Utilize available forensic tools to discover, collect, preserve, analyze, document and report digital evidence.', 'CLO5'),
(12, 'Explain the fundamental techniques, processes and procedures of networks and systems audit.', 'CLO1'),
(12, 'Describe the basic design and configuration of routers, firewalls and Intrusion Detection Systems (IDS).', 'CLO2'),
(12, 'Identify and apply appropriate tools to perform systems (Unix/Windows) and network infrastructure components audit.', 'CLO3'),
(12, 'Utilize available tools to conduct vulnerability and validation testing.', 'CLO4'),
(12, 'Write and present an auditing report on security vulnerability.', 'CLO5'),
(13, 'Explain the fundamental principles of risk management and its key elements', 'CLO1'),
(13, 'Identify information security threats. Determine the risk level, define controls, and safeguards', 'CLO2'),
(13, 'Conduct cost-benefit analysis and business impact analysis', 'CLO3'),
(13, 'Design relevant security metrics', 'CLO4'),
(13, 'Apply qualitative and quantitative assessment techniques', 'CLO5'),
(13, 'Compose a complete risk assessment report', 'CLO6'),
(13, 'Assess the effectiveness of deployed risk assessment plans', 'CLO7'),
(14, 'Present an overview of basic security tactics, threats and tools and the design of appropriate responses.', 'CLO1'),
(14, 'Outline and explain first generation wireless security and traditional wired security.', 'CLO2'),
(14, 'Explain and analyze the operation of various tunneling protocols, including but not limited to the following; PPTP, L2TP, and IPSec and encryption mechanisms at different layers of TCP/IP.', 'CLO3'),
(14, 'Explain and demonstrate the operation of port-based authentication (802.1x) and authentication services, including Radius and Extensible Authentication Protocol.', 'CLO4'),
(14, 'Evaluate the current and future wireless security mechanisms in terms of their effectiveness, maintenance and appropriateness', 'CLO5'),
(15, 'Recognize and discuss the potential for data exfiltration and covert communication that exist in modern computer systems', 'CLO1'),
(15, 'Describe the characteristics of various covert communications and enumerate their differences.', 'CLO2'),
(15, 'Examine the possible applications for covert communications and study specific implementations.', 'CLO3'),
(15, 'Work well in teams.', 'CLO4'),
(16, 'Develop a plan for a penetration test.', 'CLO1'),
(16, 'Conduct a simulated penetration test.', 'CLO2'),
(16, 'Analyze and communicate the results and implication of a penetration test.', 'CLO3'),
(16, 'Explain the purpose and value of penetration testing to an organization.', 'CLO4'),
(16, 'Discuss the ethics issues and concerns faced while conducting a penetration test.', 'CLO5'),
(17, 'Describe the theoretical principles and models at work in the design of access control and authentication systems.', 'CLO1'),
(17, 'Identify trust relationships involved in access control and authentication systems', 'CLO2'),
(17, 'Discuss how access control and authentication systems apply cryptography to solve IAAA problems.', 'CLO3'),
(17, 'Identify how modern operating systems integrate IAAA systems into their design and operations.', 'CLO4'),
(17, 'Perform a literature review and build an annotated bibliography', 'CLO5'),
(17, 'Write about the impact of current and evolving research on access control and authentication systems.', 'CLO6'),
(18, 'Identify, synthesize and discuss security concerns.', 'CLO1'),
(18, 'Compare and contrast alternative security models', 'CLO2'),
(18, 'Explain applicable mandates and policies.', 'CLO3'),
(18, 'Explain the integration of computer and network security with business operations.', 'CLO4'),
(19, 'Analyze security needs for real world applications', 'CLO1'),
(19, 'Devise security solutions for real world applications', 'CLO2'),
(19, 'Implement security solutions effectively in a team', 'CLO3'),
(19, 'Test security implementations for vulnerabilities and possible exploitations', 'CLO4'),
(19, 'Communicate effectively with user and upper management', 'CLO5'),
(20, 'Understand basic concepts and algorithms of ML', 'CLO1'),
(20, 'Apply appropriate ML algorithms to address computing security problems', 'CLO2'),
(20, 'Develop an original ML-based solution for a computing security problem', 'CLO3'),
(20, 'Analyze and evaluate existing ML solutions for computing security problems', 'CLO4'),
(21, 'Describe the basic constructs of a selected contemporary, high-level programming language.', 'CLO1'),
(21, 'Describe and apply problem-solving skills that are appropriate to solve a variety of computing problems of varying degrees of difficulty and complexity.', 'CLO2'),
(21, 'Describe and apply a variety of algorithms and data structures to implement solutions to a variety of computing problems of varying degrees of difficulty and complexity.', 'CLO3'),
(21, 'Describe and apply fundamental concepts of software engineering including understanding needs, software design, solution testing, and incremental development.', 'CLO4'),
(22, 'Describe the basic abstractions and constructs of a selected contemporary, object-oriented programming language.', 'CLO1'),
(22, 'Describe and apply problem-solving skills that are appropriate to solve a variety of computing problems of varying degrees of difficulty and complexity.', 'CLO2'),
(22, 'Describe and apply a variety of algorithms and data structures to implement solutions to a variety of computing problems of varying degrees of difficulty and complexity.', 'CLO3'),
(22, 'Apply fundamentals of software engineering including software design, testing, and incremental development.', 'CLO4'),
(23, 'Describe social, economic, and business contexts in which databases are created and in which their features are evaluated.', 'CLO1'),
(23, 'Use conventional techniques to describe a database.', 'CLO2'),
(23, 'Apply relational database theory to create a database that supports data integrity.', 'CLO3'),
(23, 'Demonstrate security practices for protecting personal and other sensitive information.', 'CLO4'),
(23, 'Demonstrate the ability to manipulate data using conventional techniques.', 'CLO5'),
(24, 'Identify and describe the roles and responsibilities of a Systems Administrator', 'CLO1'),
(24, 'Understand enterprise network security requirements', 'CLO2'),
(24, 'Develop System Administration skills according to standards in the field.', 'CLO3'),
(24, 'Understand basic network security concepts related to Systems Administration', 'CLO4'),
(24, 'Develop skills to write scripts to automate common System Administration tasks', 'CLO5'),
(25, 'Locate, synthesize, and discuss current RFC’s, IEEE standards, and other related standards, as well as describe the standards bodies and the standardization process as they apply to local area networking.', 'CLO1'),
(25, 'Compare and contrast the OSI and TCP/IP models as they apply to contemporary communication protocols with a focus on layers 1, 2, and 3.', 'CLO2'),
(25, 'Explain the specifications and integration of contemporary data network protocols.', 'CLO3'),
(25, 'Explain the basic operation and characteristics of internetworking devices such as hubs, bridges, switches, routers, gateways, and firewalls.', 'CLO4'),
(25, 'Be able to use and explain common network utilities for both the Windows and Linux operating systems.', 'CLO5'),
(26, 'Describe protocols and implementation strategies surrounding DHCP servers in Windows and Linux environments.', 'CLO1'),
(26, 'Describe protocols and implementation strategies surrounding DNS servers in both Windows and Linux environments.', 'CLO2'),
(26, 'Demonstrate knowledge of Voice over IP devices, protocols, and deployment strategies.', 'CLO3'),
(26, 'Explain the benefits of using the Secure Shell for remote administration.', 'CLO4'),
(26, 'Demonstrate the ability to analyze network traffic.', 'CLO5'),
(27, 'Compare laws and other policy measures that govern computer security threats and incidents in the US', 'CLO1'),
(27, 'Discuss relevant policies in other jurisdictions (e.g. in EU and UAE/GCC)', 'CLO2'),
(27, 'Explain how technical challenges in security can be influenced by the social, political, and legal landscapes', 'CLO3'),
(27, 'Relate that security failures are often due to market incentives rather than to the lack of suitable technical protection mechanisms', 'CLO4'),
(27, 'Demonstrate more about International Relations & Norms related to cybersecurity', 'CLO5'),
(28, '', 'CLO1'),
(28, '', 'CLO2'),
(29, '', 'CLO1'),
(29, '', 'CLO2'),
(30, '', 'CLO1'),
(30, '', 'CLO2'),
(30, '', 'CLO3'),
(30, '', 'CLO4');


create table if not exists assess_plan (
	assess_plan_id SERIAL PRIMARY KEY,
	slo_id INT NOT NULL,
	course_id INT NOT NULL,
	assess_letter VARCHAR(1),
	FOREIGN KEY (slo_id) REFERENCES slo (slo_id),
	FOREIGN KEY (course_id) REFERENCES course (course_id)
);

INSERT INTO assess_plan (slo_id, course_id, assess_letter)
VALUES
(2, 2, 'R'),
(3, 3, 'I'),
(5, 4, 'R'),
(1, 5, 'R'),
(6, 8, 'R'),
(7, 9, 'I'),
(4, 13, 'R'),
(7, 16, 'R'),
(1, 19, 'M'),
(2, 19, 'M'),
(3, 19, 'M'),
(4, 19, 'M'),
(5, 19, 'M'),
(6, 19, 'M'),
(7, 19, 'M'),
(1, 21, 'I'),
(5, 22, 'I'),
(3, 23, 'R'),
(6, 24, 'I'),
(2, 26, 'I'),
(5, 27, 'I'),
(1, 28, 'I'),
(5, 29, 'I'),
(3, 30, 'I');

create table if not exists term (
	term_id SERIAL PRIMARY KEY,
	term_name VARCHAR(30) NOT NULL,
	term_num INT
);

insert into term (term_name, term_num)
VALUES
('Fall 2018', 2181),
('Spring 2019', 2185),
('Fall 2019', 2191),
('Spring 2020', 2195),
('Fall 2020', 2201),
('Spring 2021', 2205),
('Fall 2021', 2211),
('Spring 2022', 2215),
('Fall 2022', 2221),
('Spring 2023', 2225),
('Fall 2023', 2231),
('Spring 2024', 2235),
('Fall 2024', 2241)
('Spring 2024', 2245);

create table if not exists instructor (
	ins_id SERIAL PRIMARY KEY,
	ins_name VARCHAR(50) NOT NULL,
	username VARCHAR(30) NOT NULL,
	is_adjunct VARCHAR(1) NOT NULL DEFAULT 'N',
	is_admin VARCHAR(1) NOT NULL DEFAULT 'N',
	has_left VARCHAR(1) NOT NULL DEFAULT 'N'
);

INSERT INTO instructor (ins_name, username, is_adjunct, is_admin, has_left)
VALUES
('Jordan Aburumman', 'afacad', 'Y', 'N', 'N'),
('Ali Assi', 'axacad5', 'N', 'N', 'N'),
('Charalampos Manifavas', 'cxmcad', 'N', 'N', 'N'),
('Danilo Kovacevic', 'dxkcad1', 'Y', 'N', 'N'),
('Emad Abukhousa', 'eakcad', 'Y', 'N', 'N'),
('Ehsan Warriach', 'euwcad', 'N', 'N', 'N'),
('Fahed Jubair', 'fxjcad', 'Y', 'N', 'N'),
('Huda Saadeh', 'hkscad', 'N', 'N', 'N'),
('Khalil Al Hussaeni', 'kxacad', 'N', 'N', 'N'),
('Kevser Ovaz Akpinar', 'kxocad1', 'N', 'Y', 'N'),
('Marwan Al-Tawil', 'maacad', 'Y', 'N', 'N'),
('Mehtab Khurshid', 'makcad1', 'Y', 'N', 'N'),
('Muhammed Haseeb Jalalzai', 'mhjcad', 'Y', 'N', 'N'),
('Muawya Al Dalaien', 'mnacad', 'Y', 'N', 'N'),
('Mohammad Al Mohidat', 'mnacad1', 'Y', 'N', 'N'),
('Mohammed Qatawneh', 'msqcad', 'Y', 'N', 'N'),
('Muhieddin Amer', 'mxaeee', 'N', 'N', 'N'),
('Osama Abdulrahman', 'oaacad', 'Y', 'N', 'N'),
('Omar Abdul Latif', 'omacad', 'N', 'N', 'N'),
('Qusai Hasan', 'qxhcad', 'N', 'N', 'N'),
('Sufyan Almalaji', 'sxacad4', 'Y', 'N', 'N'),
('Wesam Almobaideen', 'wxacad', 'N', 'Y', 'N'),
('Sabry', 'na', 'Y', 'N', 'Y'),
('Ali Raza', 'axrcada', 'N', 'N', 'Y'),
('Mandy Northover', 'mxncad', 'N', 'N', 'Y'),
('Khalid Khawaja', 'kxkcad', 'N', 'N', 'N'),
('Samir El-Masri', 'sxecad', 'N', 'N', 'Y'),
('Ioannis', 'ixkcad1', 'N', 'N', 'N'),
('Hajer Ben Othman', 'hxbcad', 'Y', 'N', 'Y'),
('Shernaz', 's.baddar@ju.edu.jo', 'Y', 'N', 'N');

create table if not exists class (
	class_id SERIAL PRIMARY KEY,
	term_id INT NOT NULL,
	course_id INT NOT NULL,
	ins_id INT NOT NULL,
	class_name VARCHAR(20) NOT NULL,
	FOREIGN KEY (term_id) REFERENCES term (term_id),
	FOREIGN KEY (course_id) REFERENCES course (course_id),
	FOREIGN KEY (ins_id) REFERENCES instructor (ins_id)
);

insert into class (term_id, course_id, ins_id, class_name)
VALUES
(1, 28, 19, 'CSCI 141'),
(1, 26, 22, 'NSSA 245'),
(1, 30, 9, 'CSEC 101'),
(2, 13, 9, 'CSEC 468'),
(2, 29, 19, 'CSCI 142'),
(2, 24, 2, 'NSSA 221'),
(1, 9, 22, 'CSEC 462'),
(3, 28, 19, 'CSCI 141'),
(4, 26, 2, 'NSSA 245'),
(4, 2, 22, 'CSCI 462'),
(4, 23, 23, 'ISTE 230'),
(4, 30, 9, 'CSEC 101'),
(4, 27, 22, 'PUBL 363'),
(4, 29, 19, 'CSCI 142'),
(3, 4, 9, 'CSEC 201'),
(3, 24, 24, 'NSSA 221'),
(4, 9, 22, 'CSEC 462'),
(3, 16, 22, 'CSEC 471'),
(5, 21, 19, 'GCIS 123.600'),
(5, 21, 19, 'GCIS 123.601'),
(5, 5, 22, 'CSEC 202'),
(6, 5, 22, 'CSEC 202'),
(6, 26, 2, 'NSSA 245'),
(6, 2, 22, 'CSCI 462'),
(6, 23, 9, 'ISTE 230'),
(5, 3, 3, 'CSEC 140'),
(6, 3, 9, 'CSEC 140'),
(6, 22, 19, 'GCIS 124.600'),
(6, 22, 19, 'GCIS 124.601'),
(5, 24, 2, 'NSSA 221'),
(5, 8, 22, 'CSEC 461'),
(6, 9, 22, 'CSEC 462'),
(8, 21, 8, 'GCIS 123.601'),
(8, 21, 25, 'GCIS 123.600'),
(7, 21, 26, 'GCIS 123.600'),
(7, 21, 10, 'GCIS 123.601'),
(7, 21, 8, 'GCIS 123.602'),
(7, 21, 27, 'GCIS 123.603'),
(7, 21, 27, 'GCIS 123.604'),
(8, 5, 22, 'CSEC 202'),
(8, 26, 28, 'NSSA 245'),
(7, 2, 22, 'CSCI 462'),
(8, 23, 9, 'ISTE 230'),
(7, 3, 10, 'CSEC 140.601'),
(8, 3, 10, 'CSEC 140'),
(7, 27, 22, 'PUBL 363'),
(7, 13, 9, 'CSEC 468'),
(8, 22, 7, 'GCIS 124'),
(8, 22, 25, 'GCIS 124'),
(8, 22, 10, 'GCIS 124.601'),
(8, 22, 10, 'GCIS 124.603'),
(7, 4, 8, 'CSEC 201'),
(7, 24, 2, 'NSSA 221'),
(7, 8, 22, 'CSEC 461'),
(8, 9, 10, 'CSEC 462'),
(7, 16, 10, 'CSEC 471'),
(9, 21, 10, 'GCIS 123.600'),
(9, 21, 29, 'GCIS 123.601'),
(9, 21, 29, 'GCIS 123.602'),
(9, 21, 19, 'GCIS 123.603'),
(9, 21, 19, 'GCIS 123.604'),
(9, 21, 29, 'GCIS 123.605'),
(10, 5, 22, 'CSEC 202.600'),
(10, 5, 22, 'CSEC 202.601'),
(10, 21, 10, 'GCIS 123.602'),
(10, 21, 29, 'GCIS 123.600'),
(10, 21, 29, 'GCIS 123.601'),
(9, 2, 22, 'CSCI 462'),
(10, 26, 2, 'NSSA 245.600'),
(10, 26, 2, 'NSSA 245.601'),
(10, 23, 11, 'ISTE 230.600'),
(10, 23, 11, 'ISTE 230.600'),
(9, 3, 10, 'CSEC 140.600'),
(9, 3, 10, 'CSEC 140.601'),
(9, 3, 21, 'CSEC 140.602'),
(10, 3, 10, 'CSEC 140'),
(9, 27, 22, 'PUBL 363'),
(9, 4, 8, 'CSEC 201.600'),
(9, 4, 8, 'CSEC 201.601'),
(10, 22, 19, 'GCIS 124.600'),
(10, 22, 30, 'GCIS 124.601'),
(10, 22, 29, 'GCIS 124.602'),
(10, 22, 29, 'GCIS 124.602'),
(10, 22, 8, 'GCIS 124.604'),
(9, 8, 22, 'CSEC 461.601'),
(9, 24, 2, 'NSSA 221.600'),
(9, 24, 2, 'NSSA 221.601'),
(10, 24, 2, 'NSSA 221.600'),
(10, 24, 2, 'NSSA 221.601'),
(10, 24, 2, 'NSSA 221.602'),
(10, 16, 10, 'CSEC 471'),
(10, 9, 10, 'CSEC 462'),
(11, 21, 2, 'GCIS 123.600'),
(11, 21, 10, 'GCIS 123.601'),
(11, 21, 12, 'GCIS 123.602'),
(11, 21, 12, 'GCIS 123.603'),
(11, 21, 2, 'GCIS 123.604'),
(11, 21, 19, 'GCIS 123.605'),
(11, 21, 2, 'GCIS 123.606'),
(11, 2, 22, 'CSCI 462.600'),
(11, 2, 22, 'CSCI 462.601'),
(11, 3, 10, 'CSEC 140.602'),
(11, 3, 20, 'CSEC 140.600'),
(11, 3, 20, 'CSEC 140.601'),
(11, 3, 20, 'CSEC 140.603'),
(11, 23, 11, 'ISTE 230.600'),
(11, 23, 11, 'ISTE 230.601'),
(11, 27, 22, 'PUBL 363.600'),
(11, 27, 22, 'PUBL 363.601'),
(11, 13, 3, 'CSEC 468.600'),
(11, 4, 8, 'CSEC 201.600'),
(11, 4, 8, 'CSEC 201.601'),
(11, 4, 8, 'CSEC 201.602'),
(11, 22, 12, 'GCIS 124.600'),
(11, 22, 12, 'GCIS 124.601'),
(11, 8, 10, 'CSEC 461.600'),
(11, 8, 10, 'CSEC 461.601'),
(11, 24, 19, 'NSSA 221.600'),
(11, 24, 19, 'NSSA 221.602'),
(11, 24, 16, 'NSSA 221.601'),
(11, 24, 16, 'NSSA 221.603'),
(3, 19, 22, 'CSEC 490'),
(4, 19, 22, 'CSEC 490'),
(5, 19, 22, 'CSEC 490'),
(6, 19, 22, 'CSEC 490'),
(7, 19, 22, 'CSEC 490'),
(8, 19, 22, 'CSEC 490'),
(7, 19, 10, 'CSEC 490'),
(8, 19, 24, 'CSEC 490'),
(9, 19, 18, 'CSEC 490'),
(10, 19, 18, 'CSEC 490'),
(11, 19,  18, 'CSEC 490');


ALTER TABLE instructor
ADD COLUMN password VARCHAR (225);
UPDATE instructor SET password = 'Jordan' WHERE username = 'afacad';
UPDATE instructor SET password = 'AliAssi' WHERE username = 'axacad5';
UPDATE instructor SET password = 'Charalampos' WHERE username = 'cxmcad';
UPDATE instructor SET password = 'Danilo' WHERE username = 'dxkcad1';
UPDATE instructor SET password = 'Emad' WHERE username = 'eakcad';
UPDATE instructor SET password = 'Ehsan' WHERE username = 'euwcad';
UPDATE instructor SET password = 'Fahed' WHERE username = 'fxjcad';
UPDATE instructor SET password = 'Huda' WHERE username = 'hkscad';
UPDATE instructor SET password = 'Khalil' WHERE username = 'kxacad';
UPDATE instructor SET password = 'Kevser' WHERE username = 'kxocad1';
UPDATE instructor SET password = 'Marwan' WHERE username = 'maacad';
UPDATE instructor SET password = 'Mehtab' WHERE username = 'makcad1';
UPDATE instructor SET password = 'Haseeb' WHERE username = 'mhjcad';
UPDATE instructor SET password = 'Muawya' WHERE username = 'mnacad';
UPDATE instructor SET password = 'Mohidat' WHERE username = 'mnacad1';
UPDATE instructor SET password = 'Qatawneh' WHERE username = 'msqcad';
UPDATE instructor SET password = 'Muhieddin' WHERE username = 'mxaeee';
UPDATE instructor SET password = 'Osama' WHERE username = 'oaacad';
UPDATE instructor SET password = 'Omar' WHERE username = 'omacad';
UPDATE instructor SET password = 'Qusai' WHERE username = 'qxhcad';
UPDATE instructor SET password = 'Sufyan' WHERE username = 'sxacad4';
UPDATE instructor SET password = 'Wesam' WHERE username = 'wxacad';
UPDATE instructor SET password = 'Sabry' WHERE username = 'na';
UPDATE instructor SET password = 'AliRaza' WHERE username = 'axrcada';
UPDATE instructor SET password = 'Mandy' WHERE username = 'mxncad';
UPDATE instructor SET password = 'Khalid' WHERE username = 'kxkcad';
UPDATE instructor SET password = 'Samir' WHERE username = 'sxecad';
UPDATE instructor SET password = 'Ioannis' WHERE username = 'ixkcad1';
UPDATE instructor SET password = 'Hajer' WHERE username = 'hxbcad';
UPDATE instructor SET password = 'Shernaz' WHERE username = 's.baddar@ju.edu.jo';

ALTER TABLE instructor ADD COLUMN is_first_login BOOLEAN DEFAULT FALSE;

