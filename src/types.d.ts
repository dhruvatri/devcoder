interface Question {
    id: number;
    title: string;
  }
  
  interface Topic {
    topicName: string;
    questions: Question[];
  }
  
  interface Course {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    topics: Topic[];
  }
  
interface TestCase {
    input: string;
    output: string;
}

interface Problem {
    id: number;
    title: string;
    description: string;
    difficulty: "Easy" | "Medium" | "Hard"; // Use union type for predefined difficulty levels
    tags: string[];
    solution: string;
    example: string;
    testCases: TestCase[];
}

interface Submission {
    submissionId: number;
    userId: string | number;
    problemId: number;
    status: 'completed' | 'attempted' | 'to-do';
    isCorrect: boolean | null;
  }