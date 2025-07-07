"use client";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/input";
import { cn } from "../../lib/utils";
import { Select } from "../components/ui/Select";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";

export function BankSuit({ onClick, setIsOpen }) {
  const onSubmit = async (values) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const formattedQuestioners = [
      {
        question: "Apakah Anda rutin menabung setiap bulan?",
        answer: values.menabung || null,
      },
      {
        question: "Apakah Anda memiliki dana darurat?",
        answer: values.danaDarurat || null,
      },
      {
        question: "Anda lebih nyaman dengan produk syariah atau konvensional?",
        answer: values.produkBanking || null,
      },
      {
        question:
          "Apakah Anda bersedia mengambil risiko demi potensi keuntungan yang lebih tinggi?",
        answer: values.risikoInvestasi || null,
      },
    ].filter((q) => q.answer !== null);

    const payload = {
      name: values.name,
      age: values.age,
      job: values.job,
      salary: values.salary,
      goal: values.goal,
      questioners: formattedQuestioners,
    };

    const handleLoading = delay(1000);

    toast.promise(
      handleLoading.then(() =>
        axios.post("http://localhost:1234/api/customers/create", payload)
      ),
      {
        pending: "Creating Data...",
        success: {
          render(response) {
            return response.data.data.message;
          },
          onClose: () => {
            setIsOpen(false);
          },
        },
        error: {
          render(response) {
            return response.data.response.data.message;
          },
          onClose: () => {
            setIsOpen(false);
          },
        },
      }
    );
  };

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      age: "",
      job: "",
      salary: "",
      goal: "",
      menabung: "",
      danaDarurat: "",
      produkBanking: "",
      risikoInvestasi: "",
    },
    onSubmit,
  });

  console.log(values);

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

  const goalOptions = [
    { label: "Menabung", value: "MENABUNG" },
    { label: "Investasi", value: "INVESTASI" },
    { label: "Kredit", value: "KREDIT" },
    { label: "Perencanaan Pensiun", value: "PERENCANAAN_PENSIUN" },
  ];

  return (
    <div className="shadow-input mx-auto w-full min-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black max-h-[70vh] overflow-y-scroll">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Andre Naibaho"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="age">Age</Label>
            <Select
              id="age"
              name="age"
              value={values.age}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select Age</option>
              {ageOptions.map((age) => (
                <option key={age.value} value={age.value}>
                  {age.label}
                </option>
              ))}
            </Select>
          </LabelInputContainer>
        </div>

        <div className="flex items-center gap-2">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="job">Job</Label>
            <Select
              id="job"
              name="job"
              value={values.job}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select Job</option>
              {jobOptions.map((job) => (
                <option key={job.value} value={job.value}>
                  {job.label}
                </option>
              ))}
            </Select>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="salary">Salary</Label>
            <Select
              id="salary"
              name="salary"
              value={values.salary}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select Salary</option>
              {salaryOptions.map((salary) => (
                <option key={salary.value} value={salary.value}>
                  {salary.label}
                </option>
              ))}
            </Select>
          </LabelInputContainer>
        </div>

        <div className="my-2 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <LabelInputContainer className="mb-4">
          <Label htmlFor="goal">Goal</Label>
          <Select
            id="goal"
            name="goal"
            value={values.goal}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select Goal</option>
            {goalOptions.map((goal) => (
              <option key={goal.value} value={goal.value}>
                {goal.label}
              </option>
            ))}
          </Select>
        </LabelInputContainer>

        <div className="my-2 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="my-4 flex flex-col space-y-4">
          <div>
            <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 block">
              Apakah Anda rutin menabung setiap bulan?
            </Label>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="menabung-ya"
                name="menabung"
                value="Ya"
                checked={values.menabung === "Ya"}
                onChange={handleChange}
              />
              <Label
                htmlFor="menabung-ya"
                className="text-sm text-neutral-700 dark:text-neutral-300"
              >
                Ya
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="menabung-tidak"
                name="menabung"
                value="Tidak"
                checked={values.menabung === "Tidak"}
                onChange={handleChange}
              />
              <Label
                htmlFor="menabung-tidak"
                className="text-sm text-neutral-700 dark:text-neutral-300"
              >
                Tidak
              </Label>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 block">
              Apakah Anda memiliki dana darurat?
            </Label>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="dana-ya"
                name="danaDarurat"
                value="Ya"
                checked={values.danaDarurat === "Ya"}
                onChange={handleChange}
              />
              <Label
                htmlFor="dana-ya"
                className="text-sm text-neutral-700 dark:text-neutral-300"
              >
                Ya
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="dana-tidak"
                name="danaDarurat"
                value="Tidak"
                checked={values.danaDarurat === "Tidak"}
                onChange={handleChange}
              />
              <Label
                htmlFor="dana-tidak"
                className="text-sm text-neutral-700 dark:text-neutral-300"
              >
                Tidak
              </Label>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 block">
              Anda lebih nyaman dengan produk syariah atau konvensional?
            </Label>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="produk-syariah"
                name="produkBanking"
                value="Syariah"
                checked={values.produkBanking === "Syariah"}
                onChange={handleChange}
              />
              <Label
                htmlFor="produk-syariah"
                className="text-sm text-neutral-700 dark:text-neutral-300"
              >
                Syariah
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="produk-konvensional"
                name="produkBanking"
                value="Konvensional"
                checked={values.produkBanking === "Konvensional"}
                onChange={handleChange}
              />
              <Label
                htmlFor="produk-konvensional"
                className="text-sm text-neutral-700 dark:text-neutral-300"
              >
                Konvensional
              </Label>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 block">
              Apakah Anda bersedia mengambil risiko demi potensi keuntungan yang
              lebih tinggi?
            </Label>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="risiko-ya"
                name="risikoInvestasi"
                value="Ya"
                checked={values.risikoInvestasi === "Ya"}
                onChange={handleChange}
              />
              <Label
                htmlFor="risiko-ya"
                className="text-sm text-neutral-700 dark:text-neutral-300"
              >
                Ya
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="risiko-tidak"
                name="risikoInvestasi"
                value="Tidak"
                checked={values.risikoInvestasi === "Tidak"}
                onChange={handleChange}
              />
              <Label
                htmlFor="risiko-tidak"
                className="text-sm text-neutral-700 dark:text-neutral-300"
              >
                Tidak
              </Label>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4 my-5">
          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
            type="submit"
          >
            Submit
            <BottomGradient />
          </button>
          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
            type="button"
            onClick={onClick}
          >
            &larr; Back
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
