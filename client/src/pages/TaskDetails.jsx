import clsx from "clsx";
import moment from "moment";
import React, { useState } from "react";
import { FaBug, FaTasks, FaThumbsUp, FaUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdTaskAlt,
} from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { tasks } from "../assets/data";
import Tabs from "../components/Tabs";
import { PRIORITYSTYLES, TASK_TYPE, getInitials } from "../utils";
import Loading from "../components/Loading";
import Button from "../components/Button";

moment.locale('ru');

function formatDate(date, locale = 'en-US') {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat(locale, options).format(date);
}

const assets = [
  "https://images.pexels.com/photos/2418664/pexels-photo-2418664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2534523/pexels-photo-2534523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/804049/pexels-photo-804049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const bgColor = {
  high: "bg-red-200",
  medium: "bg-yellow-200",
  low: "bg-blue-200",
};

const TABS = [
  { title: "Постановка задачи", icon: <FaTasks /> },
  { title: "Активность", icon: <RxActivityLog /> },
];

const TASKTYPEICON = {
  commented: (
    <div className='w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white'>
      <MdOutlineMessage />,
    </div>
  ),
  started: (
    <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white'>
      <FaThumbsUp size={20} />
    </div>
  ),
  assigned: (
    <div className='w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white'>
      <FaUser size={14} />
    </div>
  ),
  bug: (
    <div className='text-red-600'>
      <FaBug size={24} />
    </div>
  ),
  completed: (
    <div className='w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white'>
      <MdOutlineDoneAll size={24} />
    </div>
  ),
  "in progress": (
    <div className='w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-white'>
      <GrInProgress size={16} />
    </div>
  ),
};

const act_types = [
  "Started",
  "Completed",
  "In Progress",
  "Commented",
  "Bug",
  "Assigned",
];

