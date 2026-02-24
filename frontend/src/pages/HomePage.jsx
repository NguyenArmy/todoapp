
import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";

const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = useState([]);
    const [activeTasksCount, setActiveTasksCount] = useState(0);
    const [completeTasksCount, setCompleteTasksCount] = useState(0);
    const [filter, setFilter] = useState("all");
    const [dateQuery, setDateQuery] = useState('today');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {

        fetchTasks();

    }, [])

    const fetchTasks = async () => {
        try {
            const res = await api.get("/tasks");

            setTaskBuffer(res.data.tasks);
            setActiveTasksCount(res.data.activeCount);
            setCompleteTasksCount(res.data.completeCount);


        } catch (error) {
            console.error("lỗi xảy ra khi truy xuất tasks:", error);
            toast.error("Lỗi xảy ra khi truy xuất tasks.");
        }
    }

    //biến
    const filteredTasks = taskBuffer.filter(task => {
        switch (filter) {
            case "active":
                return task.status === "active";
            case "completed":
                return task.status === "completed" || task.status === "complete";
            default:
                return true;
        }
    });

    const totalPages = Math.max(1, Math.ceil(filteredTasks.length / pageSize));
    const pagedTasks = filteredTasks.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [filter, dateQuery, taskBuffer.length]);
    const handleTaskChanged = () => {
        fetchTasks();

    }

    return (
        <div className="relative min-h-screen w-full bg-white">
            {/* Dual Gradient Overlay (Bottom) Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
        radial-gradient(circle 500px at 20% 100%, rgba(139,92,246,0.3), transparent),
        radial-gradient(circle 500px at 100% 80%, rgba(59,130,246,0.3), transparent)
      `,
                    backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
                }}
            />
            {/* Your Content/Components */}
            <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-6 pt-4 sm:px-6 sm:pt-8 lg:px-8">
                <div className="mx-auto w-full max-w-2xl space-y-4 sm:space-y-6">

                    {/* Header */}
                    <Header />

                    {/* Tạo nhiệm vụ */}
                    <AddTask handleNewTaskAdded={handleTaskChanged} />

                    {/* thống kê và bộ lọc */}
                    <StatsAndFilters
                        filter={filter}
                        setFilter={setFilter}
                        activeTasksCount={activeTasksCount}
                        completedTasksCount={completeTasksCount} />


                    {/* danh sách nhiệm vụ */}
                    <TaskList filteredTasks={pagedTasks} filter={filter}
                        handleTaskChanged={handleTaskChanged} />
                    {/* phân trang và lọc theo date */}
                    <div className="flex w-full flex-col items-stretch justify-between gap-2 sm:flex-row sm:items-center sm:gap-4">
                        <div className="order-1">
                            <TaskListPagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                        <div className="order-2 self-start sm:self-auto">
                            <DateTimeFilter
                                dateQuery={dateQuery} setDateQuery={setDateQuery} />
                        </div>

                    </div>
                    {/* chân trang */}
                    <Footer
                        activeTasksCount={activeTasksCount}
                        completedTasksCount={completeTasksCount} />

                </div>



            </div>
        </div>




    )
};
export default HomePage;