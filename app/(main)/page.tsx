import Filters from "@/components/filters";
import LocalSearch from "@/components/local-search";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/enums/routes";
import Link from "next/link";

const QUESTIONS = [
  {
    _id: "1",
    title: "How to use express as a custom server in NextJS?",
    Description: "I want to use express as a custom server in nextjs. How can I do that?",
    tags: [
      { _id: "1", name: "nextjs" },
      { _id: "2", name: "express" },
      { _id: "3", name: "custom-server" },

    ],
    author: "John Doe",
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: "2021-09-01T12:00:00.000Z",
  },
  {
    _id: "2",
    title: "How to learn React?",
    description: "I want to learn React, can anyone help me?",
    tags: [
      { _id: "1", name: "react" },
      { _id: "2", name: "javaScript" },
    ],
    author: { _id: "1", name: "John Doe" },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: "3",
    title: "How to learn JavaScript?",
    description: "I want to learn JavaScript, can anyone help me?",
    tags: [
      { _id: "1", name: "react" },
      { _id: "2", name: "javaScript" },
    ],
    author: { _id: "1", name: "John Doe" },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
]


interface IHomeProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}


const Home = async ({ searchParams }: IHomeProps) => {
  const { query = "", filter = "" } = await searchParams;
  let hotQuestions = [...QUESTIONS];
  
  // 1 => filter based on search query
  if(query.length)
  hotQuestions = QUESTIONS.filter(question => 
    question.title.toLowerCase().includes(query.toLowerCase())
  );

  // 2 => filter based on filters
  if(filter.length)
  hotQuestions = hotQuestions.filter(question => {
    const tags = question.tags.map(tag => tag.name);
    return tags.includes(filter);
  });



  return (
    <div className="w-full h-full flex flex-col gap-8">
      {/* Header */}
      <section className="w-full flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button
          className="min-h-[46px] px-4 py-3 primary-gradient !text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      {/* Search Bar */}
      <section>
        <LocalSearch
          className="flex-1"
          imgSrc="/icons/search.svg"
          placeholder="Search..."
        />
      </section>
      {/* Filters */}
      <Filters/>
      {/* Questions */}
      <section className="flex flex-col gap-6 mt-5">
        {hotQuestions.map(question => <p key={question._id}>{question.title}</p>)}
      </section>
    </div>
  );
};

export default Home;