const TaskDetails = () => {
  const { id } = useParams();

  const [selected, setSelected] = useState(0)
  const task = tasks[3]

  return (<div className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden">
    <h1 className="text-2xl text-gray-600 font-bold">{task?.title}
    </h1>

    <Tabs tabs={TABS} setSelected={setSelected}>
      {
        selected === 0 ? (<>
          <div className="w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-white shadow-md p-8 overflow-y-auto">

            {/* Право */}
            <div className="w-full md:w-1/2 space-y-8">
              <div className="flex items-center gap-5">
                <div
                  className={clsx(
                    "flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full",
                    PRIORITYSTYLES[task?.priority],
                    bgColor[task?.priority]
                  )}
                >
                  <span className='text-lg'>{ICONS[task?.priority]}</span>
                  <span className='uppercase'>
                    {task?.priority === 'high' ? 'Высокий' : task?.priority === 'medium' ? 'Средний' : task?.priority === 'low' ? 'Низкий' : task?.priority + ' Priority'}
                  </span>
                </div>

                <div className={clsx("flex items-center gap-2")}>
                  <div
                    className={clsx(
                      "w-4 h-4 rounded-full",
                      TASK_TYPE[task.stage]
                    )}
                  />
                  <span className='text-black uppercase'>
                    {task?.stage === 'todo'
                      ? 'Нужно сделать'
                      : task?.stage === 'in progress'
                        ? 'В работе'
                        : task?.stage === 'completed'
                          ? 'Выполнено'
                          : task?.stage}
                  </span>
                </div>
              </div>


              <p className='text-gray-500'>
                Дата создания: {formatDate(new Date(task?.date), "ru-RU")}
              </p>

              <div className='flex items-center gap-8 p-4 border-y border-gray-200'>
                <div className='space-x-2'>
                  <span className='font-semibold'>Файлов:</span>
                  <span>{task?.assets?.length}</span>
                </div>

                <span className='text-gray-400'>|</span>

                <div className='space-x-2'>
                  <span className='font-semibold'>Подзадач:</span>
                  <span>{task?.subTasks?.length}</span>
                </div>
              </div>

              <div className="space-y-4 py-6">
                <p className="text-gray-600 font-semibold text-sm">
                  Команда задачи
                </p>
                <div className="space-y-3">
                  {
                    task?.team?.map((m, index) => (
                      <div
                        key={index}
                        className="flex gap-4 py-4 items-center border-t border-gray-200">
                        <div
                          className={
                            "w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-blue-600"
                          }
                        >
                          <span className='text-center'>
                            {getInitials(m?.name)}
                          </span>
                        </div>
                        <div>
                          <p className="text-lg font-semibold">{m?.name}</p>
                          <span className="text-gray-500 ">{m?.title}</span>
                        </div>
                      </div>
                    )
                    )
                  }
                </div>



              </div>

              <div className="space-y-4 py-6">
                <p className="text-gray-600 font-semibold text-sm">
                  Подзадачи
                </p>
                <div className="space-y-8">
                  {task?.subTasks?.map((el, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-violet-500">
                        <MdTaskAlt className='text-violet-600' size={26}></MdTaskAlt>
                      </div>
                      <div className="space-y-1">
                        <div className="flex gap-2 items-center">
                          <span>
                            {formatDate(new Date(el?.date), "ru-RU")}
                          </span>
                          <span>
                            {el?.tag}
                          </span>
                          <span className='px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-violet-700 font-semibold'>
                            {el?.tag}
                          </span>
                        </div>

                        <p className='text-gray-700'>{el?.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* RIGHT */}
            <div className='w-full md:w-1/2 space-y-8'>
              <p className='text-lg font-semibold'>Вложения</p>

              <div className='w-full grid grid-cols-2 gap-4'>
                {task?.assets?.map((el, index) => (
                  <img
                    key={index}
                    src={el}
                    alt={task?.title}
                    className='w-full rounded h-28 md:h-36 2xl:h-52 cursor-pointer transition-all duration-700 hover:scale-125 hover:z-50'
                  />
                ))}
              </div>
            </div>
          </div>
        </>
        ) : (
          <>
            <Activities activity={task?.activities} id={id} />
          </>
        )}
    </Tabs>
  </div>
  );
};

const Activities = ({ activity, id }) => {

  const [selected, setSelected] = useState(act_types[0]);
  const [text, setText] = useState("");
  const isLoading = false;
  const handleSubmit = async () => {};


  const Card = ({ item }) => {
    return (
      <div className='flex space-x-4'>
        <div className='flex flex-col items-center flex-shrink-0'>
          <div className='w-10 h-10 flex items-center justify-center'>
            {TASKTYPEICON[item?.type]}
          </div>
          <div className='w-full h-full translate-x-1/2 flex items-center'>
            <div className='h-full w-0.5 bg-gray-400'></div>
          </div>
        </div>

        <div className='flex flex-col gap-y-1 mb-8'>
          <p className='font-semibold'>{item?.by?.name}</p>
          <div className='text-gray-500 space-y-2'>
            <span className='capitalize'>
              {item?.type === 'started'
                ? 'Начата '
                : item?.type === 'completed'
                  ? 'Выполнена '
                  : item?.type === 'in progress'
                    ? 'В работе '
                    : item?.type === 'commented'
                      ? 'Прокомментировал '
                      : item?.type === 'bug'
                        ? 'Проблема '
                        : item?.type === 'assigned'
                          ? 'Назначил '
                          : item?.type } 
            </span>
            <span className='text-sm'>{moment(item?.date).fromNow()}</span>
          </div>
          <div className='text-gray-700'>{item?.activity}</div>
        </div>
      </div>
    );
  };
  return (<div>
    <div className="w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto">
      <div className="w-full md:w-1/2">
        <h4 className='text-gray-600 font-semibold text-lg mb-5'>Активность</h4>

        <div className="w-full">
          {activity?.map((el, index) => (
            <Card
              key={index}
              item={el}
              isConnected={index < activity.length - 1}
            />
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/3">
      <h4 className='text-gray-600 font-semibold text-lg mb-5'>
          Добавить комментарий
        </h4>
        <div className='w-full flex flex-wrap gap-5'>
          {act_types.map((item, index) => (
            <div key={item} className='flex gap-2 items-center'>
              <input
                type='radio' // Чекбокс
                className='w-4 h-4'
                checked={selected === item ? true : false}
                onChange={(e) => setSelected(item)}
              />
<p>
  {item === 'Started'
    ? 'Начата'
    : item === 'Completed'
    ? 'Выполнена'
    : item === 'In Progress'
    ? 'В работе'
    : item === 'Commented'
    ? 'Прокомментировал'
    : item === 'Bug'
    ? 'Проблема'
    : item === 'Assigned'
    ? 'Назначил'
    : item}
</p>            </div>
          ))}
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Введите текст'
            className='bg-white w-full mt-10 border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500'
          ></textarea>
          {isLoading ? (
            <Loading />
          ) : (
            <Button
              type='button'
              label='Отправить'
              onClick={handleSubmit}
              className='bg-blue-600 text-white rounded'
            />
          )}
        </div>
        </div>  
    </div>
  </div>);
}

export default TaskDetails;