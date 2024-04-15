"use client";
import React, { useEffect, useState } from "react";
import MobileContainer from "@/components/MobileContainer";
import { useRouter } from "next/navigation";
import { MdArrowBackIosNew } from "react-icons/md";
import axios from "axios";
import SERVER_URL from "@/config/SERVER_URL";
import VOLUNTEER_URL from "@/config/VOLUNTEER_URL";

function Assignments() {
  const [assignments, setAssignments] = useState<any>([]);
  const [assignmentCompleted, setAssignmentCompleted] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("volunteer-token")) {
      router.push("/dmc");
    }
    axios
      .get(`${VOLUNTEER_URL}/volunteer/protected`, {
        headers: {
          "x-access-token": localStorage.getItem("volunteer-token"),
        },
      })
      .then(async (response) => {
        if (response.status === 200) {
          axios
            .get(`${VOLUNTEER_URL}/volunteer/assignments`, {
              headers: {
                "x-access-token": localStorage.getItem("volunteer-token"),
              },
            })
            .then(async (response) => {
              setAssignments(response.data.assignments);
              await getAssignmentCompletedList();
            });
        } else {
          localStorage.removeItem("volunteer-token");
          router.push("/dmc");
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("volunteer-token");
        router.push("/dmc");
      });
  }, []);
  const getAssignmentCompletedList = async () => {
    axios
      .get(`${VOLUNTEER_URL}/volunteer/get-assignments-completed`, {
        headers: {
          "x-access-token": localStorage.getItem("volunteer-token"),
        },
      })
      .then((response) => {
        setAssignmentCompleted(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAssignmentComplete = async (id: any, e: any) => {
    try {
      if (!e.target.checked) {
        await axios.post(
          `${VOLUNTEER_URL}/volunteer/delete-assignment-completed`,
          { assignmentId: id },
          {
            headers: {
              "x-access-token": localStorage.getItem("volunteer-token"),
            },
          }
        );
        setAssignmentCompleted((prevState: any) =>
          prevState.filter((completedId: any) => completedId !== id)
        );
      } else {
        await axios.post(
          `${VOLUNTEER_URL}/volunteer/add-assignment-completed`,
          { assignmentId: id },
          {
            headers: {
              "x-access-token": localStorage.getItem("volunteer-token"),
            },
          }
        );
        setAssignmentCompleted((prevState: any) => [...prevState, id]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MobileContainer>
      <div className="w-full h-full bg-[#F1F4FF] flex flex-col items-center relative">
        <div className=" w-full  bg-white/100 mb-7 box-shodow-lg box-shagow-black flex flex-col border-[#C0C2CB)] shadow-lg shadow-[#C0C2CB)]   ">
          <MdArrowBackIosNew
            className=" text-lg cursor-pointer absolute left-4 mt-3   text-black z-50"
            onClick={() => router.back()}
          />
          <h1 className=" text-xl text-center font-bold mt-5 drop-shadow-lg text-black mb-4">
            Assignments{" "}
          </h1>
        </div>
        <div className="w-[92%] h-[80%] bg-white p-2  flex flex-col ">
          <div className="w-full flex  justify-center">
            <h1>
              {" "}
              <b>Assignment</b>
            </h1>
          </div>
          {assignments?.map((assignment: any) => {
            // Check if the assignment's ID exists in the array of completed assignments
            const isCompleted = assignmentCompleted?.includes(assignment?._id);

            return (
              <div className="w-full mt-7 border-b-4 border-[#F2F4F7] p-2 flex items-center justify-between">
                <div>
                  <h2>{assignment?.title}</h2>
                  <h4 className="text-gray-500">{assignment?.description}</h4>
                  <h5>{assignment?.date}</h5>
                </div>
                <div>
                  <div className="flex items-center">
                    <input
                      id="checked-checkbox"
                      type="checkbox"
                      onChange={(e) =>
                        handleAssignmentComplete(assignment._id, e)
                      }
                      checked={isCompleted} // Set checked attribute based on completion status
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checked-checkbox"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                     {isCompleted ? "Completed" : "Not Completed"}
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MobileContainer>
  );
}

export default Assignments;
