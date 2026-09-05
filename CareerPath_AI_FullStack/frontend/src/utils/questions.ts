export interface AptitudeQuestion {
  id: number;
  question: string;
  category: string;
  domain: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const q = (
  id: number,
  question: string,
  category: string,
  options: string[],
  correctIndex: number,
  explanation: string
): AptitudeQuestion => ({
  id, question, category, domain: 'Computer Science', options, correctIndex, explanation
});

export const APTITUDE_QUESTION_POOL: Record<string, AptitudeQuestion[]> = {
  'Software Development': [
    q(1,'Which data structure follows FIFO order?','Programming',['Stack','Queue','Tree','Graph'],1,'A queue removes the earliest inserted item first.'),
    q(2,'Which keyword declares a constant in modern JavaScript?','Programming',['var','let','const','static'],2,'const creates a binding that cannot be reassigned.'),
    q(3,'What is the average lookup complexity of a hash table?','Programming',['O(n²)','O(n)','O(log n)','O(1)'],3,'Hash tables provide average constant-time lookup with a good hash distribution.'),
    q(4,'Which concept allows a function to call itself?','Programming',['Inheritance','Recursion','Encapsulation','Compilation'],1,'A recursive function invokes itself with a smaller subproblem.'),
    q(5,'What does Big-O describe?','Algorithms',['UI quality','Time/space growth','Database size','Network bandwidth'],1,'Big-O describes how resource usage grows as input size increases.'),
    q(6,'Which Git command creates a local copy of a repository?','Developer Tools',['git push','git clone','git merge','git reset'],1,'git clone copies a remote repository to the local machine.'),
  ],
  'AI/ML': [
    q(7,'What is a feature in machine learning?','AI/ML',['A target label only','An input variable','A model error','A deployment server'],1,'A feature is an input variable used by a model to make predictions.'),
    q(8,'Which algorithm is commonly used for binary classification?','AI/ML',['Logistic Regression','K-Means only','Apriori only','DFS'],0,'Logistic regression is a standard binary classification method.'),
    q(9,'Why split data into training and test sets?','AI/ML',['To increase RAM','To evaluate generalization','To remove all features','To speed up the CPU'],1,'A held-out test set estimates performance on unseen data.'),
    q(10,'What does overfitting mean?','AI/ML',['Model learns noise too closely','Model has no parameters','Dataset is empty','Model always underperforms training data'],0,'An overfit model memorizes training patterns/noise and generalizes poorly.'),
    q(11,'Which library is widely used for numerical arrays in Python?','AI/ML',['NumPy','Express','React','Mongoose'],0,'NumPy provides efficient multidimensional numerical arrays.'),
    q(12,'What is the purpose of gradient descent?','AI/ML',['Optimize model parameters','Render a webpage','Create a database','Encrypt a password'],0,'Gradient descent iteratively updates parameters to reduce a loss function.'),
  ],
  'Data Science': [
    q(13,'Which Pandas structure is two-dimensional?','Data Science',['Series','DataFrame','Tuple','Set'],1,'A DataFrame is a two-dimensional labeled table.'),
    q(14,'Which measure is robust to extreme outliers?','Data Science',['Mean','Median','Variance','Range'],1,'The median is less affected by extreme values than the mean.'),
    q(15,'What does SQL GROUP BY do?','Data Science',['Groups rows for aggregation','Deletes rows','Creates a server','Encrypts data'],0,'GROUP BY forms groups that can be aggregated with functions such as COUNT or AVG.'),
    q(16,'What is EDA?','Data Science',['Exploratory Data Analysis','Encrypted Data Access','Event Driven API','External Database Adapter'],0,'EDA is the process of exploring, cleaning and understanding a dataset.'),
    q(17,'What is a correlation coefficient used for?','Data Science',['Relationship strength','Password hashing','Rendering charts only','Network routing'],0,'Correlation measures the strength and direction of association between variables.'),
    q(18,'Which visualization is useful for a distribution?','Data Science',['Histogram','Git branch','API route','Binary tree'],0,'Histograms show the distribution of numerical values.'),
  ],
  'Cloud Computing': [
    q(19,'What does IaaS provide?','Cloud Computing',['Virtualized infrastructure','Only source code','Only spreadsheets','Only passwords'],0,'IaaS provides compute, storage and networking infrastructure as services.'),
    q(20,'What is horizontal scaling?','Cloud Computing',['Adding more instances','Adding RAM to one machine','Deleting servers','Changing a font'],0,'Horizontal scaling adds additional service instances.'),
    q(21,'What is object storage commonly used for?','Cloud Computing',['Files and blobs','CPU scheduling','CSS styling','Git commits'],0,'Object storage is designed for durable storage of files/blobs.'),
    q(22,'Why use load balancing?','Cloud Computing',['Distribute traffic','Compile TypeScript','Train a model','Design UI'],0,'Load balancers distribute requests across healthy instances.'),
    q(23,'What is a cloud region?','Cloud Computing',['A geographic service area','A CSS region','A database row','A Git branch'],0,'Cloud providers operate infrastructure in geographic regions.'),
    q(24,'Which practice improves cloud reliability?','Cloud Computing',['Health checks and redundancy','Single server only','Hardcoded secrets','No backups'],0,'Redundancy and health checks reduce single points of failure.'),
  ],
  'Cyber Security': [
    q(25,'What does HTTPS primarily protect?','Cyber Security',['Data in transit','CPU speed','Screen brightness','Source code formatting'],0,'HTTPS encrypts HTTP traffic in transit using TLS.'),
    q(26,'What is phishing?','Cyber Security',['Social engineering attack','Database index','Cloud region','Sorting algorithm'],0,'Phishing tricks users into revealing information or taking unsafe actions.'),
    q(27,'What is hashing commonly used for?','Cyber Security',['One-way representation of data','Video playback','UI layout','DNS routing'],0,'Cryptographic hashes create one-way digests useful for integrity and password storage.'),
    q(28,'What does least privilege mean?','Cyber Security',['Minimum required access','Admin access for everyone','No authentication','Public passwords'],0,'Users and services should receive only the permissions they need.'),
    q(29,'What is SQL injection?','Cyber Security',['Injecting malicious SQL through input','A CSS bug','A CPU failure','A Git conflict'],0,'SQL injection exploits unsafe query construction using attacker-controlled input.'),
    q(30,'Which is a strong authentication practice?','Cyber Security',['MFA','Shared passwords','Plaintext secrets','No session expiry'],0,'Multi-factor authentication adds another verification factor.'),
  ],
  'Web Development': [
    q(31,'Which HTML element creates a hyperlink?','Web Development',['<a>','<p>','<div>','<img>'],0,'The anchor element creates hyperlinks.'),
    q(32,'Which CSS property controls text color?','Web Development',['color','font-style','display','position'],0,'The color property sets text color.'),
    q(33,'What does React use to describe UI structure?','Web Development',['Components','Tables only','SQL queries','Docker images'],0,'React applications are composed from reusable components.'),
    q(34,'What does REST commonly expose?','Web Development',['HTTP resources/endpoints','Only local files','GPU kernels','CSS variables'],0,'REST APIs expose resources through HTTP methods and endpoints.'),
    q(35,'Which HTTP method is commonly used to create a resource?','Web Development',['POST','GET','HEAD','OPTIONS'],0,'POST is commonly used to submit/create resources.'),
    q(36,'Why is responsive design important?','Web Development',['Adapt UI to screen sizes','Increase database rows','Train ML models','Hash passwords'],0,'Responsive layouts adapt to different viewport sizes and devices.'),
  ],
  'Mobile Development': [
    q(37,'Expo is commonly used with which framework?','Mobile Development',['React Native','Django','Spring','Laravel'],0,'Expo provides tooling for React Native apps.'),
    q(38,'What is a mobile navigation stack?','Mobile Development',['Screen history/navigation state','Database schema','Cloud region','CSS selector'],0,'A navigation stack tracks screens and their navigation history.'),
    q(39,'Why use persistent storage in a mobile app?','Mobile Development',['Keep data across launches','Increase CPU frequency','Create DNS records','Compile CSS'],0,'Persistent storage retains selected app data after restart.'),
    q(40,'What is an API call in a mobile app?','Mobile Development',['Request to a backend/service','A UI color','A local font','A Git commit'],0,'Mobile apps call APIs to exchange data with backend services.'),
  ],
  'DevOps': [
    q(41,'What problem does CI solve?','DevOps',['Automated integration/testing','Database normalization','UI design','Password recovery'],0,'Continuous integration automatically validates changes as they are integrated.'),
    q(42,'What is Docker used for?','DevOps',['Containerization','Image editing','SQL joins','UI prototyping'],0,'Docker packages applications and dependencies into containers.'),
    q(43,'What does CD commonly mean in DevOps?','DevOps',['Continuous Delivery/Deployment','Code Deletion','Cloud Database','Component Design'],0,'CD commonly refers to continuously delivering or deploying validated changes.'),
    q(44,'Why use version control?','DevOps',['Track and collaborate on code changes','Increase monitor brightness','Train neural networks only','Store passwords'],0,'Version control records changes and enables collaboration and rollback.'),
  ],
};


const CORE_APTITUDE_QUESTIONS: AptitudeQuestion[] = [
  q(1001,'If a sequence is 3, 6, 12, 24, what is the next number?','Logical Reasoning',['30','36','48','54'],2,'Each term is multiplied by 2, so the next value is 48.'),
  q(1002,'A student scores 72 out of 90. What is the percentage?','Mathematics',['70%','75%','80%','85%'],2,'72 ÷ 90 × 100 = 80%.'),
  q(1003,'If x + 7 = 19, what is x?','Mathematics',['10','11','12','13'],2,'Subtract 7 from both sides: x = 12.'),
  q(1004,'Which number is the odd one out? 2, 3, 5, 9, 11','Logical Reasoning',['2','3','9','11'],2,'9 is not prime; the others are prime numbers.'),
  q(1005,'A train travels 120 km in 2 hours. What is its average speed?','Mathematics',['40 km/h','50 km/h','60 km/h','80 km/h'],2,'Average speed = distance ÷ time = 120 ÷ 2 = 60 km/h.'),
  q(1006,'Which condition is true for a number to be divisible by 4?','Logical Reasoning',['Last digit is even','Last two digits form a multiple of 4','Digit sum is a multiple of 4','First digit is 4'],1,'Divisibility by 4 is determined by the last two digits.'),
  q(1007,'What is 15% of 200?','Mathematics',['15','20','30','35'],2,'0.15 × 200 = 30.'),
  q(1008,'If all developers are problem solvers and Sara is a developer, what follows?','Logical Reasoning',['Sara is a problem solver','Sara is a designer','All problem solvers are developers','Nothing follows'],0,'By the stated rule, Sara is a problem solver.'),
  q(1009,'What is the next term: 2, 5, 10, 17, 26, ?','Logical Reasoning',['35','36','37','38'],2,'The differences are 3, 5, 7, 9, so the next difference is 11 and the answer is 37.'),
  q(1010,'If 4 notebooks cost 360, what is the cost of 7 notebooks at the same rate?','Mathematics',['540','600','630','720'],2,'One notebook costs 90, so 7 cost 630.'),
];

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function getQuestionsForInterests(interests: string[] = []): AptitudeQuestion[] {
  const normalized = interests.map((i) => i.toLowerCase());
  const aliases: Record<string, string[]> = {
    'artificial intelligence': ['ai/ml'], 'machine learning': ['ai/ml'], 'ai/ml': ['ai/ml'],
    'data science': ['data science'], 'cloud computing': ['cloud computing'], 'cyber security': ['cyber security'],
    'software development': ['software development'], 'web development': ['web development'],
    'mobile development': ['mobile development'], 'devops': ['devops'],
  };
  const all = Object.values(APTITUDE_QUESTION_POOL).flat();
  const matching = normalized.length
    ? all.filter((question) => normalized.some((interest) => (aliases[interest] || [interest]).some((target) => question.category.toLowerCase() === target)))
    : [];

  // Every test contains reasoning + mathematics, then category questions.
  // This keeps the assessment useful for an Intermediate/FSc CS student while still adapting to interest.
  const core = shuffle(CORE_APTITUDE_QUESTIONS).slice(0, 4);
  const specialized = shuffle(matching.length ? matching : all).slice(0, 6);
  const combined = [...core, ...specialized];
  if (combined.length < 10) {
    for (const qItem of shuffle(all)) {
      if (combined.length >= 10) break;
      if (!combined.some((x) => x.id === qItem.id)) combined.push(qItem);
    }
  }
  return shuffle(combined).slice(0, 10).map((question, index) => ({ ...question, id: index + 1 }));
}

