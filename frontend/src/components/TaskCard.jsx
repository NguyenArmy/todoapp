import React, { useState } from 'react'
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react';

import { Input } from './ui/input';
import api from '@/lib/axios';
import { toast } from 'sonner';

const TaskCard = ({ task, index, handleTaskChanged }) => {
    const [isEditting, setIsEditting] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(task.title || "");


    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            toast.success("Nhiệm vụ đã được xóa thành công!");
            handleTaskChanged();
        } catch (error) {
            console.error("Lỗi khi xóa nhiệm vụ:", error);
            toast.error("Lỗi khi xóa nhiệm vụ. Vui lòng thử lại.");
        }
    }
    const updateTask = async () => {
        try {
            setIsEditting(false);
            await api.put(`/tasks/${task._id}`, {
                title: updatedTitle

            });
            toast.success("Nhiệm vụ đã được cập nhật thành công!");

            handleTaskChanged();
        } catch (error) {
            console.error("Lỗi khi cập nhật nhiệm vụ:", error);
            toast.error("Lỗi khi cập nhật nhiệm vụ. Vui lòng thử lại.");
        }
    };
    const toggleTaskStatus = async () => {
        try {
            if (task.status === "active") {
                await api.put(`/tasks/${task._id}`, {
                    status: "completed",
                    completeAt: new Date().toISOString(),
                });
            } else {
                await api.put(`/tasks/${task._id}`, {
                    status: "active",
                    completeAt: null,
                });
                toast.success("Nhiệm vụ đã được chuyển sang trạng thái đang làm!");
            }
            toast.success("Nhiệm vụ đã hoàn thành!");
            if (handleTaskChanged) {
                handleTaskChanged();
            }

        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái nhiệm vụ:", error);
            toast.error("Lỗi khi cập nhật trạng thái nhiệm vụ.");
        }
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            updateTask();
        }
    }


    return (
        <Card className={cn(
            "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
            task.status === "completed" && "opacity-75"

        )}
        >
            <div className="flex items-center gap-4">
                {/*nuts tron */}
                <Button variant='ghost'
                    size='icon'
                    className={cn(
                        "flex-shrink-0 size-8 rounded-full transition-all duration-200",
                        task.status === "completed"
                            ? "text-success hover:text-success/80"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={toggleTaskStatus}
                >
                    {task.status === 'completed' ? (
                        <CheckCircle2 className='size-5' />
                    ) : (
                        <Circle className='size-5' />

                    )}

                </Button>



                {/*hiển thị hoặc chỉnh sửa tiêu đề nhiệm vụ*/}
                <div className="flex-1 min-w-0">
                    {isEditting ? (
                        <Input
                            placeholder='cần phải làm gì?'
                            className='flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20'
                            type="text"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            onKeyPress={handleKeyPress}
                            onBlur={() => {
                                setIsEditting(false);
                                setUpdatedTitle(task.title || "");
                            }}
                        />) : (
                        <p className={cn(
                            "text-base transition-all duration-200",
                            task.status === "completed" || task.status === "complete"
                                ? "line-through text-muted-foreground"
                                : "text-foreground"
                        )}>
                            {task.title}


                        </p>
                    )}
                    {/*Ngay tao va ngay hoan thanh*/}
                    <div className="flex items-center gap-2 mt-1">

                        <Calendar className='size-3 text-muted-foreground' />
                        <span className="text-xs text-muted-foreground">
                            {new Date(task.createdAt).toLocaleDateString()}
                        </span>

                        {task.completeAt && (
                            <>
                                <span className="text-xs text-muted-foreground"> - </span>
                                <Calendar className='size-3 text-muted-foreground' />
                                <span className="text-xs text-muted-foreground">
                                    {new Date(task.completeAt).toLocaleDateString()}
                                </span>
                            </>
                        )}





                    </div>
                </div>



                {/*nut chinh sua va xoa*/}
                <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
                    {/*nút edit*/}
                    <Button
                        variant="ghost"
                        size='icon'
                        className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
                        onClick={() => {
                            setIsEditting(true);
                            setUpdatedTitle(task.title || "");
                        }}
                    >
                        <SquarePen className="size-4"
                        />

                    </Button>
                    {/*nút xóa*/
                        <Button
                            variant="ghost"
                            size='icon'
                            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
                            onClick={() => deleteTask(task._id)}
                        >
                            <Trash2 className="size-4" />
                        </Button>}
                </div>

            </div>

        </Card>
    )
}

export default TaskCard
