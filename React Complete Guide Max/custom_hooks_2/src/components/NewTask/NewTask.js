import useFetcher from "../../hooks/use-fetcher";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const [isLoading, setIsLoading, error, setError, makeRequest] =
    useFetcher();

  const enterTaskHandler = async (taskText) => {
    // Make a post request using useFetcher
    const data = await makeRequest({
      method: "POST",
      body: JSON.stringify({ text: taskText }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
    setIsLoading(false);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
