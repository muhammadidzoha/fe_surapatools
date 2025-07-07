import Navbar from "../components/ui/Navbar";
import useSWR from "swr";
import axios from "axios";

const Notes = () => {
  const fetcher = async () => {
    const response = await axios.get("http://localhost:1234/api/sales");
    return response.data;
  };

  const { data, error, isLoading } = useSWR("sales", fetcher);

  console.log(data);

  const ageOptions = [
    { label: "17–25 tahun", value: "Remaja" },
    { label: "26–35 tahun", value: "Dewasa_Muda" },
    { label: "36–45 tahun", value: "Dewasa" },
    { label: "46–55 tahun", value: "Paruh_Baya" },
    { label: "56–60 tahun", value: "Pra_Pensiun" },
    { label: "61+ tahun", value: "Pensiun_Atau_Senior" },
  ];

  const jobOptions = [
    { label: "Pelajar atau Mahasiswa", value: "Pelajar_Atau_Mahasiswa" },
    { label: "Karyawan Swasta", value: "Karyawan_Swasta" },
    { label: "Aparatur Sipil Negara", value: "Aparatur_Sipil_Negara" },
    { label: "Wirausaha", value: "Wirausaha" },
    { label: "Tenaga Kesehatan", value: "Tenaga_Kesehatan" },
    { label: "Pensiunan", value: "Pensiunan" },
    { label: "Ibu Rumah Tangga", value: "Ibu_Rumah_Tangga" },
    { label: "Buruh", value: "Buruh" },
    { label: "Sopir atau Kurir", value: "Sopir_Atau_Kurir" },
    { label: "Tidak Bekerja", value: "Tidak_Bekerja" },
    { label: "Lainnya", value: "Lainnya" },
  ];

  const productOptions = [
    { label: "KPR Mandiri", value: "KPR_MANDIRI" },
    { label: "Kartu Kredit Mandiri", value: "KARTU_KREDIT_MANDIRI" },
    { label: "Tabungan Now", value: "TABUNGAN_NOW" },
  ];

  const formatAge = (value) => {
    const age = ageOptions.find((option) => option.value === value);
    return age ? age.label : value;
  };

  const formatJob = (value) => {
    const job = jobOptions.find((option) => option.value === value);
    return job ? job.label : value;
  };

  const formatProduct = (value) => {
    const product = productOptions.find((option) => option.value === value);
    return product ? product.label : value;
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
              <div className="py-3 px-4">
                <div className="relative max-w-xs">
                  <label className="sr-only">Search</label>
                  <input
                    type="text"
                    name="hs-table-with-pagination-search"
                    id="hs-table-with-pagination-search"
                    className="py-1.5 sm:py-2 px-3 ps-9 block w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Search for items"
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                    <svg
                      className="size-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr className="border-b border-gray-200">
                      <th className="border-r border-gray-200 px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                        No
                      </th>
                      <th className="border-r border-gray-200 px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                        Keyword
                      </th>
                      <th className="border-r border-gray-200 px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                        Target Age
                      </th>
                      <th className="border-r border-gray-200 px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                        Target Job
                      </th>
                      <th className="border-r border-gray-200 px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                        Product
                      </th>
                      <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                        Strategy
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data?.data?.map((salesStrategy, index) => (
                      <tr key={salesStrategy.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 border-r border-gray-200">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 border-r border-gray-200">
                          {salesStrategy.keyword}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                          {formatAge(salesStrategy.targetRangeAge)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                          {formatJob(salesStrategy.targetRangeJob)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                          {formatProduct(salesStrategy.product)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800">
                          <div className="max-w-xs">
                            <p className="text-sm text-gray-800 line-clamp-3">
                              {salesStrategy.strategy}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="py-1 px-4">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
