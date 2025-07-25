import Navbar from "../components/ui/Navbar";
import useSWR from "swr";
import axios from "axios";
import { useState } from "react";

const CustomerList = () => {
  const fetcher = async () => {
    const response = await axios.get("http://localhost:1234/api/customers");
    return response.data;
  };

  const { data, error, isLoading, mutate } = useSWR("customers", fetcher);

  const [editingStatus, setEditingStatus] = useState({
    customerId: null,
    stage: "",
  });
  const stageOptions = [
    { label: "Follow Up 1", value: "Follow_Up_1" },
    { label: "Follow Up 2", value: "Follow_Up_2" },
    { label: "Offering", value: "Offering" },
    { label: "Closed", value: "Closed" },
  ];

  const handleStatusClick = (customerId, currentStage) => {
    setEditingStatus({ customerId, stage: currentStage });
  };

  const handleStatusChange = async (customerId, questionerId, newStage) => {
    await axios.patch(`http://localhost:1234/api/customers/${questionerId}`, {
      stage: newStage,
    });
    setEditingStatus({ customerId: null, stage: "" });
    mutate("customers");
  };

  const ageOptions = [
    { label: "17–25 tahun", value: "Remaja" },
    { label: "26–35 tahun", value: "Dewasa_Muda" },
    { label: "36–45 tahun", value: "Dewasa" },
    { label: "46–55 tahun", value: "Paruh_Baya" },
    { label: "56–60 tahun", value: "Pra_Pensiun" },
    { label: "61+ tahun", value: "Pensiun_Atau_Senior" },
  ];

  const salaryOptions = [
    { label: "< 2.000.000", value: "KURANG_DARI_DUA_JUTA" },
    { label: "2.000.000 - 5.000.000", value: "DUA_JUTA_SAMPAI_LIMA_JUTA" },
    { label: "5.000.000 - 10.000.000", value: "LIMA_JUTA_SAMPAI_SEPULUH_JUTA" },
    {
      label: "10.000.000 - 20.000.000",
      value: "SEPULUH_JUTA_SAMPAI_DUA_PULUH_JUTA",
    },
    {
      label: "20.000.000 - 50.000.000",
      value: "DUA_PULUH_JUTA_SAMPAI_LIMA_PULUH_JUTA",
    },
    { label: "> 50.000.000", value: "LEBIH_DARI_LIMA_PULUH_JUTA" },
  ];

  const formatAge = (value) => {
    const age = ageOptions.find((option) => option.value === value);
    return age ? age.label : value;
  };

  const formatSalary = (value) => {
    const salary = salaryOptions.find((option) => option.value === value);
    return salary ? salary.label : value;
  };

  const formatEnumValue = (value) => {
    return value
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <Navbar />
      <div className="flex flex-col pt-32 px-10">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr className="border-b border-gray-200">
                      <th
                        rowSpan={2}
                        className="border-r border-gray-200 px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Name
                      </th>
                      <th
                        rowSpan={2}
                        className="border-r border-gray-200 px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Age
                      </th>
                      <th
                        rowSpan={2}
                        className="border-r border-gray-200 px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Job
                      </th>
                      <th
                        rowSpan={2}
                        className="border-r border-gray-200 px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Salary
                      </th>
                      <th
                        rowSpan={2}
                        className="border-r border-gray-200 px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Phone
                      </th>
                      <th
                        rowSpan={2}
                        className="border-r border-gray-200 px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Goal
                      </th>
                      <th
                        colSpan={2}
                        className="border-r border-gray-200 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                      >
                        Quesioner
                      </th>
                      <th
                        rowSpan={2}
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                      >
                        Status
                      </th>
                    </tr>
                    <tr>
                      <th className="px-6 border-r border-gray-200 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                        Question
                      </th>
                      <th className="px-6 py-3 border-r border-gray-200 text-start text-xs font-medium text-gray-500 uppercase">
                        Answer
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data?.data?.map((customer) => (
                      <tr key={customer.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 border-r border-gray-200">
                          {customer.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                          {formatAge(customer.age)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                          {formatEnumValue(customer.job)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                          {formatSalary(customer.salary)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                          {customer.phone || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                          {customer.goals.length > 0
                            ? formatEnumValue(customer.goals[0].goal)
                            : "No Goal"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-200">
                          <div className="space-y-0">
                            {customer.questioners.map((q, index) => (
                              <div
                                key={q.id}
                                className="border-b border-gray-200 py-2 last:border-b-0"
                              >
                                <div className="text-xs font-medium text-gray-600">
                                  Q{index + 1}:{" "}
                                  {q.question.length > 40
                                    ? q.question.substring(0, 40) + "..."
                                    : q.question}
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800">
                          <div className="space-y-0">
                            {customer.questioners.map((q) => (
                              <div
                                key={q.id}
                                className="border-b border-gray-200 py-2 last:border-b-0"
                              >
                                <div className="text-xs font-semibold text-gray-800 bg-gray-50 px-2 py-1 rounded">
                                  {q.answer}
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 border-r border-gray-200">
                          {customer.questioners &&
                          customer.questioners.length > 0 &&
                          customer.questioners[0]?.stage ? (
                            editingStatus.customerId === customer.id ? (
                              <select
                                className="px-2 py-1 rounded border text-xs font-semibold uppercase tracking-wide"
                                value={editingStatus.stage}
                                onChange={(e) =>
                                  handleStatusChange(
                                    customer.id,
                                    customer.questioners[0].id,
                                    e.target.value
                                  )
                                }
                                onBlur={() =>
                                  setEditingStatus({
                                    customerId: null,
                                    stage: "",
                                  })
                                }
                                autoFocus
                              >
                                {stageOptions.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <span
                                className="inline-block px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wide cursor-pointer hover:bg-blue-100"
                                onClick={() =>
                                  handleStatusClick(
                                    customer.id,
                                    customer.questioners[0].stage
                                  )
                                }
                                tabIndex={0}
                              >
                                {customer.questioners[0].stage.replace(
                                  /_/g,
                                  " "
                                )}
                              </span>
                            )
                          ) : (
                            <span className="text-gray-400 text-xs">
                              No Status
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* <div className="py-1 px-4">
                <nav
                  className="flex items-center space-x-1"
                  aria-label="Pagination"
                >
                  <button
                    type="button"
                    className="p-2.5 min-w-10 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">«</span>
                    <span className="sr-only">Previous</span>
                  </button>
                  <button
                    type="button"
                    className="min-w-10 flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none"
                    aria-current="page"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="min-w-10 flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none"
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className="min-w-10 flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none"
                  >
                    3
                  </button>
                  <button
                    type="button"
                    className="p-2.5 min-w-10 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                    aria-label="Next"
                  >
                    <span className="sr-only">Next</span>
                    <span aria-hidden="true">»</span>
                  </button>
                </nav>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
