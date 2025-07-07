"use client";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/input";
import { cn } from "../../lib/utils";
import { Select } from "../components/ui/Select";
import { TextArea } from "../components/ui/TextArea";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";

export function BankMove({ onClick, setIsOpen }) {
  const onSubmit = async (values) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleLoading = delay(1000);

    toast.promise(
      handleLoading.then(() =>
        axios.post("http://localhost:1234/api/sales/create", values)
      ),
      {
        pending: "Creating sales strategy...",
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

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        keyword: "",
        targetrangeage: "",
        targetrangejob: "",
        product: "",
        strategy: "",
      },
      validate: (values) => {
        const errors = {};

        if (!values.keyword) {
          errors.keyword = "Keyword harus diisi";
        } else if (values.keyword.length > 255) {
          errors.keyword = "Keyword maksimal 255 karakter";
        }

        if (!values.targetrangeage) {
          errors.targetrangeage = "Target usia harus dipilih";
        }

        if (!values.targetrangejob) {
          errors.targetrangejob = "Target profesi harus dipilih";
        }

        if (!values.product) {
          errors.product = "Produk harus dipilih";
        }

        if (!values.strategy) {
          errors.strategy = "Strategi harus diisi";
        }

        return errors;
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

  const productOptions = [
    { label: "KPR Mandiri", value: "KPR_MANDIRI" },
    { label: "Kartu Kredit Mandiri", value: "KARTU_KREDIT_MANDIRI" },
    { label: "Tabungan Now", value: "TABUNGAN_NOW" },
  ];

  return (
    <div className="shadow-input mx-auto w-full min-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <form onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="keyword">Keyword</Label>
          <Input
            id="keyword"
            name="keyword"
            placeholder="Enter keyword"
            type="text"
            value={values.keyword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.keyword && touched.keyword && (
            <span className="text-red-500 text-sm">{errors.keyword}</span>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="targetrangeage">Target Usia Market</Label>
          <Select
            id="targetrangeage"
            name="targetrangeage"
            value={values.targetrangeage}
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
          {errors.targetrangeage && touched.targetrangeage && (
            <span className="text-red-500 text-sm">
              {errors.targetrangeage}
            </span>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="targetrangejob">Target Profesi Market</Label>
          <Select
            id="targetrangejob"
            name="targetrangejob"
            value={values.targetrangejob}
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
          {errors.targetrangejob && touched.targetrangejob && (
            <span className="text-red-500 text-sm">
              {errors.targetrangejob}
            </span>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="product">Produk yang akan dijalankan</Label>
          <Select
            id="product"
            name="product"
            value={values.product}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select Product</option>
            {productOptions.map((product) => (
              <option key={product.value} value={product.value}>
                {product.label}
              </option>
            ))}
          </Select>
          {errors.product && touched.product && (
            <span className="text-red-500 text-sm">{errors.product}</span>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="strategy">Strategi Komunikasi Marketing</Label>
          <TextArea
            id="strategy"
            name="strategy"
            placeholder="Enter Strategy"
            value={values.strategy}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.strategy && touched.strategy && (
            <span className="text-red-500 text-sm">{errors.strategy}</span>
          )}
        </LabelInputContainer>

        <div className="flex flex-col space-y-4 my-5">
          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
            type="submit"
            disabled={Object.keys(errors).length > 0}
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
