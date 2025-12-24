import { useGetTasksQuery } from "../features/tasks/taskApi";

export default function Dashboard() {
    const { data: tasks = [], isLoading } = useGetTasksQuery();

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">My Tasks</h1>

            {tasks.map((task) => (
                <div
                    key={task._id}
                    className="p-4 mb-3 bg-white rounded shadow"
                >
                    <h2 className="font-semibold">{task.title}</h2>
                    <p className="text-sm text-gray-500">{task.status}</p>
                </div>
            ))}
        </div>
    );
}
